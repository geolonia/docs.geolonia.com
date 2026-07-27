/**
 * LiveCode インテグレーション
 *
 * ドキュメント（.mdx）に直接書いたコードブロックを、そのまま動くデモページにする。
 *
 *   1. ビルド前に src/pages 以下の .md / .mdx を走査し、<LiveCode> の中のフェンスを取り出す
 *   2. 言語と本文のハッシュを ID にして「マニフェスト」を作る
 *   3. /demos/inline/<ID>/ という実ページを ID の数だけ生成する
 *   4. ページ側の <LiveCode> は、スロットから復元した同じ本文のハッシュを計算して
 *      その URL を iframe で指す
 *
 * 2 と 4 は同じ規則（livecode-shared.mjs）で同じ ID を出すので、確実に一致する。
 * 一致しなければコンポーネント側で例外にする（取りこぼしを黙って捨てない）。
 *
 * js / jsx のスニペットは仮想モジュールとして Vite に渡すため、実際にバンドルされる。
 * つまり構文エラーや import ミスはビルドエラーになる。srcdoc に流し込む方式と違い、
 * 生成ページは通常のオリジンを持つので地図も普通に動く。
 *
 * 【前提】生成ページは docs と同一オリジンで、スニペットのコードをそのまま実行する。
 * デモに入れてよいのはこのリポジトリで管理しているコードだけ。外部から受け取った
 * コードを流し込む用途には使わないこと。
 */
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  normalizeCode,
  snippetId,
  isModuleLang,
  isReactLang,
  isRunnableLang,
} from './livecode-shared.mjs';

export { normalizeCode, snippetId, isModuleLang, isReactLang, isRunnableLang };

const MANIFEST_ID = 'virtual:livecode-manifest';
const LOADERS_ID = 'virtual:livecode-loaders';
const SNIPPET_PREFIX = 'virtual:livecode/';
/** 仮想スニペットを置く見せかけのディレクトリ。プロジェクト内に見せることで
 *  スニペット内の bare import（@geolonia/... など）が通常どおり解決される。 */
const SNIPPET_DIR = '.livecode';

/** <LiveCode …> … </LiveCode> */
const BLOCK_RE = /<LiveCode\b([^>]*)>([\s\S]*?)<\/LiveCode>/g;
/** その中のフェンス。開始フェンスのインデント幅も捕まえる。 */
const FENCE_RE = /^([ \t]*)```([A-Za-z0-9]+)[ \t]*\r?\n([\s\S]*?)\r?\n[ \t]*```[ \t]*$/m;
/** <LiveCode demo={false}> — デモを出さない指定 */
const DEMO_FALSE_RE = /\bdemo\s*=\s*(?:\{\s*false\s*\}|"false"|'false')/;

/**
 * コードフェンスの中身を潰す（改行は保つ）。
 *
 * 走査は .mdx を素のテキストとして見るので、そのままだと
 * 「LiveCode の使い方を説明するために ``` の中に書いた <LiveCode> の例」まで
 * 拾って、動かすつもりのないデモページを黙って生やしてしまう。
 * 先にフェンス領域を消しておけば、本物の <LiveCode> だけが残る。
 */
function maskFencedRegions(src) {
  let fence = null; // { char, len }
  return src
    .split('\n')
    .map((line) => {
      const open = /^[ \t]*(`{3,}|~{3,})(.*)$/.exec(line);
      // 文字位置を変えないよう、消す行は同じ長さの空白に置き換える。
      // （マスク後の一致位置をそのまま原文の切り出しに使うため）
      const blank = ' '.repeat(line.length);
      if (!fence) {
        if (!open) return line;
        fence = { char: open[1][0], len: open[1].length };
        return blank;
      }
      // 閉じフェンス：開いたものと同じ記号・同じ長さ以上・後ろに情報なし
      if (open && open[1][0] === fence.char && open[1].length >= fence.len && open[2].trim() === '') {
        fence = null;
      }
      return blank;
    })
    .join('\n');
}

/** 各行の先頭から最大 n 文字ぶんの空白を落とす。 */
function stripIndent(body, n) {
  if (!n) return body;
  return body
    .split('\n')
    .map((line) => {
      let i = 0;
      while (i < n && (line[i] === ' ' || line[i] === '\t')) i++;
      return line.slice(i);
    })
    .join('\n');
}

async function walk(dir, out = []) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) await walk(full, out);
    else if (/\.mdx?$/.test(e.name)) out.push(full);
  }
  return out;
}

/** ドキュメントを走査して、実行するスニペットを集める。 */
export async function collectSnippets(pagesDir) {
  const files = await walk(pagesDir);
  const snippets = new Map();
  for (const file of files) {
    const src = await readFile(file, 'utf8');
    // <LiveCode> を探す前に、フェンスの中（＝説明のために書かれた例）を潰す。
    // マスクは文字位置を変えないので、見つけた範囲をそのまま原文から切り出せる。
    const masked = maskFencedRegions(src);

    const re = new RegExp(BLOCK_RE.source, 'g');
    let m;
    while ((m = re.exec(masked)) !== null) {
      const block = src.slice(m.index, m.index + m[0].length);
      const parsed = new RegExp(BLOCK_RE.source).exec(block);
      if (!parsed) continue;
      const [, attrs, inner] = parsed;

      // デモを出さない指定のものはバンドルしない（＝動かない断片も載せられる）
      if (DEMO_FALSE_RE.test(attrs)) continue;

      const fence = FENCE_RE.exec(inner);
      if (!fence) continue; // フェンスが無い場合は描画側でエラーにする
      const [, indent, lang, rawBody] = fence;

      // 動かせない言語（bash など）は描画側で理由付きのエラーにする
      if (!isRunnableLang(lang)) continue;

      // リストの中などインデントされた位置に書かれた場合、MDX 側はインデントを
      // 剥がした本文を渡してくる。走査側でも同じだけ落として揃える。
      const code = normalizeCode(stripIndent(rawBody, indent.length));
      const id = snippetId(lang, code);
      if (!snippets.has(id)) snippets.set(id, { id, lang, code, file });
    }
  }
  return snippets;
}

export default function livecode() {
  let snippets = new Map();
  let pagesDir = '';
  let root = '';

  const snippetPath = (id, lang) => path.join(root, SNIPPET_DIR, `${id}.${lang}`);

  return {
    name: 'livecode',
    hooks: {
      'astro:config:setup': async ({ config, updateConfig, addWatchFile }) => {
        root = fileURLToPath(config.root);
        pagesDir = path.join(fileURLToPath(config.srcDir), 'pages');
        snippets = await collectSnippets(pagesDir);

        for (const s of snippets.values()) addWatchFile?.(s.file);

        updateConfig({
          vite: {
            plugins: [
              {
                name: 'livecode-virtual',
                enforce: 'pre',
                resolveId(source) {
                  if (source === MANIFEST_ID || source === LOADERS_ID) return '\0' + source;
                  if (source.startsWith(SNIPPET_PREFIX)) {
                    const id = source.slice(SNIPPET_PREFIX.length);
                    const s = snippets.get(id);
                    // 拡張子付きの「プロジェクト内のパス」に見せる。
                    // こうすると JSX 変換も bare import の解決も通常どおり効く。
                    if (s) return snippetPath(s.id, s.lang);
                  }
                  return null;
                },
                load(id) {
                  if (id === '\0' + MANIFEST_ID) {
                    const entries = [...snippets.values()].map((s) => [
                      s.id,
                      { id: s.id, lang: s.lang, code: s.code },
                    ]);
                    return `export default ${JSON.stringify(Object.fromEntries(entries))};`;
                  }
                  if (id === '\0' + LOADERS_ID) {
                    // 静的に解析できる import() を並べる（各スニペットが別チャンクになる）
                    const lines = [...snippets.values()]
                      .filter((s) => isModuleLang(s.lang))
                      .map((s) => `  ${JSON.stringify(s.id)}: () => import(${JSON.stringify(SNIPPET_PREFIX + s.id)}),`);
                    return `export default {\n${lines.join('\n')}\n};`;
                  }
                  const dir = path.join(root, SNIPPET_DIR) + path.sep;
                  if (id.startsWith(dir)) {
                    const base = path.basename(id);
                    const sid = base.slice(0, base.indexOf('.'));
                    const s = snippets.get(sid);
                    if (s) return s.code;
                  }
                  return null;
                },
                async handleHotUpdate({ file, server }) {
                  if (!/\.mdx?$/.test(file)) return;
                  snippets = await collectSnippets(pagesDir);
                  for (const vid of ['\0' + MANIFEST_ID, '\0' + LOADERS_ID]) {
                    const mod = server.moduleGraph.getModuleById(vid);
                    if (mod) server.moduleGraph.invalidateModule(mod);
                  }
                  server.ws.send({ type: 'full-reload' });
                },
              },
            ],
          },
        });
      },
    },
  };
}
