/**
 * Mixpanel の Pageview に送るパスの検査。
 *
 * docs は末尾にスラッシュの付いた URL を出すが、app.geolonia.com は付けない。
 * 同じプロジェクトに送って横断で集計するので、表記を app 側に揃える。
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import trackingPath from '../src/lib/tracking-path.mjs';

test('末尾のスラッシュを落とす', () => {
  assert.equal(trackingPath('/tutorials/'), '/tutorials');
  assert.equal(trackingPath('/howto/address-search/'), '/howto/address-search');
  assert.equal(trackingPath('/reference/suite/'), '/reference/suite');
});

test('スラッシュの付かないパスはそのまま返す', () => {
  assert.equal(trackingPath('/tutorials'), '/tutorials');
  assert.equal(trackingPath('/llms.txt'), '/llms.txt');
});

test('ルートはスラッシュ1つのままにする', () => {
  assert.equal(trackingPath('/'), '/');
  assert.equal(trackingPath('//'), '/');
});

test('空文字はルートとして扱う', () => {
  assert.equal(trackingPath(''), '/');
});
