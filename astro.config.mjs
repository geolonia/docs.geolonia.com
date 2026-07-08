// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

// 日本語（CJK）で ** 等の強調が全角約物（）。」など）に隣接すると
// CommonMark のフランキング規則で無効化される問題を解消する remark プラグイン。
// HTML 出力用途なのでパースのみの /parseOnly を使う。.md / .mdx 双方に効く。
import remarkCjkFriendly from 'remark-cjk-friendly/parseOnly';
import remarkCjkFriendlyGfmStrikethrough from 'remark-cjk-friendly-gfm-strikethrough/parseOnly';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx()],
  markdown: {
    remarkPlugins: [remarkCjkFriendly, remarkCjkFriendlyGfmStrikethrough],
  },
});
