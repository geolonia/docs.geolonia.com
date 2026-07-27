// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

// 日本語（CJK）で ** 等の強調が全角約物（）。」など）に隣接すると
// CommonMark のフランキング規則で無効化される問題を解消する remark プラグイン。
// HTML 出力用途なのでパースのみの /parseOnly を使う。.md / .mdx 双方に効く。
import remarkCjkFriendly from 'remark-cjk-friendly/parseOnly';
import remarkCjkFriendlyGfmStrikethrough from 'remark-cjk-friendly-gfm-strikethrough/parseOnly';

import react from '@astrojs/react';

// .md 内の HTML コメント（<!-- OUTLINE ... --> など執筆用メモ）を
// ビルド出力から除去する。MDX の {/* */} は元々出力に残らないので対象外。
// これにより執筆用アウトラインが公開HTMLのソースに漏れない。
function remarkStripHtmlComments() {
  const strip = (node) => {
    if (Array.isArray(node.children)) {
      node.children = node.children.filter(
        (c) => !(c.type === 'html' && c.value.trimStart().startsWith('<!--'))
      );
      node.children.forEach(strip);
    }
  };
  return (tree) => strip(tree);
}

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), react()],
  markdown: {
    remarkPlugins: [
      remarkCjkFriendly,
      remarkCjkFriendlyGfmStrikethrough,
      remarkStripHtmlComments,
    ],
  },
  vite: {
    // maplibre-gl は CJS/UMD でのみ配布されている（ESM ビルドなし）。
    // Astro の client:only 島は推移的な CJS 依存を自動 pre-bundle しないため、
    // 生の UMD が配信され `does not provide an export named 'default'` で落ちる。
    // ここで明示的に pre-bundle させると ESM 化され、maps-react から読めるようになる。
    // 地図系 React ラッパー全般（react-map-gl 等）で必要な定番設定。
    optimizeDeps: { include: ['maplibre-gl', '@geolonia/maps-core', '@geolonia/maps-suite'] },
  },
});