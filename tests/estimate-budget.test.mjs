/**
 * src/lib/estimate-budget/calc.mjs の単体テスト。料金の目安（/pricing/estimate-budget/）の計算。
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { FREE_LOADS, PRO_MONTHLY_JPY, monthlyCostJpy } from '../src/lib/pricing.mjs';
import {
  CHART_MIN_RANGE,
  MAP_RATIOS,
  MAX_PAGE_VIEWS,
  chartPoints,
  chartRange,
  estimate,
  growth,
  loadsFromPageViews,
} from '../src/lib/estimate-budget/calc.mjs';

test('PV と地図のあるページの割合から表示回数を出し、端数は切り上げる', () => {
  assert.equal(loadsFromPageViews(100_000, 1), 100_000);
  assert.equal(loadsFromPageViews(100_000, 0.04), 4_000);
  assert.equal(loadsFromPageViews(101, 0.5), 51);
});

test('PV か割合が 0 以下や数でないときは 0 回', () => {
  assert.equal(loadsFromPageViews(0, 1), 0);
  assert.equal(loadsFromPageViews(-1, 1), 0);
  assert.equal(loadsFromPageViews(Number.NaN, 1), 0);
  assert.equal(loadsFromPageViews(100, 0), 0);
});

test('割合は 1 を超えても 1 として扱う（同じページの地図は何枚でも 1 回）', () => {
  assert.equal(loadsFromPageViews(100, 3), 100);
});

test('割合の選択肢は 0 より大きく 1 以下で、最初が 1', () => {
  assert.equal(MAP_RATIOS[0].value, 1);
  for (const r of MAP_RATIOS) assert.ok(r.value > 0 && r.value <= 1);
});

test('Free の範囲は 0 円で、内訳は無い', () => {
  const r = estimate(FREE_LOADS);
  assert.equal(r.plan, 'Free');
  assert.equal(r.jpy, 0);
  assert.equal(r.perLoad, 0);
  assert.deepEqual(r.breakdown, []);
});

test('Free を超えると Pro の月額からで、月額は pricing.mjs と同じ', () => {
  const r = estimate(FREE_LOADS + 1);
  assert.equal(r.plan, 'Pro');
  assert.equal(r.jpy, PRO_MONTHLY_JPY);
  for (const loads of [100_000, 500_000, 1_000_000, 6_000_000]) {
    assert.equal(estimate(loads).jpy, monthlyCostJpy(loads));
  }
});

test('税込は 1 円単位に丸める', () => {
  assert.equal(estimate(100_000).jpyWithTax, Math.round(monthlyCostJpy(100_000) * 1.1));
});

test('アクセスが増えたときの月額は、倍率どおりの回数で計算する', () => {
  const rows = growth(100_000);
  assert.deepEqual(rows.map((r) => r.factor), [1, 2, 5, 10]);
  assert.equal(rows[0].ratio, 1);
  assert.equal(rows[3].loads, 1_000_000);
  assert.equal(rows[3].jpy, monthlyCostJpy(1_000_000));
});

test('今の見込みが 0 円なら、比は出さない', () => {
  assert.equal(growth(10_000)[1].ratio, null);
});

test('グラフの横軸は見込みの 10 倍までを、きりのよい数に切り上げる', () => {
  assert.equal(chartRange(100_000), 1_000_000);
  assert.equal(chartRange(300_000), 5_000_000);
  assert.equal(chartRange(150_000), 2_000_000);
  assert.equal(chartRange(1_000), CHART_MIN_RANGE);
  assert.equal(chartRange(null), CHART_MIN_RANGE);
});

test('グラフの点は 0 から上限まで昇順で、境目の前後を含む', () => {
  const pts = chartPoints([FREE_LOADS, 100_000, 5_000_000], 1_000_000);
  assert.equal(pts[0].loads, 0);
  assert.equal(pts.at(-1).loads, 1_000_000);
  for (let i = 1; i < pts.length; i++) assert.ok(pts[i].loads > pts[i - 1].loads);
  const at = (l) => pts.find((p) => p.loads === l);
  assert.equal(at(FREE_LOADS).jpy, 0);
  assert.equal(at(FREE_LOADS + 1).jpy, PRO_MONTHLY_JPY);
  assert.ok(at(100_001));
  // 範囲の外の境目は足さない
  assert.equal(at(5_000_000), undefined);
});

test('入力できる PV の上限を超える値や無限大は計算しない（グラフが作れなくなるため）', () => {
  assert.equal(loadsFromPageViews(MAX_PAGE_VIEWS, 1), MAX_PAGE_VIEWS);
  assert.equal(loadsFromPageViews(MAX_PAGE_VIEWS + 1, 1), 0);
  assert.equal(loadsFromPageViews(1e308, 1), 0);
  assert.equal(loadsFromPageViews(Infinity, 1), 0);
  assert.ok(Number.isFinite(chartRange(MAX_PAGE_VIEWS)));
});
