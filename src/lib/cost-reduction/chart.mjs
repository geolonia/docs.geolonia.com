// 同じ表示回数のまま、月ごとの為替で他社の円建て請求額がどう動いたかを折れ線で描く。
// Geolonia Maps は円建てなので水平線になる。外部ライブラリは使わない（CSP とサイズのため）。

const SVG_NS = 'http://www.w3.org/2000/svg';
const H = 300;
const GEOLONIA_COLOR = '#e0730d';

const fmtJpy = (n) => `${Math.round(n).toLocaleString('ja-JP')} 円`;
const fmtMonth = (m) => `${m.slice(0, 4)}年${Number(m.slice(5, 7))}月`;

function el(name, attrs = {}, parent) {
  const node = document.createElementNS(SVG_NS, name);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, String(v));
  if (parent) parent.appendChild(node);
  return node;
}

// 目盛りの刻みを 1, 2, 5 × 10^n にそろえる
function niceStep(max, count) {
  const raw = max / count;
  const pow = 10 ** Math.floor(Math.log10(raw));
  const n = raw / pow;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * pow;
}

/**
 * @param {HTMLElement} root .cr-chart。中に svg と tooltip を作り直す
 * @param {{ label: string, color: string, rates: [string, number][], values: number[], geolonia: number, billMonth: string }} d
 *   values[i] は rates[i] の月のレートで換算した他社の請求額
 */
export function renderFxChart(root, d) {
  const COLOR = { provider: d.color, geolonia: GEOLONIA_COLOR };
  root.querySelector('svg')?.remove();
  root.querySelector('.cr-chart-tooltip')?.remove();

  // viewBox を表示幅と同じにして、文字を縮めない。狭い画面では余白を詰める
  const W = Math.max(300, Math.round(root.clientWidth || 720));
  const narrow = W < 560;
  const M = { top: 16, right: narrow ? 12 : 132, bottom: 32, left: narrow ? 52 : 72 };

  const iw = W - M.left - M.right;
  const ih = H - M.top - M.bottom;
  const step = niceStep(Math.max(...d.values, d.geolonia) * 1.1, 4);
  const yMax = Math.ceil((Math.max(...d.values, d.geolonia) * 1.05) / step) * step;
  const x = (i) => M.left + (i / (d.rates.length - 1)) * iw;
  const y = (v) => M.top + ih - (v / yMax) * ih;

  const first = d.rates[0][0];
  const last = d.rates.at(-1)[0];
  const svg = el('svg', {
    viewBox: `0 0 ${W} ${H}`,
    role: 'img',
    'aria-label': `${fmtMonth(first)}から${fmtMonth(last)}までの各月の為替で換算した ${d.label} の月額（${fmtJpy(Math.min(...d.values))}〜${fmtJpy(Math.max(...d.values))}）と、変わらない Geolonia Maps の月額（${fmtJpy(d.geolonia)}）`,
  });

  // 目盛りと補助線（控えめに）
  for (let v = 0; v <= yMax; v += step) {
    el('line', { x1: M.left, x2: M.left + iw, y1: y(v), y2: y(v), stroke: v === 0 ? '#bbb' : '#eee', 'stroke-width': 1 }, svg);
    const t = el('text', { x: M.left - 8, y: y(v), 'text-anchor': 'end', 'dominant-baseline': 'middle', class: 'cr-chart-axis' }, svg);
    t.textContent = v === 0 ? '0' : v >= 10_000 ? `${(v / 10_000).toLocaleString('ja-JP')}万円` : `${v.toLocaleString('ja-JP')}円`;
  }
  d.rates.forEach(([m], i) => {
    if (!m.endsWith('-01')) return;
    // 狭い画面では 1 年おき
    if (narrow && Number(m.slice(0, 4)) % 2 === 1) return;
    const t = el('text', { x: x(i), y: H - 10, 'text-anchor': 'middle', class: 'cr-chart-axis' }, svg);
    t.textContent = m.slice(0, 4);
  });

  // 折れ線
  const path = d.values.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join('');
  el('path', { d: path, fill: 'none', stroke: COLOR.provider, 'stroke-width': 2, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, svg);
  el('line', { x1: x(0), x2: x(d.rates.length - 1), y1: y(d.geolonia), y2: y(d.geolonia), stroke: COLOR.geolonia, 'stroke-width': 2, 'stroke-linecap': 'round' }, svg);

  // 線の右端に直接ラベル。色は線の短い見本に持たせ、文字は本文の色
  const labels = [
    { text: d.label, v: d.values.at(-1), color: COLOR.provider },
    { text: 'Geolonia Maps', v: d.geolonia, color: COLOR.geolonia },
  ].map((l) => ({ ...l, y: y(l.v) }));
  // 重なる場合は上下に離す
  const [a, b] = labels[0].y <= labels[1].y ? labels : [labels[1], labels[0]];
  if (b.y - a.y < 18) {
    const mid = (a.y + b.y) / 2;
    a.y = mid - 9;
    b.y = mid + 9;
  }
  for (const l of labels) {
    if (narrow) {
      // 狭い画面では右に余白を取れないので、線の右端の上に置く
      const t = el('text', { x: x(d.rates.length - 1), y: l.y - 10, 'text-anchor': 'end', class: 'cr-chart-label' }, svg);
      t.textContent = l.text;
      continue;
    }
    el('line', { x1: x(d.rates.length - 1) + 8, x2: x(d.rates.length - 1) + 20, y1: l.y, y2: l.y, stroke: l.color, 'stroke-width': 2 }, svg);
    const t = el('text', { x: x(d.rates.length - 1) + 24, y: l.y, 'dominant-baseline': 'middle', class: 'cr-chart-label' }, svg);
    t.textContent = l.text;
  }

  // 請求月の点
  const billIndex = d.rates.findIndex(([m]) => m === d.billMonth);
  if (billIndex >= 0) {
    el('circle', { cx: x(billIndex), cy: y(d.values[billIndex]), r: 5, fill: COLOR.provider, stroke: '#fff', 'stroke-width': 2 }, svg);
  }

  // ホバー：縦線、点、ツールチップ
  const hover = el('g', { visibility: 'hidden' }, svg);
  const vline = el('line', { y1: M.top, y2: M.top + ih, stroke: '#999', 'stroke-width': 1, 'stroke-dasharray': '3 3' }, hover);
  const dotP = el('circle', { r: 4, fill: COLOR.provider, stroke: '#fff', 'stroke-width': 2 }, hover);
  const dotG = el('circle', { r: 4, fill: COLOR.geolonia, stroke: '#fff', 'stroke-width': 2 }, hover);
  const hit = el('rect', { x: M.left, y: M.top, width: iw, height: ih, fill: 'transparent' }, svg);

  root.appendChild(svg);
  const tip = document.createElement('div');
  tip.className = 'cr-chart-tooltip';
  tip.hidden = true;
  root.appendChild(tip);

  const move = (ev) => {
    const box = svg.getBoundingClientRect();
    const px = ((ev.clientX - box.left) / box.width) * W;
    const i = Math.max(0, Math.min(d.rates.length - 1, Math.round(((px - M.left) / iw) * (d.rates.length - 1))));
    const cx = x(i);
    vline.setAttribute('x1', String(cx));
    vline.setAttribute('x2', String(cx));
    dotP.setAttribute('cx', String(cx));
    dotP.setAttribute('cy', String(y(d.values[i])));
    dotG.setAttribute('cx', String(cx));
    dotG.setAttribute('cy', String(y(d.geolonia)));
    hover.setAttribute('visibility', 'visible');

    tip.replaceChildren();
    const head = document.createElement('div');
    head.className = 'cr-chart-tooltip-head';
    head.textContent = `${fmtMonth(d.rates[i][0])}（1 ドル ${d.rates[i][1].toFixed(2)} 円）`;
    tip.appendChild(head);
    for (const [label, v, color] of [[d.label, d.values[i], COLOR.provider], ['Geolonia Maps', d.geolonia, COLOR.geolonia]]) {
      const row = document.createElement('div');
      row.className = 'cr-chart-tooltip-row';
      const sw = document.createElement('span');
      sw.className = 'cr-chart-swatch';
      sw.style.background = color;
      const name = document.createElement('span');
      name.textContent = label;
      const val = document.createElement('strong');
      val.textContent = fmtJpy(v);
      row.append(sw, name, val);
      tip.appendChild(row);
    }
    tip.hidden = false;
    const rootBox = root.getBoundingClientRect();
    const left = (cx / W) * box.width + (box.left - rootBox.left);
    tip.style.left = `${Math.min(left + 12, rootBox.width - tip.offsetWidth - 4)}px`;
    tip.style.top = `${(M.top / H) * box.height + (box.top - rootBox.top)}px`;
  };
  const leave = () => {
    hover.setAttribute('visibility', 'hidden');
    tip.hidden = true;
  };
  hit.addEventListener('pointermove', move);
  hit.addEventListener('pointerdown', move);
  hit.addEventListener('pointerleave', leave);
}
