/**
 * 計測スクリプトの置き場所の検査。
 *
 * 記事の本文（BaseLayout）にだけ載せ、デモ（DemoLayout）には載せない。
 * デモは記事内の iframe として読み込まれるので、両方に載せると1ページの
 * 閲覧が二重に記録される。
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(path, import.meta.url), 'utf8');

const baseLayout = await read('../src/layouts/BaseLayout.astro');
const demoLayout = await read('../src/layouts/DemoLayout.astro');
const mixpanel = await read('../src/components/Mixpanel.astro');

test('本文のレイアウトは GA4 と Mixpanel を両方読み込む', () => {
  assert.match(baseLayout, /<Analytics \/>/);
  assert.match(baseLayout, /<Mixpanel \/>/);
});

test('デモのレイアウトは計測スクリプトを読み込まない', () => {
  assert.doesNotMatch(demoLayout, /Analytics/);
  assert.doesNotMatch(demoLayout, /Mixpanel/);
});

test('Mixpanel の送り先は本番ホストかどうかで分ける', () => {
  assert.match(mixpanel, /const PRODUCTION_HOST = 'docs\.geolonia\.com';/);
  assert.match(mixpanel, /const isProduction = location\.hostname === PRODUCTION_HOST;/);
  assert.match(mixpanel, /mixpanel\.init\(isProduction \? TOKEN_PRODUCTION : TOKEN_DEVELOPMENT\);/);
  // init はこの1か所だけ。
  assert.equal(mixpanel.match(/mixpanel\.init\(/g).length, 1);
});

test('Mixpanel のトークンは app と同じプロジェクトのもの', () => {
  // app.geolonia.com の netlify.toml の context.production と
  // context.develop / deploy-preview の値。訪問者の識別子は cookie で
  // 共有されるが、cookie 名がトークンから作られるため、トークンがずれると
  // docs と app が別人として記録される。
  assert.match(mixpanel, /const TOKEN_PRODUCTION = '012def15980f6899b0c457ea325bef5f';/);
  assert.match(mixpanel, /const TOKEN_DEVELOPMENT = '7a365e861ed4ee35992a503f79c25701';/);
});

test('Pageview のイベント名とプロパティは app と揃える', () => {
  assert.match(mixpanel, /mixpanel\.track\('Pageview', \{/);
  assert.match(mixpanel, /path: trackingPath\(location\.pathname\),/);
  assert.match(mixpanel, /site: 'docs',/);
});

test('録画を含まない core のビルドを読む', () => {
  // 既定の入口はセッション録画まで含み、束ねると gzip で 122KB になる。
  // 読み物のサイトに載せる重さではないので core のビルドを直接読む。
  assert.match(mixpanel, /from 'mixpanel-browser\/dist\/mixpanel-core\.cjs\.js'/);
});
