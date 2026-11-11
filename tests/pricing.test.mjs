/**
 * src/lib/pricing.mjs の単体テスト。/pricing/ に載せる表と計算例は、この計算から作る。
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  FREE_LOADS,
  PRO_MONTHLY_JPY,
  PRO_TIERS,
  monthlyCostJpy,
  tieredCost,
  usageBreakdown,
  withTax,
} from '../src/lib/pricing.mjs';
import { readFileSync } from 'node:fs';

test('Free の範囲は 0 円', () => {
  assert.equal(monthlyCostJpy(0), 0);
  assert.equal(monthlyCostJpy(FREE_LOADS), 0);
});

test('Free を超えると Pro の月額になる', () => {
  assert.equal(monthlyCostJpy(FREE_LOADS + 1), PRO_MONTHLY_JPY);
  assert.equal(monthlyCostJpy(50_000), 3980);
});

test('Pro の月額に含まれる回数を超えた分は段階ごとの単価で加算する', () => {
  assert.equal(monthlyCostJpy(50_001), 3980);
  assert.equal(monthlyCostJpy(100_000), 3980 + 20_000);
  // /pricing/ の計算例: 3,980 + 0.4 × 50,000 + 0.3 × 400,000
  assert.equal(monthlyCostJpy(500_000), 143_980);
  assert.equal(monthlyCostJpy(1_000_000), 143_980 + 0.23 * 500_000);
  assert.equal(monthlyCostJpy(6_000_000), 258_980 + 0.12 * 4_000_000 + 0.06 * 1_000_000);
});

test('段階の上限は昇順で、最後は上限なし', () => {
  for (let i = 1; i < PRO_TIERS.length; i++) {
    assert.ok(PRO_TIERS[i].upTo > PRO_TIERS[i - 1].upTo);
  }
  assert.equal(PRO_TIERS.at(-1).upTo, Infinity);
});

test('tieredCost は 1,000 回あたりの単価にも使える', () => {
  const tiers = [{ upTo: 10_000, price: 0 }, { upTo: Infinity, price: 7 }];
  assert.equal(tieredCost(tiers, 20_000, 1000), 70);
});

test('税込は 10% を足し、浮動小数の端数を残さない', () => {
  assert.equal(withTax(3980), 4378);
  assert.equal(withTax(0.23), 0.253);
  assert.equal(withTax(143_980), 158_378);
});

test('計算例の内訳は段ごとの金額で、合計は月額と一致する', () => {
  const rows = usageBreakdown(500_000);
  assert.deepEqual(rows, [
    { from: 50_001, to: 100_000, count: 50_000, price: 0.4, jpy: 20_000 },
    { from: 100_001, to: 500_000, count: 400_000, price: 0.3, jpy: 120_000 },
  ]);
  assert.equal(PRO_MONTHLY_JPY + rows.reduce((a, r) => a + r.jpy, 0), monthlyCostJpy(500_000));
});

test('/pricing/ の description（式を使えない frontmatter）が料金の値と一致する', () => {
  const page = readFileSync(new URL('../src/pages/pricing/index.mdx', import.meta.url), 'utf8');
  const description = page.match(/^description: (.+)$/m)[1];
  const fmt = (n) => n.toLocaleString('ja-JP');
  assert.ok(description.includes(`月 ${fmt(FREE_LOADS)} 回までは無料`), description);
  assert.ok(description.includes(`月額 ${fmt(PRO_MONTHLY_JPY)} 円（税抜）`), description);
});
