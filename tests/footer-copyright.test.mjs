/**
 * フッターの著作権表示の検査。
 *
 * 年を手で書くと更新を忘れるので、ビルドした年を入れる。
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const layout = await readFile(new URL('../src/layouts/BaseLayout.astro', import.meta.url), 'utf8');

const copyright = () => {
  const match = layout.match(/<p class="site-foot__copyright">([\s\S]*?)<\/p>/);
  assert.ok(match, 'フッターに著作権表示が見つからない');
  return match[1];
};

test('著作権表示の終わりの年はビルドした年を入れる', () => {
  assert.match(copyright(), /\{copyrightYear\}/);
  assert.match(layout, /const copyrightYear = new Date\(\)\.getFullYear\(\);/);
});

test('著作権表示は 2020 年から始まる', () => {
  assert.match(copyright(), /Copyright &copy; 2020-\{copyrightYear\} Geolonia\.com/);
});
