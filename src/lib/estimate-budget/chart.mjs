// 月の地図表示回数と月額の関係を折れ線で描く。横軸は 0 から chartRange の値まで（選んだ回数の 10 倍以上）。
// 両軸とも等間隔の目盛りにして、月額が回数にどう比例するかをそのまま見せる。
// 外部ライブラリは使わない（CSP とサイズのため）。色は components.css の .eb-chart-* でトークンから当てる。
import { FREE_LOADS, PRO_TIERS, monthlyCostJpy } from '../pricing.mjs';
import { chartPoints, chartRange, stepLoads } from './calc.mjs';

const SVG_NS = 'http://www.w3.org/2000/svg';
// 描き直しをまたいで残す状態（フォーカス中の回数と、グラフの外のタップの登録）
const state = new WeakMap();
const H = 320;

const fmt = (n) => Math.round(n).toLocaleString('ja-JP');
// 目盛りの数を万と億で短く書く
const short = (n) => (n >= 100_000_000 ? `${(n / 100_000_000).toLocaleString('ja-JP')}億` : n >= 10_000 ? `${(n / 10_000).toLocaleString('ja-JP')}万` : fmt(n));
const fmtLoads = (n) => (n === 0 ? '0' : `${short(n)}回`);
const fmtYen = (n) => (n === 0 ? '0' : `${short(n)}円`);

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
 * @param {number | null} selected 印を付ける月の地図表示回数（無ければ null）
 */
export function renderBudgetChart(root, selected) {
  // 描き直す前にフォーカスを持っていたら、描き直した後に同じ回数でフォーカスを戻す
  const prev = root.querySelector('svg');
  const hadFocus = prev != null && prev === document.activeElement;
  prev?.remove();
  root.querySelector('.cr-chart-tooltip')?.remove();

  // viewBox を表示幅と同じにして、文字を縮めない。狭い画面では余白と目盛りの数を詰める
  const W = Math.max(300, Math.round(root.clientWidth || 720));
  const narrow = W < 560;
  const M = { top: 16, right: narrow ? 36 : 40, bottom: 36, left: narrow ? 68 : 72 };
  const iw = W - M.left - M.right;
  const ih = H - M.top - M.bottom;

  const xMax = chartRange(selected);
  const maxJpy = monthlyCostJpy(xMax);
  const yStep = niceStep(maxJpy, 4);
  const yMax = Math.ceil((maxJpy * 1.05) / yStep) * yStep;
  const xStep = niceStep(xMax, narrow ? 2 : 5);
  const x = (loads) => M.left + (Math.min(Math.max(loads, 0), xMax) / xMax) * iw;
  const y = (jpy) => M.top + ih - (jpy / yMax) * ih;

  // キーボードでも任意の回数の月額を読めるよう、グラフ全体を slider にする（矢印キーでポインタと同じ刻みずつ動かす）
  const svg = el('svg', {
    viewBox: `0 0 ${W} ${H}`,
    role: 'slider',
    tabindex: 0,
    'aria-label': `月の地図表示回数（0〜${fmt(xMax)} 回）と月額（税抜）`,
    'aria-valuemin': 0,
    'aria-valuemax': xMax,
  });

  // Free の範囲を薄く塗る
  el('rect', { x: M.left, y: M.top, width: x(FREE_LOADS) - M.left, height: ih, class: 'eb-chart-free' }, svg);
  if (x(FREE_LOADS) - M.left > 36) {
    const freeLabel = el('text', { x: M.left + 6, y: M.top + 14, class: 'cr-chart-axis' }, svg);
    freeLabel.textContent = 'Free';
  }

  // 縦軸の目盛り
  for (let v = 0; v <= yMax; v += yStep) {
    el('line', { x1: M.left, x2: M.left + iw, y1: y(v), y2: y(v), class: v === 0 ? 'eb-chart-baseline' : 'eb-chart-grid' }, svg);
    const t = el('text', { x: M.left - 8, y: y(v), 'text-anchor': 'end', 'dominant-baseline': 'middle', class: 'cr-chart-axis' }, svg);
    t.textContent = fmtYen(v);
  }

  // 横軸の目盛り
  for (let v = 0; v <= xMax; v += xStep) {
    const t = el('text', { x: x(v), y: M.top + ih + 18, 'text-anchor': 'middle', class: 'cr-chart-axis' }, svg);
    t.textContent = fmtLoads(v);
  }

  // 料金の線
  const boundaries = [FREE_LOADS, ...PRO_TIERS.map((t) => t.upTo).filter(Number.isFinite)];
  el('path', {
    d: chartPoints(boundaries, xMax).map((p, i) => `${i === 0 ? 'M' : 'L'}${x(p.loads).toFixed(1)},${y(p.jpy).toFixed(1)}`).join(' '),
    class: 'eb-chart-line',
  }, svg);

  // 選んだ回数の印
  if (selected != null && selected > 0) {
    const jpy = monthlyCostJpy(selected);
    const sx = x(selected);
    const sy = y(jpy);
    el('line', { x1: sx, x2: sx, y1: sy, y2: M.top + ih, class: 'eb-chart-drop' }, svg);
    el('circle', { cx: sx, cy: sy, r: 6, class: 'eb-chart-point' }, svg);
    const right = sx > M.left + iw * 0.6;
    const label = el('text', {
      x: sx + (right ? -10 : 10),
      y: Math.max(sy - 12, M.top + 12),
      'text-anchor': right ? 'end' : 'start',
      class: 'cr-chart-label eb-chart-label',
    }, svg);
    label.textContent = `${fmt(jpy)} 円`;
  }

  // ポインタを載せた位置（タッチではタップした位置）の回数と月額を出す
  const guide = el('line', { y1: M.top, y2: M.top + ih, class: 'eb-chart-guide', visibility: 'hidden' }, svg);
  root.appendChild(svg);
  const tip = document.createElement('div');
  tip.className = 'cr-chart-tooltip';
  tip.hidden = true;
  root.appendChild(tip);

  const hide = () => {
    tip.hidden = true;
    guide.setAttribute('visibility', 'hidden');
  };
  // 刻みは画面幅によらず、横軸の範囲を 5 等分した目盛りの 1/1000（キーボードとポインタで同じ）。
  // 範囲が 100 万回までなら 200 回刻みで、75,000 回のような値にも止まれる
  const unit = niceStep(xMax, 5) / 1000;
  const kept = hadFocus ? state.get(root)?.cursor : undefined;
  let cursor = kept != null ? Math.min(kept, xMax) : selected != null && selected > 0 ? Math.min(selected, xMax) : 0;
  svg.setAttribute('aria-valuenow', String(cursor));
  svg.setAttribute('aria-valuetext', `月 ${fmt(cursor)} 回、月額 ${fmt(monthlyCostJpy(cursor))} 円`);
  const showAt = (loads) => {
    cursor = loads;
    state.set(root, { ...state.get(root), cursor });
    const rect = svg.getBoundingClientRect();
    const text = `月 ${fmt(loads)} 回、月額 ${fmt(monthlyCostJpy(loads))} 円`;
    svg.setAttribute('aria-valuenow', String(loads));
    svg.setAttribute('aria-valuetext', text);
    guide.setAttribute('x1', String(x(loads)));
    guide.setAttribute('x2', String(x(loads)));
    guide.setAttribute('visibility', 'visible');
    tip.textContent = '';
    const head = document.createElement('div');
    head.className = 'cr-chart-tooltip-head';
    head.textContent = `月 ${fmt(loads)} 回`;
    const row = document.createElement('div');
    row.className = 'cr-chart-tooltip-row';
    row.append('月額（税抜）');
    const strong = document.createElement('strong');
    strong.textContent = `${fmt(monthlyCostJpy(loads))} 円`;
    row.append(strong);
    tip.append(head, row);
    tip.hidden = false;
    const left = (x(loads) / W) * rect.width;
    tip.style.left = `${Math.min(Math.max(left - 100, 0), Math.max(rect.width - 200, 0))}px`;
    tip.style.top = '8px';
  };
  const show = (e) => {
    const rect = svg.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * W;
    if (px < M.left || px > M.left + iw) return hide();
    showAt(Math.round((((px - M.left) / iw) * xMax) / unit) * unit);
  };
  // キーボード: 矢印で 1 刻み、PageUp / PageDown で 100 刻み、Home / End で両端へ（calc.mjs の stepLoads）
  svg.addEventListener('keydown', (e) => {
    const next = stepLoads(cursor, e.key, unit, xMax);
    if (next == null) return;
    e.preventDefault();
    showAt(next);
  });
  svg.addEventListener('focus', () => showAt(cursor));
  svg.addEventListener('blur', hide);
  // タッチ端末ではタップ（pointerdown）でも出す（コスト削減診断のグラフと同じ）
  svg.addEventListener('pointermove', show);
  svg.addEventListener('pointerdown', show);
  // タッチでは指を離すと pointerleave が来るので、隠すのはマウスとペンのときだけにする
  svg.addEventListener('pointerleave', (e) => {
    if (e.pointerType !== 'touch') hide();
  });
  // タッチで出したものは、グラフの外をタップしたら閉じる。描き直すたびに前の登録を外す
  state.get(root)?.outside?.abort();
  const outside = new AbortController();
  state.set(root, { ...state.get(root), outside });
  document.addEventListener('pointerdown', (e) => {
    if (!svg.contains(e.target)) hide();
  }, { signal: outside.signal });
  if (hadFocus) svg.focus();
}
