// astro.config.mjs の markdown.processor に渡す Sätteri の MDAST プラグイン。
import { fileURLToPath } from 'node:url';
import { defineMdastPlugin } from 'satteri';

// .md 内の HTML コメント（<!-- OUTLINE ... --> など執筆用メモ）を
// ビルド出力から除去する。MDX の {/* */} は元々出力に残らないので対象外。
// これにより執筆用アウトラインが公開HTMLのソースに漏れない。
export const stripHtmlComments = defineMdastPlugin({
  name: 'strip-html-comments',
  html(node, ctx) {
    if (node.value.trimStart().startsWith('<!--')) ctx.removeNode(node);
  },
});

// TypeDoc が本文の冒頭に出すパンくず（パッケージ名 → 名前空間 → 現在地）を落とす。
// ナビゲーションは ApiLayout の左サイドバーが担うので、本文側には要らない。
//
// 取り込んだ .md は TypeDoc 出力の忠実なミラーにしておきたい（上流との差分を
// 取りやすくするため）ので、取り込みスクリプト側ではなくここで落とす。
// 手でコピーされた場合にも効く。
//
// パンくずは必ず最初の H1 より前にあり、H1 以降が本文。
export const stripTypedocBreadcrumb = defineMdastPlugin({
  name: 'strip-typedoc-breadcrumb',
  before(root, ctx) {
    if (!ctx.fileURL) return;
    const p = fileURLToPath(ctx.fileURL).replace(/\\/g, '/');
    if (!p.includes('/src/pages/reference/')) return;
    const h1 = root.children.findIndex((n) => n.type === 'heading' && n.depth === 1);
    for (const n of root.children.slice(0, Math.max(h1, 0))) ctx.removeNode(n);
  },
});
