/**
 * フッターの「資料」欄の検査。
 *
 * 全ページに出るリンクなので、URL の書き換えと、別タブで開くときの rel の付け忘れを止める。
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const layout = await readFile(new URL('../src/layouts/BaseLayout.astro', import.meta.url), 'utf8');

const links = () => {
  const match = layout.match(/<nav class="site-foot__links"[\s\S]*?<\/nav>/);
  assert.ok(match, 'フッターに「資料」欄が見つからない');
  return match[0];
};

test('「資料」欄は見出しで名前を付けたナビゲーションである', () => {
  assert.match(links(), /aria-labelledby="site-foot-docs-heading"/);
  assert.match(links(), /id="site-foot-docs-heading">資料</);
});

test('製品紹介スライドへのリンクがある', () => {
  assert.match(links(), /href="https:\/\/geolonia\.github\.io\/geolonia-maps-livedeck\/"/);
});

test('別タブで開くリンクには rel="noopener noreferrer" を付ける', () => {
  for (const [a] of links().matchAll(/<a [^>]*>/g)) {
    if (/target="_blank"/.test(a)) assert.match(a, /rel="noopener noreferrer"/, a);
  }
});
