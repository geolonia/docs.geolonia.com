// 料金の目安（/pricing/estimate-budget/）の入力欄。PV と地図のあるページの割合から、
// 月の地図表示回数と月額を出し、グラフに印を付ける。計算は calc.mjs、グラフは chart.mjs。
import { FREE_LOADS, PRO_INCLUDED_LOADS, PRO_MONTHLY_JPY } from '../pricing.mjs';
import { estimate, growth, loadsFromPageViews } from './calc.mjs';
import { renderBudgetChart } from './chart.mjs';

const fmt = (n) => Math.round(n).toLocaleString('ja-JP');
const fmtPrice = (n) => n.toLocaleString('ja-JP', { maximumFractionDigits: 4 });

const form = document.getElementById('eb-form');
const result = document.getElementById('eb-result');
const chart = document.querySelector('[data-eb="chart"]');

if (form && result && chart) {
  const pv = form.elements.namedItem('pv');
  const ratio = form.elements.namedItem('ratio');
  const set = (key, text) => {
    for (const node of result.querySelectorAll(`[data-eb="${key}"]`)) node.textContent = text;
  };
  let selected = null;

  const update = () => {
    const loads = loadsFromPageViews(Number(pv.value), Number(ratio.value));
    if (!(loads > 0)) {
      selected = null;
      result.hidden = true;
      renderBudgetChart(chart, null);
      return;
    }
    selected = loads;
    const r = estimate(loads);
    set('loads', fmt(r.loads));
    set('jpy', fmt(r.jpy));
    set('jpy-tax', fmt(r.jpyWithTax));
    set('plan', r.plan);
    set('per-load', r.plan === 'Free' ? '0' : fmtPrice(Math.round(r.perLoad * 1000) / 1000));

    const rows = result.querySelector('[data-eb="breakdown"]');
    rows.textContent = '';
    if (r.plan === 'Pro') {
      const base = document.createElement('li');
      base.textContent = `Pro プランの月額：${fmt(PRO_MONTHLY_JPY)} 円（${fmt(PRO_INCLUDED_LOADS)} 回までを含む）`;
      rows.append(base);
      for (const b of r.breakdown) {
        const li = document.createElement('li');
        li.textContent = `${fmt(b.from)} 〜 ${fmt(b.to)} 回目の ${fmt(b.count)} 回：${fmtPrice(b.price)} 円 × ${fmt(b.count)} 回 ＝ ${fmt(b.jpy)} 円`;
        rows.append(li);
      }
    } else {
      const li = document.createElement('li');
      li.textContent = `Free プランの範囲です（月 ${fmt(FREE_LOADS)} 回まで、0 円）。`;
      rows.append(li);
    }

    const body = result.querySelector('[data-eb="growth"]');
    body.textContent = '';
    for (const g of growth(loads)) {
      const tr = document.createElement('tr');
      const th = document.createElement('th');
      th.scope = 'row';
      th.textContent = g.factor === 1 ? '今の見込み' : `${g.factor} 倍`;
      const tdLoads = document.createElement('td');
      tdLoads.textContent = `${fmt(g.loads)} 回`;
      const tdJpy = document.createElement('td');
      tdJpy.textContent = `${fmt(g.jpy)} 円`;
      const tdRatio = document.createElement('td');
      tdRatio.textContent = g.factor === 1 || g.ratio == null ? '' : `${g.ratio.toFixed(1)} 倍`;
      tr.append(th, tdLoads, tdJpy, tdRatio);
      body.append(tr);
    }

    result.hidden = false;
    renderBudgetChart(chart, selected);
  };

  form.addEventListener('input', update);
  form.addEventListener('submit', (e) => e.preventDefault());
  let width = chart.clientWidth;
  new ResizeObserver(() => {
    if (chart.clientWidth !== width) {
      width = chart.clientWidth;
      renderBudgetChart(chart, selected);
    }
  }).observe(chart);
  update();
}
