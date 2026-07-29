// OGP 画像のパス規約。生成側（src/pages/og/[...route].ts）と参照側（BaseLayout の
// meta タグ）の両方から使う。ここがずれると og:image が 404 になるので、規約は
// この 1 か所だけに置く。
//
// 生成側は astro-og-canvas の既定の getSlug に任せている。その規則は
//   /src/pages/index.mdx     → index.png
//   /src/pages/howto/index.md → howto.png
//   /src/pages/howto/3d.mdx   → howto/3d.png
// なので、ページの URL パスから逆算するとこの関数になる。

/**
 * ページの URL パス（例: `/howto/3d/`）に対応する OGP 画像のパスを返す。
 * トップページ（`/`）だけは対応するスラッグが空になるため `index` を割り当てる。
 */
export const ogImagePath = (pathname: string): string => {
  const slug = pathname.replace(/^\/+|\/+$/g, '');
  return `/og/${slug || 'index'}.png`;
};
