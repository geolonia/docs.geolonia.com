import { test } from 'node:test';
import assert from 'node:assert/strict';
/**
 * src/lib/cost-reduction/calc.mjs の単体テスト。コスト削減診断（/pricing/cost-reduction/）の計算。
 * Geolonia Maps の料金そのものは tests/pricing.test.mjs で確かめる。
 */
import { PROVIDERS, providerCostUsd, providerLoadsFromUsd, providerBillJpy, estimate, rateRange, rateOf } from '../src/lib/cost-reduction/calc.mjs';
import { monthlyCostJpy as geoloniaCostJpy } from '../src/lib/pricing.mjs';

test('Google: 無料枠 10,000 回までは 0 ドル', () => {
  assert.equal(providerCostUsd('google', 0), 0);
  assert.equal(providerCostUsd('google', 10_000), 0);
});

test('Google: 段階料金を合計する', () => {
  // 90,000 回 × $7.00 / 1,000
  assert.equal(providerCostUsd('google', 100_000), 630);
  // 630 + 400,000 × 5.60 / 1,000
  assert.equal(providerCostUsd('google', 500_000), 2870);
  // 2870 + 500,000 × 4.20 / 1,000
  assert.equal(providerCostUsd('google', 1_000_000), 4970);
  // 4970 + 4,000,000 × 2.10 / 1,000
  assert.equal(providerCostUsd('google', 5_000_000), 13370);
  // 13370 + 1,000,000 × 0.53 / 1,000
  assert.equal(providerCostUsd('google', 6_000_000), 13900);
});

test('Google: 金額から表示回数を逆算する', () => {
  assert.equal(providerLoadsFromUsd('google', 0), 10_000);
  assert.equal(providerLoadsFromUsd('google', 70), 20_000);
  assert.equal(providerLoadsFromUsd('google', 630), 100_000);
  assert.equal(providerLoadsFromUsd('google', 700), 112_500);
  assert.equal(providerLoadsFromUsd('google', 13900), 6_000_000);
});

test('Mapbox: 無料枠 50,000 回までは 0 ドル', () => {
  assert.equal(providerCostUsd('mapbox', 50_000), 0);
});

test('Mapbox: 段階料金を合計する', () => {
  // 50,000 回 × $5.00 / 1,000
  assert.equal(providerCostUsd('mapbox', 100_000), 250);
  // 250 + 100,000 × 4.00 / 1,000
  assert.equal(providerCostUsd('mapbox', 200_000), 650);
  // 650 + 800,000 × 3.00 / 1,000
  assert.equal(providerCostUsd('mapbox', 1_000_000), 3050);
  // 3050 + 4,000,000 × 2.50 / 1,000
  assert.equal(providerCostUsd('mapbox', 5_000_000), 13050);
  // 500 万回を超えた分も $2.50 で計算する（公式は個別見積り）
  assert.equal(providerCostUsd('mapbox', 6_000_000), 15550);
});

test('Mapbox: 金額から表示回数を逆算する', () => {
  assert.equal(providerLoadsFromUsd('mapbox', 0), 50_000);
  assert.equal(providerLoadsFromUsd('mapbox', 250), 100_000);
  assert.equal(providerLoadsFromUsd('mapbox', 950), 300_000);
});

test('逆算は往復で一致する', () => {
  for (const id of Object.keys(PROVIDERS)) {
    for (const loads of [61_234, 98_765, 432_100, 876_543, 3_210_000, 9_999_999]) {
      assert.equal(providerLoadsFromUsd(id, providerCostUsd(id, loads)), loads, `${id} ${loads}`);
    }
  }
});

test('Geolonia: 20,000 回までは Free で 0 円', () => {
  assert.equal(geoloniaCostJpy(0), 0);
  assert.equal(geoloniaCostJpy(20_000), 0);
});

test('Geolonia: 20,001 〜 50,000 回は Pro の 3,980 円', () => {
  assert.equal(geoloniaCostJpy(20_001), 3980);
  assert.equal(geoloniaCostJpy(50_000), 3980);
});

test('Geolonia: /pricing/ の計算例と一致する', () => {
  // 3,980 + 0.4 × 50,000 + 0.3 × 400,000
  assert.equal(geoloniaCostJpy(500_000), 143_980);
});

test('Geolonia: すべての段階を通る', () => {
  // 3,980 + 20,000 + 120,000 + 115,000 + 480,000 + 0.06 × 1,000,000
  assert.equal(geoloniaCostJpy(6_000_000), 798_980);
});

test('estimate: Google の請求額から削減額を出す', () => {
  const r = estimate({ provider: 'google', billJpy: 105_000, jpyPerUsd: 150 });
  assert.equal(r.loads, 112_500);
  assert.equal(r.geoloniaJpy, 27_730);
  assert.equal(r.savingJpy, 77_270);
  assert.equal(r.savingAnnualJpy, 927_240);
  assert.equal(Math.round(r.savingRate * 1000) / 10, 73.6);
  assert.equal(r.withinFreeTier, false);
});

test('estimate: Mapbox の請求額から削減額を出す', () => {
  // $950 → 300,000 回。Geolonia は 3,980 + 20,000 + 0.3 × 200,000
  const r = estimate({ provider: 'mapbox', billJpy: 142_500, jpyPerUsd: 150 });
  assert.equal(r.loads, 300_000);
  assert.equal(r.geoloniaJpy, 83_980);
  assert.equal(r.savingJpy, 58_520);
});

test('estimate: Geolonia の方が高い場合は削減額が負になる', () => {
  // Mapbox $50 → 60,000 回。Geolonia は 3,980 + 0.4 × 10,000 = 7,980 円
  const r = estimate({ provider: 'mapbox', billJpy: 7_500, jpyPerUsd: 150 });
  assert.equal(r.loads, 60_000);
  assert.equal(r.geoloniaJpy, 7_980);
  assert.equal(r.savingJpy, -480);
});

test('estimate: 請求額 0 円は無料枠内', () => {
  const r = estimate({ provider: 'google', billJpy: 0, jpyPerUsd: 150 });
  assert.equal(r.withinFreeTier, true);
  assert.equal(r.savingRate, 0);
});

test('estimate: 不正な入力は null', () => {
  assert.equal(estimate({ provider: 'google', billJpy: -1, jpyPerUsd: 150 }), null);
  assert.equal(estimate({ provider: 'google', billJpy: NaN, jpyPerUsd: 150 }), null);
  assert.equal(estimate({ provider: 'google', billJpy: 1000, jpyPerUsd: 0 }), null);
  assert.equal(estimate({ provider: 'unknown', billJpy: 1000, jpyPerUsd: 150 }), null);
});

test('providerBillJpy: 同じ表示回数でも為替で円の請求額が変わる', () => {
  // Google 112,500 回 = $700
  assert.equal(providerBillJpy('google', 112_500, 150), 105_000);
  assert.equal(providerBillJpy('google', 112_500, 113.83), 79_681);
  assert.equal(providerBillJpy('google', 112_500, 162.33), 113_631);
});

test('rateRange: 期間中の最も円高と円安の月を返す', () => {
  const rates = [['2021-11', 113.97], ['2021-12', 113.83], ['2026-07', 162.33], ['2026-10', 157.97]];
  assert.deepEqual(rateRange(rates), {
    min: { month: '2021-12', rate: 113.83 },
    max: { month: '2026-07', rate: 162.33 },
  });
});

test('rateOf: 月のレートを返し、無い月は null', () => {
  const rates = [['2026-09', 156.42], ['2026-10', 157.97]];
  assert.equal(rateOf(rates, '2026-10'), 157.97);
  assert.equal(rateOf(rates, '2020-01'), null);
});
