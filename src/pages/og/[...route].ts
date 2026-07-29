// 各ページの OGP 画像をビルド時に生成する。出力先は /og/<ページのパス>.png。
// スラッグは astro-og-canvas の既定規則に任せ、参照側（BaseLayout）は
// src/lib/og.ts の ogImagePath() で同じパスを組み立てる。
//
// 対象は src/pages 配下の .md / .mdx 全部。デモページ（demos/inline/[id].astro）は
// iframe 用で単体では共有されないため、拡張子の時点で対象外になる。
import { createRequire } from 'node:module';
import { OGImageRoute } from 'astro-og-canvas';
import { packageLabel } from '../../lib/api-nav';

// CanvasKit は woff2 を読めないため TTF が要る。Noto Sans JP は DS の
// --font-family-base の先頭でもある。@fontsource は woff/woff2 しか配らないので、
// 静的ウェイトの TTF を同梱している @expo-google-fonts を font ファイルの供給元として使う
// （npm パッケージなので lockfile で固定でき、リポジトリに 5MB 級のバイナリを置かずに済む）。
const require = createRequire(import.meta.url);
const fontFile = (weight: '400Regular' | '700Bold') =>
  require.resolve(`@expo-google-fonts/noto-sans-jp/${weight}/NotoSansJP_${weight}.ttf`);

// DS トークン（src/styles/ds-tokens.css）の値。オレンジテーマを適用しているサイト本体に合わせる。
const ORANGE = [255, 127, 20] as [number, number, number]; // --color-action-primary
const INK = [35, 32, 29] as [number, number, number]; // --color-structure-navy
const MUTED = [90, 90, 90] as [number, number, number]; // --color-text-secondary

export const { getStaticPaths, GET } = await OGImageRoute({
  pages: import.meta.glob('/src/pages/**/*.{md,mdx}', { eager: true }),

  getImageOptions: (path, page: any) => {
    const fm = page.frontmatter ?? {};
    // TypeDoc 由来のリファレンスには kicker が無いので、ApiLayout が meta description に
    // 使うのと同じ文言（<パッケージ名> の API リファレンス）を当てて画像と HTML をそろえる。
    // 手書きの索引 reference/index.md はパッケージ配下ではないので対象外にする。
    const underReference = path.startsWith('/src/pages/reference/')
      ? path.slice('/src/pages/reference/'.length)
      : '';
    const refDir = underReference.includes('/') ? underReference.split('/')[0] : undefined;
    const fallback = refDir
      ? `${packageLabel(refDir)} の API リファレンス`
      : 'Geolonia Maps 公式ドキュメント';
    return {
      title: fm.title ?? 'Geolonia Docs',
      // 専用の description があればそれを、無ければ見出し上のアイキャッチ（kicker）を使う。
      // frontmatter の quadrant は読者に見せない管理用メタデータなので使わない（DocLayout と同じ扱い）。
      description: fm.description ?? fm.kicker ?? fallback,
      logo: { path: './src/assets/og-logo.png', size: [300] },
      // 白地にオレンジの縁取り。DS のオレンジテーマは「白/グレーを基調にオレンジを効かせる」規則で、
      // オレンジ地に文字を乗せる使い方は禁止されている。
      bgGradient: [
        [255, 255, 255],
        [246, 244, 242],
      ],
      border: { color: ORANGE, width: 14, side: 'inline-start' },
      font: {
        title: { color: INK, size: 60, weight: 'Bold', lineHeight: 1.3, families: ['Noto Sans JP'] },
        description: { color: MUTED, size: 30, families: ['Noto Sans JP'] },
      },
      fonts: [fontFile('400Regular'), fontFile('700Bold')],
    };
  },
});
