/**
 * markdown/plugins.mjs の Sätteri MDAST プラグインの単体テスト。
 *
 * Astro を通さず、Sätteri の markdownToHtml にプラグインだけを載せて変換する。
 * サイト全体に効いているかは `npm run build` と `npm run check:links` の役目。
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
import { markdownToHtml } from 'satteri';
import { stripHtmlComments, stripTypedocBreadcrumb } from '../markdown/plugins.mjs';

const render = (md, fileURL) =>
  markdownToHtml(md, {
    mdastPlugins: [stripHtmlComments, stripTypedocBreadcrumb],
    fileURL,
  }).html;

const reference = pathToFileURL('/repo/src/pages/reference/suite/Map.md');
const other = pathToFileURL('/repo/src/pages/howto/foo.md');

test('HTML コメントのブロックを出力から落とす', () => {
  const html = render('<!-- OUTLINE\n執筆用メモ\n-->\n\n本文', other);
  assert.doesNotMatch(html, /OUTLINE|執筆用メモ/);
  assert.match(html, /<p>本文<\/p>/);
});

test('リストの中の HTML コメントも落とす', () => {
  const html = render('- 項目\n\n  <!-- メモ -->\n', other);
  assert.doesNotMatch(html, /メモ/);
  assert.match(html, /項目/);
});

test('コメント以外の HTML は残す', () => {
  const html = render('<div class="note">残す</div>', other);
  assert.match(html, /<div class="note">残す<\/div>/);
});

test('reference 配下では最初の H1 より前を落とす', () => {
  const md = '[@geolonia/maps-suite](/reference/suite/) / [geolonia](/reference/suite/Namespace.geolonia)\n\n# Class: Map\n\n本文';
  const html = render(md, reference);
  assert.doesNotMatch(html, /href="\/reference\/suite\/(Namespace\.geolonia)?"/);
  assert.match(html, /<h1>Class: Map<\/h1>/);
  assert.match(html, /本文/);
});

test('reference 配下でも H1 より後ろは落とさない', () => {
  const html = render('# Class: Map\n\n[リンク](/reference/suite/)', reference);
  assert.match(html, /href="\/reference\/suite\/"/);
});

test('reference 以外のページでは H1 より前を残す', () => {
  const html = render('前置き\n\n# 見出し', other);
  assert.match(html, /前置き/);
});
