/**
 * ヘッダの「ユーザー登録」導線に付ける流入元パラメータの検査。
 *
 * app.geolonia.com の Mixpanel は UTM の5種（utm_source / utm_medium /
 * utm_campaign / utm_content / utm_term）だけを自動でイベントに載せる。
 * 独自の `ref` は Mixpanel からは見えないので、付け直しを防ぐために
 * リンクの中身をここで固定する。
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const layout = await readFile(new URL('../src/layouts/BaseLayout.astro', import.meta.url), 'utf8');

/** ヘッダのユーザー登録リンクの href を取り出す。 */
const signupHref = () => {
  const match = layout.match(/class="site-cta__link site-cta__signup" href="([^"]+)"/);
  assert.ok(match, 'ヘッダにユーザー登録リンクが見つからない');
  // Astro のテンプレートは HTML なので & がエスケープされている。
  return match[1].replaceAll('&amp;', '&');
};

test('ユーザー登録リンクは UTM で流入元を伝える', () => {
  const url = new URL(signupHref());
  assert.equal(url.searchParams.get('utm_source'), 'docs.geolonia.com');
  assert.equal(url.searchParams.get('utm_medium'), 'referral');
  assert.equal(url.searchParams.get('utm_content'), 'header-cta');
});

test('ユーザー登録リンクは Mixpanel が読めない ref を使わない', () => {
  const url = new URL(signupHref());
  assert.equal(url.searchParams.has('ref'), false);
});

test('ユーザー登録リンクの遷移先は signup 画面のままである', () => {
  const url = new URL(signupHref());
  assert.equal(url.origin, 'https://app.geolonia.com');
  assert.equal(url.hash, '#/signup');
  assert.equal(url.searchParams.get('lang'), 'ja');
});
