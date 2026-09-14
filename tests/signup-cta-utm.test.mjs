/**
 * ヘッダの「ユーザー登録」導線に付ける流入元パラメータの検査。
 *
 * app.geolonia.com の Mixpanel は UTM の5種（utm_source / utm_medium /
 * utm_campaign / utm_content / utm_term）だけを自動でイベントに載せる。
 * 独自の `ref` は Mixpanel からは見えないので、UTM で流入元を伝える。
 *
 * それと別に、app.geolonia.com が流入元を Cognito のユーザー属性に記録する
 * 処理は `ref` を読む。`utm_source` を読む実装はまだ本番に出ていないため、
 * 本番に出るまでは `ref` も併記しないと、その記録が空になる。
 * 本番に出たあとは `ref` を落として UTM だけにしてよい。
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

test('ユーザー登録リンクは ref も併記して古い実装に備える', () => {
  const url = new URL(signupHref());
  assert.equal(url.searchParams.get('ref'), 'docs.geolonia.com');
  assert.equal(url.searchParams.get('ref'), url.searchParams.get('utm_source'));
});

test('ユーザー登録リンクの遷移先は signup 画面のままである', () => {
  const url = new URL(signupHref());
  assert.equal(url.origin, 'https://app.geolonia.com');
  assert.equal(url.hash, '#/signup');
  assert.equal(url.searchParams.get('lang'), 'ja');
});
