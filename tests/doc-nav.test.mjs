/**
 * ハウツーのサイドバーと /howto/ の一覧ページの分類の検査。
 *
 * サイドバー（src/lib/doc-nav.ts）と一覧ページは手で並べているので、片方だけ直すと食い違う。
 * 分類の名前と、ページの並びが両者で一致することを止める。
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { buildDocNav } from '../src/lib/doc-nav.ts';

const GROUPS = ['基本', '可視化・見た目の制御', '応用（難しめ）', 'CLI（コマンドライン）'];

const index = await readFile(new URL('../src/pages/howto/index.md', import.meta.url), 'utf8');

/** 一覧ページを「## 見出し」ごとに分け、その下のリンク先を並び順に返す。 */
function indexGroups() {
  const groups = [];
  for (const line of index.split('\n')) {
    const heading = line.match(/^## (.+)$/);
    if (heading) groups.push({ label: heading[1], hrefs: [] });
    const item = line.match(/^- \[[^\]]+\]\((\/howto\/[^)]+)\)/);
    if (item && groups.length > 0) groups.at(-1).hrefs.push(item[1]);
  }
  return groups;
}

test('サイドバーの分類は 基本 / 可視化・見た目の制御 / 応用（難しめ）/ CLI の順である', () => {
  assert.deepEqual(buildDocNav('howto', '/howto').groups.map((g) => g.label), GROUPS);
});

test('一覧ページの分類とページの並びは、サイドバーと一致する', () => {
  const nav = buildDocNav('howto', '/howto').groups.map((g) => ({
    label: g.label,
    hrefs: g.links.map((l) => l.href),
  }));
  assert.deepEqual(indexGroups(), nav);
});

test('どのページも、サイドバーに 1 回だけ出る', () => {
  const hrefs = buildDocNav('howto', '/howto').groups.flatMap((g) => g.links.map((l) => l.href));
  assert.equal(new Set(hrefs).size, hrefs.length);
});

test('可視化のページは「可視化・見た目の制御」にある', () => {
  const viz = buildDocNav('howto', '/howto').groups.find((g) => g.label === '可視化・見た目の制御');
  const hrefs = viz.links.map((l) => l.href);
  for (const slug of ['clustering', 'choropleth', 'heatmap', 'extrusion', 'mask']) {
    assert.ok(hrefs.includes(`/howto/${slug}/`), slug);
  }
});

test('ページの中では、そのページを含む分類だけを開く', () => {
  const groups = buildDocNav('howto', '/howto/heatmap').groups;
  assert.deepEqual(groups.filter((g) => g.open).map((g) => g.label), ['可視化・見た目の制御']);
});
