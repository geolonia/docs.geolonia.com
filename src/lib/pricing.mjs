// Geolonia Maps の料金。/pricing/ の表と計算例はここから作る。
//
// 金額はすべて税抜の円。料金を改定したら、この値と /pricing/ の本文を直す。
// .mjs にしてあるのは、ページのビルドに加えて tests/ の node:test からも直接読むため。

/** Free プランで使える月の地図表示回数 */
export const FREE_LOADS = 20_000;

/** Pro プランの月額（税抜、円） */
export const PRO_MONTHLY_JPY = 3980;

/** Pro プランの月額に含まれる地図表示回数 */
export const PRO_INCLUDED_LOADS = 50_000;

/** 消費税率 */
export const TAX_RATE = 0.1;

/**
 * Pro プランの従量課金の段階。upTo 回目までの1回あたりの単価（税抜、円）。
 * 最初の段は月額に含まれる分なので 0 円。
 * @type {{ upTo: number, price: number }[]}
 */
export const PRO_TIERS = [
  { upTo: PRO_INCLUDED_LOADS, price: 0 },
  { upTo: 100_000, price: 0.4 },
  { upTo: 500_000, price: 0.3 },
  { upTo: 1_000_000, price: 0.23 },
  { upTo: 5_000_000, price: 0.12 },
  { upTo: Infinity, price: 0.06 },
];

// 浮動小数の端数（0.1 + 0.2 など）を落とす
const tidy = (n) => Math.round(n * 1e6) / 1e6;

/**
 * 段階料金の合計。unit は price の単位あたりの回数（1 回あたりなら 1、1,000 回あたりなら 1000）。
 * @param {{ upTo: number, price: number }[]} tiers
 * @param {number} loads
 * @param {number} [unit]
 */
export function tieredCost(tiers, loads, unit = 1) {
  let cost = 0;
  let from = 0;
  for (const { upTo, price } of tiers) {
    if (loads <= from) break;
    cost += ((Math.min(loads, upTo) - from) * price) / unit;
    from = upTo;
  }
  return tidy(cost);
}

/**
 * 月の地図表示回数から、Geolonia Maps の月額（税抜、円）を求める。
 * Free の範囲なら 0 円、超えたら Pro の月額と従量課金の合計。
 * @param {number} loads
 */
export function monthlyCostJpy(loads) {
  if (loads <= FREE_LOADS) return 0;
  return Math.round(PRO_MONTHLY_JPY + tieredCost(PRO_TIERS, loads));
}

/**
 * 税込の金額。1 円未満は切り捨てずに残す（単価 0.23 円の税込は 0.253 円）。
 * @param {number} jpy
 */
export function withTax(jpy) {
  return tidy(jpy * (1 + TAX_RATE));
}

/**
 * 月額の内訳。従量課金の段ごとに、回数の範囲・回数・単価・金額を返す（月額に含まれる段は除く）。
 * /pricing/ の計算例はこれで作る。
 * @param {number} loads
 */
export function usageBreakdown(loads) {
  const rows = [];
  let from = 0;
  for (const { upTo, price } of PRO_TIERS) {
    if (loads <= from) break;
    const count = Math.min(loads, upTo) - from;
    if (price > 0) rows.push({ from: from + 1, to: Math.min(loads, upTo), count, price, jpy: tidy(count * price) });
    from = upTo;
  }
  return rows;
}
