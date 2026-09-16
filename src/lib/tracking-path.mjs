// Mixpanel の Pageview に送るパス。
//
// docs は末尾にスラッシュの付いた URL を出す（/tutorials/）が、
// app.geolonia.com は付けない（/api-keys）。同じ Mixpanel プロジェクトに
// 送って横断で集計するため、表記を app 側に揃える。
//
// このファイルだけ .mjs にしてある。src/lib の他のモジュールは Astro の
// ビルド時に動く .ts だが、これはブラウザに配るスクリプトから読むうえ、
// tests/ の node:test からも直接読んで検証したいため。

/**
 * @param {string} pathname `location.pathname`
 * @returns {string} 末尾のスラッシュを落としたパス。ルートは `/` のまま。
 */
const trackingPath = (pathname) => pathname.replace(/\/+$/, '') || '/';

export default trackingPath;
