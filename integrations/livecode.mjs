/**
 * LiveCode インテグレーション
 *
 * ドキュメント（.mdx）に直接書いたコードブロックを、そのまま動くデモページにする。
 *
 *   1. ビルド前に src/pages/**\/*.mdx を走査し、<LiveCode> の中のフェンスを取り出す
 *   2. 内容のハッシュを ID にして「マニフェスト」を作る
 *   3. /demos/inline/<ID>/ という実ページを ID の数だけ生成する
 *   4. ページ側の <LiveCode> は、スロットから復元した同じ本文のハッシュを計算して
 *      その URL を iframe で指す
 *
 * 2 と 4 は同じ文字列から同じハッシュを得るので、確実に一致する。
 * 一致しなければコンポーネント側で例外にする（取りこぼしを黙って捨てない）。
 *
 * js / jsx のスニペットは仮想モジュールとして Vite に渡すため、実際にバンドルされる。
 * つまり構文エラーや import ミスはビルドエラーになる。srcdoc に流し込む方式と違い、
 * 生成ページは通常のオリジンを持つので地図も普通に動く。
 */
import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const MANIFEST_ID = 'virtual:livecode-manifest';
const LOADERS_ID = 'virtual:livecode-loaders';
const SNIPPET_PREFIX = 'virtual:livecode/';
/** 仮想スニペットを置く見せかけのディレクトリ。プロジェクト内に見せることで
 *  スニペット内の bare import（@geolonia/... など）が通常どおり解決される。 */
const SNIPPET_DIR = '.livecode';

/** <LiveCode …> … </LiveCode> の中身 */
const BLOCK_RE = /<LiveCode\b([^>]*)>([\s\S]*?)<\/LiveCode>/g;
/** その中のフェンス */
const FENCE_RE = /^[ \t]*```([A-Za-z0-9]+)[ \t]*\r?\n([\s\S]*?)\r?\n[ \t]*```[ \t]*$/m;

/** 表示と実行で同じ文字列になるよう正規化してからハッシュする。 */
export function normalizeCode(code) {
  return code.replace(/\r\n/g, '\n').trim();
}

export function snippetId(code) {
  return createHash('sha256').update(normalizeCode(code)).digest('hex').slice(0, 12);
}

/** html はそのまま埋め込む。それ以外はモジュールとしてバンドルして実行する。 */
export function isModuleLang(lang) {
  return lang !== 'html';
}
export function isReactLang(lang) {
  return lang === 'jsx' || lang === 'tsx';
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

/** ドキュメントを走査して、埋め込まれたスニペットを全部集める。 */
export async function collectSnippets(pagesDir) {
  const files = await walk(pagesDir);
  const snippets = new Map();
  for (const file of files) {
    const src = await readFile(file, 'utf8');
    for (const m of src.matchAll(BLOCK_RE)) {
      const fence = FENCE_RE.exec(m[2]);
      if (!fence) continue; // フェンスを含まない <LiveCode> は対象外
      const [, lang, body] = fence;
      const code = normalizeCode(body);
      const id = snippetId(code);
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
