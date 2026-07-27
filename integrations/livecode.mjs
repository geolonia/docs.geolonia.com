/**
 * LiveCode インテグレーション
 *
 * ドキュメント（.mdx）に直接書いたコードブロックを、そのまま動くデモページにする。
 *
 *   1. ビルド前に src/pages 以下の .mdx を MDX パーサで読み、<LiveCode> の中のフェンスを取り出す
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
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMdx from 'remark-mdx';
import { visit } from 'unist-util-visit';
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

/**
 * .mdx を実際にパースするための最小のプロセッサ。
 *
 * ここで自前の正規表現を使わないことが重要。フェンスの記法（バッククォート／
 * チルダ、meta 文字列）、リスト内でのインデント、JSX 属性の書き方はいずれも
 * 仕様があり、手書きの近似はその差がそのままバグになる。MDX と同じパーサに
 * 解釈させて、出てきた木を読む。
 */
const mdxParser = unified().use(remarkParse).use(remarkMdx);

/** <LiveCode demo={false}> か。`{false}` という式のときだけ「出さない」。 */
function isDemoDisabled(node) {
  for (const attr of node.attributes ?? []) {
    if (attr.type !== 'mdxJsxAttribute' || attr.name !== 'demo') continue;
    // demo={false} は式ノード。demo="false" は文字列なので JSX 的には truthy で、
    // 描画側も truthy として扱う（＝デモを出す）。ここでも同じ判断にする。
    if (attr.value && typeof attr.value === 'object') {
      return String(attr.value.value).trim() === 'false';
    }
  }
  return false;
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
    // .md は JSX を解釈しないので <LiveCode> は動かない。孤児ページを作らないよう .mdx だけ見る。
    else if (e.name.endsWith('.mdx')) out.push(full);
  }
  return out;
}

/** ドキュメントを走査して、実行するスニペットを集める。 */
export async function collectSnippets(pagesDir) {
  const files = await walk(pagesDir);
  const snippets = new Map();
  for (const file of files) {
    const src = await readFile(file, 'utf8');
    let tree;
    try {
      tree = mdxParser.parse(src);
    } catch {
      continue; // パースできないものは Astro 側が本来のエラーを出す
    }

    visit(tree, (node) => {
      if (node.type !== 'mdxJsxFlowElement' || node.name !== 'LiveCode') return;

      // デモを出さない指定のものはバンドルしない（＝動かない断片も載せられる）
      if (isDemoDisabled(node)) return;

      // 中のコードブロック。フェンスの記法やリストのインデントはパーサが
      // 解決済みで、value にはコード本来の字下げだけが残っている。
      const codes = [];
      visit(node, 'code', (c) => codes.push(c));
      // 1つでないときは描画側が理由付きのエラーを出す
      if (codes.length !== 1) return;

      const { lang, value } = codes[0];
      // 動かせない言語（bash など）も描画側で理由付きのエラーにする
      if (!lang || !isRunnableLang(lang)) return;

      const code = normalizeCode(value);
      const id = snippetId(lang, code);
      if (!snippets.has(id)) snippets.set(id, { id, lang, code, file });
    });
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
                  if (!file.endsWith('.mdx')) return;
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
