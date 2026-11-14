// 料金の目安（/pricing/estimate-budget/）の計算。料金そのものは src/lib/pricing.mjs。
// .mjs にしてあるのは、ページのビルドとブラウザのスクリプトに加えて tests/ の node:test からも直接読むため。
import { FREE_LOADS, monthlyCostJpy, usageBreakdown, withTax } from '../pricing.mjs';

/** グラフの横軸の最小の範囲（月の地図表示回数）。Free と Pro の境目が見える広さにする */
export const CHART_MIN_RANGE = 100_000;

/** 入力できる月間ページビューの上限。これより大きい値は計算しない（グラフの目盛りが作れなくなるため） */
export const MAX_PAGE_VIEWS = 1_000_000_000;

/**
 * 月間ページビューの選択肢。実数を入れずに、おおよその値から選んでもらう（コスト削減診断と同じ）。
 * 最大でも MAX_PAGE_VIEWS 以下にする。
 */
export const PAGE_VIEW_OPTIONS = [
  10_000, 20_000, 30_000, 50_000,
  100_000, 200_000, 300_000, 500_000,
  1_000_000, 2_000_000, 3_000_000, 5_000_000,
  10_000_000, 20_000_000, 30_000_000, 50_000_000,
  100_000_000,
];

/**
 * 選択肢の表示名（例: 約 10 万 PV、約 1 億 PV）。
 * @param {number} n
 */
export function pageViewLabel(n) {
  if (n >= 100_000_000) return `約 ${(n / 100_000_000).toLocaleString('ja-JP')} 億 PV`;
  if (n >= 10_000) return `約 ${(n / 10_000).toLocaleString('ja-JP')} 万 PV`;
  return `約 ${n.toLocaleString('ja-JP')} PV`;
}

/** アクセスが増えたときの月額として並べる倍率 */
export const GROWTH_FACTORS = [1, 2, 5, 10];

/** 地図が表示されるページの割合の選択肢。1 は「すべてのページに地図がある」 */
export const MAP_RATIOS = [
  { value: 1, label: 'すべてのページ' },
  { value: 0.5, label: '2 ページに 1 回' },
  { value: 0.2, label: '5 ページに 1 回' },
  { value: 0.1, label: '10 ページに 1 回' },
  { value: 0.04, label: '25 ページに 1 回' },
];

/**
 * 月間のページビューと、地図が表示されるページの割合から、月の地図表示回数を求める。
 * 回数は整数に切り上げる（端数の 1 回も数える）。
 * @param {number} pageViews
 * @param {number} ratio 0 より大きく 1 以下
 */
export function loadsFromPageViews(pageViews, ratio) {
  if (!(pageViews > 0) || !(ratio > 0) || !(pageViews <= MAX_PAGE_VIEWS)) return 0;
  return Math.ceil(pageViews * Math.min(ratio, 1));
}

/**
 * 月の地図表示回数から、月額とその内訳を求める。
 * @param {number} loads
 */
export function estimate(loads) {
  const jpy = monthlyCostJpy(loads);
  const plan = loads <= FREE_LOADS ? 'Free' : 'Pro';
  return {
    loads,
    plan,
    jpy,
    jpyWithTax: Math.round(withTax(jpy)),
    // 1 回あたりの平均（税抜）。Free は 0 円
    perLoad: loads > 0 ? jpy / loads : 0,
    breakdown: plan === 'Pro' ? usageBreakdown(loads) : [],
  };
}

/**
 * 表示回数が倍率どおりに増えたときの月額。ratio は 1 倍のときの月額に対する比。
 * @param {number} loads
 * @param {number[]} [factors]
 */
export function growth(loads, factors = GROWTH_FACTORS) {
  const base = monthlyCostJpy(loads);
  return factors.map((factor) => {
    const l = loads * factor;
    const jpy = monthlyCostJpy(l);
    return { factor, loads: l, jpy, ratio: base > 0 ? jpy / base : null };
  });
}

/**
 * グラフの横軸の上限。選んだ回数の 10 倍（「アクセスが増えたときの月額」の表の最大）と CHART_MIN_RANGE の大きい方を、
 * 1, 2, 5 × 10^n のきりのよい数に切り上げる。
 * @param {number | null} loads
 */
export function chartRange(loads) {
  const want = Math.max((loads ?? 0) * Math.max(...GROWTH_FACTORS), CHART_MIN_RANGE);
  const pow = 10 ** Math.floor(Math.log10(want));
  for (const m of [1, 2, 5, 10]) if (m * pow >= want) return m * pow;
  return 10 * pow;
}

/**
 * グラフの線の点。0 から max まで等間隔に取り、料金の段の境目では前後の点を足す
 * （境目で線が曲がる位置と、Free から Pro に変わる段差を正確に描くため）。
 * @param {number[]} boundaries 段の境目の回数
 * @param {number} max 横軸の上限
 * @param {number} [count]
 */
export function chartPoints(boundaries, max, count = 200) {
  const xs = new Set();
  for (let i = 0; i <= count; i++) xs.add(Math.round((max * i) / count));
  for (const b of boundaries) {
    if (b > 0 && b < max) {
      xs.add(b);
      xs.add(b + 1);
    }
  }
  return [...xs].sort((a, b) => a - b).map((loads) => ({ loads, jpy: monthlyCostJpy(loads) }));
}
