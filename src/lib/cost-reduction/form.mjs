// /pricing/cost-reduction/ の入力欄と結果表示をつなぐ。計算は calc.mjs、グラフは chart.mjs に任せる。
import { estimate, PROVIDERS, GEOLONIA_FREE_LOADS, providerBillJpy, rateOf, rateRange } from './calc.mjs';
import { renderFxChart } from './chart.mjs';
import usdjpy from '../../data/usdjpy-monthly.json';

/** @type {[string, number][]} */
const rates = /** @type {any} */ (usdjpy.rates);
const fx = rateRange(rates);

const form = /** @type {HTMLFormElement | null} */ (document.getElementById('cr-form'));
const result = document.getElementById('cr-result');
const empty = document.getElementById('cr-empty');

if (form && result && empty) {
  const bill = /** @type {HTMLSelectElement} */ (form.querySelector('#cr-bill'));
  const rate = /** @type {HTMLInputElement} */ (form.querySelector('#cr-rate'));
  const month = /** @type {HTMLSelectElement} */ (form.querySelector('#cr-month'));
  const fxRows = /** @type {HTMLElement} */ (result.querySelector('[data-cr="fx-rows"]'));
  const fxAllRows = /** @type {HTMLElement} */ (result.querySelector('[data-cr="fx-all-rows"]'));
  const chart = /** @type {HTMLElement} */ (result.querySelector('[data-cr="chart"]'));

  const fmt = (n) => n.toLocaleString('ja-JP');
  const fmtMonth = (m) => `${m.slice(0, 4)}年${Number(m.slice(5, 7))}月`;
  const set = (key, text) => {
    for (const el of result.querySelectorAll(`[data-cr="${key}"]`)) el.textContent = text;
  };
  const show = (block, visible) => {
    const el = /** @type {HTMLElement | null} */ (result.querySelector(`[data-cr-block="${block}"]`));
    if (el) el.hidden = !visible;
  };

  /** 為替の表の 1 行。label は行見出し、r は 1 米ドルあたりの円 */
  const fxRow = (provider, loads, geoloniaJpy, label, r) => {
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    th.scope = 'row';
    th.textContent = `${label} ${r.toFixed(2)} 円`;
    const td1 = document.createElement('td');
    td1.textContent = `${fmt(providerBillJpy(provider, loads, r))} 円`;
    const td2 = document.createElement('td');
    td2.textContent = `${fmt(geoloniaJpy)} 円`;
    tr.append(th, td1, td2);
    return tr;
  };

  // 為替の表：最も円高の月、請求月（入力したレート）、最も円安の月。
  // その下の折りたたみに、グラフと同じ全月の値を新しい月から並べる（ツールチップはポインターでしか開けないため）
  const renderFxRows = (provider, loads, geoloniaJpy, billMonth, jpyPerUsd) => {
    const rows = [
      [`${fmtMonth(fx.min.month)}（5 年で最も円高）`, fx.min.rate],
      // グラフの点は請求月の月平均、この行は入力欄のレート。書き換えた場合に区別できるようにする
      [`${fmtMonth(billMonth)}（入力したレート）`, jpyPerUsd],
      [`${fmtMonth(fx.max.month)}（5 年で最も円安）`, fx.max.rate],
    ];
    fxRows.replaceChildren(...rows.map(([label, r]) => fxRow(provider, loads, geoloniaJpy, label, r)));
    fxAllRows.replaceChildren(
      ...[...rates].reverse().map(([m, r]) => fxRow(provider, loads, geoloniaJpy, fmtMonth(m), r)),
    );
  };

  const update = () => {
    const provider = String(new FormData(form).get('provider') ?? '');
    const jpyPerUsd = Number(rate.value);
    const r = bill.value === '' ? null : estimate({ provider, billJpy: Number(bill.value), jpyPerUsd });
    result.hidden = r === null;
    empty.hidden = r !== null;
    if (!r) return;

    // 削減できる / 無料枠内 / Geolonia Maps の方が高い の 3 通り
    show('saving', !r.withinFreeTier && r.savingJpy > 0);
    show('free', r.withinFreeTier);
    show('higher', !r.withinFreeTier && r.savingJpy <= 0);
    show('fx', !r.withinFreeTier);

    const p = PROVIDERS[provider];
    set('saving', fmt(r.savingJpy));
    set('annual', fmt(r.savingAnnualJpy));
    set('rate', String(Math.round(r.savingRate * 100)));
    set('diff', fmt(-r.savingJpy));
    set('loads', r.withinFreeTier ? `${fmt(r.loads)} 以下` : fmt(r.loads));
    set('provider', p.label);
    set('bill', fmt(Number(bill.value)));
    set('geolonia', fmt(r.geoloniaJpy));
    set('plan', r.loads <= GEOLONIA_FREE_LOADS ? 'Free' : 'Pro');
    result.querySelector('[data-cr="cta"]')?.setAttribute('href', p.migrationUrl);
    set('skill-command', p.skillCommand);

    if (r.withinFreeTier) return;
    renderFxRows(provider, r.loads, r.geoloniaJpy, month.value, jpyPerUsd);
    renderFxChart(chart, {
      label: p.label,
      color: p.color,
      rates,
      values: rates.map(([, rt]) => providerBillJpy(provider, r.loads, rt)),
      geolonia: r.geoloniaJpy,
      billMonth: month.value,
    });
  };

  // 請求月を選ぶと、その月の平均レートを入れる（手で書き換えてもよい）
  month.addEventListener('change', () => {
    const r = rateOf(rates, month.value);
    if (r !== null) rate.value = String(r);
  });

  // 画面幅が変わったらグラフを描き直す
  let lastWidth = chart.clientWidth;
  new ResizeObserver(() => {
    if (result.hidden || chart.clientWidth === lastWidth) return;
    lastWidth = chart.clientWidth;
    update();
  }).observe(chart);

  form.addEventListener('input', update);
  form.addEventListener('change', update);
  form.addEventListener('submit', (e) => e.preventDefault());
  update();
}
