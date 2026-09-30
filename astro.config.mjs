// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

// Markdown（と、それを引き継ぐ MDX）は Sätteri で処理する。
import { satteri } from '@astrojs/markdown-satteri';
import { stripHtmlComments, stripTypedocBreadcrumb } from './markdown/plugins.mjs';

import react from '@astrojs/react';

// ドキュメントに直接書いた <LiveCode> のコードを、動くデモページに書き出す。
import livecode from './integrations/livecode.mjs';

// /sitemap-index.xml と /sitemap-0.xml を出す。旧サイト（Jekyll）は
// jekyll-sitemap が /sitemap.xml を配信していたので、切替で失われた分を戻す。
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // og:image / canonical を絶対 URL で出すために必要（Astro.site の元になる）。
  site: 'https://docs.geolonia.com',
  integrations: [
    mdx(),
    react(),
    livecode(),
    sitemap({
      // 読者向けのページだけを載せる。除外するのは次の2種類。
      //
      //   /demos/inline/<ID>/ … LiveCode が iframe で読み込むスニペットの実体。
      //     ページ単体では文脈が無く、本文の断片が重複して見えるだけなので、
      //     検索結果に出す価値がない。同じ理由で public/_headers が
      //     X-Robots-Tag: noindex も付けている。sitemap から外すだけでは
      //     「載せない」であって「出すな」にはならないため、両方が要る。
      //
      //   /og/… … OGP 画像を生やすエンドポイント。ページではない。
      filter: (page) => {
        const path = new URL(page).pathname;
        return !path.startsWith('/demos/') && !path.startsWith('/og/');
      },
    }),
  ],
  markdown: {
    processor: satteri({
      mdastPlugins: [stripHtmlComments, stripTypedocBreadcrumb],
    }),
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