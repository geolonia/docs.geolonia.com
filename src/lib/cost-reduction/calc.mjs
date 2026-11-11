// 他社の地図 API の請求額から地図表示回数を逆算し、Geolonia Maps の料金と比べる。
// DOM に触れない純粋関数だけを置く（tests/cost-reduction.test.mjs で単体テストする）。
// Geolonia Maps の料金は /pricing/ と同じ src/lib/pricing.mjs から読む。

import { FREE_LOADS, monthlyCostJpy, tieredCost } from '../pricing.mjs';

/** Geolonia Maps の Free プランで使える月の地図表示回数 */
export const GEOLONIA_FREE_LOADS = FREE_LOADS;

/**
 * @typedef {{ upTo: number, price: number }} Tier
 * 前の段の upTo から、この段の upTo までに price を掛ける。upTo が Infinity なら上限なし。
 *
 * @typedef {{
 *   label: string,
 *   color: string,
 *   sku: string,
 *   freeLoads: number,
 *   tiers: Tier[],
 *   sourceUrl: string,
 *   migrationUrl: string,
 *   note?: string,
 * }} Provider
 */

// 料金を確認した日。料金表を更新したらここも変える
export const PRICES_CHECKED = '2026年11月11日';

/** @type {Record<string, Provider>} USD / 1,000 回 */
export const PROVIDERS = {
  google: {
    label: 'Google Maps',
    // グラフの線の色。Geolonia Maps のオレンジと色覚の多様性を考えても見分けられる濃さにしてある
    color: '#1b6e3a',
    sku: 'Dynamic Maps',
    freeLoads: 10_000,
    tiers: [
      { upTo: 10_000, price: 0 },
      { upTo: 100_000, price: 7.0 },
      { upTo: 500_000, price: 5.6 },
      { upTo: 1_000_000, price: 4.2 },
      { upTo: 5_000_000, price: 2.1 },
      { upTo: Infinity, price: 0.53 },
    ],
    sourceUrl: 'https://developers.google.com/maps/billing-and-pricing/pricing',
    // 切り替えに使う AI エージェントスキル
    migrationUrl: 'https://github.com/geolonia/geolonia-agent-skills/tree/main/skills/geolonia-google-maps-migration',
  },
  mapbox: {
    label: 'Mapbox',
    color: '#3a6fb5',
    sku: 'Map Loads for Web',
    freeLoads: 50_000,
    tiers: [
      { upTo: 50_000, price: 0 },
      { upTo: 100_000, price: 5.0 },
      { upTo: 200_000, price: 4.0 },
      { upTo: 1_000_000, price: 3.0 },
      // 公式は 500 万回を超えると個別見積り。ここでは $2.50 のまま計算する
      { upTo: Infinity, price: 2.5 },
    ],
    sourceUrl: 'https://www.mapbox.com/pricing',
    migrationUrl: 'https://github.com/geolonia/geolonia-agent-skills/tree/main/skills/geolonia-mapbox-migration',
    note: '5,000,000 回を超える分は個別見積りのため、$2.50 で計算しています。',
  },
};

/** 他社の月額（USD） */
export function providerCostUsd(id, loads) {
  return tieredCost(PROVIDERS[id].tiers, loads, 1000);
}

/** 他社の月額（USD）から地図表示回数を逆算する。無料枠は使い切った前提。 */
export function providerLoadsFromUsd(id, usd) {
  let remaining = usd;
  let from = 0;
  for (const { upTo, price } of PROVIDERS[id].tiers) {
    if (price === 0) {
      from = upTo;
      continue;
    }
    const bandCost = upTo === Infinity ? Infinity : ((upTo - from) * price) / 1000;
    if (remaining <= bandCost) {
      return Math.round(from + (remaining * 1000) / price);
    }
    remaining -= bandCost;
    from = upTo;
  }
  return from;
}

/** 他社の月額を円にする。料金はドル建てなので、同じ表示回数でも為替で変わる */
export function providerBillJpy(id, loads, jpyPerUsd) {
  return Math.round(providerCostUsd(id, loads) * jpyPerUsd);
}

/**
 * @typedef {[string, number]} MonthlyRate 月（YYYY-MM）と、その月の平均レート（円 / USD）
 */

/** 月のレート。無い月は null */
export function rateOf(/** @type {MonthlyRate[]} */ rates, month) {
  const hit = rates.find(([m]) => m === month);
  return hit ? hit[1] : null;
}

/** 期間中で最も円高（min）と円安（max）の月 */
export function rateRange(/** @type {MonthlyRate[]} */ rates) {
  let min = rates[0];
  let max = rates[0];
  for (const r of rates) {
    if (r[1] < min[1]) min = r;
    if (r[1] > max[1]) max = r;
  }
  return {
    min: { month: min[0], rate: min[1] },
    max: { month: max[0], rate: max[1] },
  };
}

/**
 * savingJpy は負になりうる（Geolonia Maps の方が高い場合）。
 * withinFreeTier は請求額 0 円、つまり他社の無料枠の範囲内で、表示回数を決められない場合。
 * @param {{ provider: string, billJpy: number, jpyPerUsd: number }} input
 * @returns {null | { loads: number, geoloniaJpy: number, savingJpy: number, savingAnnualJpy: number, savingRate: number, withinFreeTier: boolean }}
 */
export function estimate({ provider, billJpy, jpyPerUsd }) {
  if (!Object.hasOwn(PROVIDERS, provider)) return null;
  if (!Number.isFinite(billJpy) || billJpy < 0) return null;
  if (!Number.isFinite(jpyPerUsd) || jpyPerUsd <= 0) return null;
  const loads = providerLoadsFromUsd(provider, billJpy / jpyPerUsd);
  const geoloniaJpy = monthlyCostJpy(loads);
  const savingJpy = Math.round(billJpy - geoloniaJpy);
  return {
    loads,
    geoloniaJpy,
    savingJpy,
    savingAnnualJpy: savingJpy * 12,
    savingRate: billJpy > 0 ? savingJpy / billJpy : 0,
    withinFreeTier: billJpy === 0,
  };
}
