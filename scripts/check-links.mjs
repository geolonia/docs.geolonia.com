/**
 * ビルド出力（dist/）の内部リンクが実在するかを確かめる。
 *
 * ソースの .md / .mdx ではなく dist/ の HTML を見るのが要点である。理由は2つ。
 *
 *   1. 描画されないリンクを数えてしまわない。src/pages/reference/ 配下には
 *      TypeDoc のパンくずが残っているが、astro.config.mjs の
 *      remarkStripTypedocBreadcrumb が H1 より前を落とすので読者には出ない。
 *      ソースを grep すると、踏めないリンクを不具合として報告してしまう。
 *   2. レイアウトやコンポーネントが組み立てたリンクも対象になる。サイドバーや
 *      パンくずはソースに文字列として存在しない。
 *
 * public/_redirects も読む。実体のページが無くても転送先があるなら健全とみなす。
 * 転送先はさらに解決するので、転送先が404なら落ちる。
 *
 * 使い方:
 *   npm run build && npm run check:links
 */
import fs from 'node:fs';
import path from 'node:path';

const DIST = 'dist';

if (!fs.existsSync(DIST)) {
  console.error(`${DIST}/ がありません。先に npm run build を実行してください。`);
  process.exit(1);
}

// ── dist/_redirects を読む ──────────────────────────────────
// 書式は `<from> <to> [status]` の空白区切り。# 始まりと空行は無視する。
const readRedirects = () => {
  const p = path.join(DIST, '_redirects');
  if (!fs.existsSync(p)) return new Map();
  const map = new Map();
  for (const line of fs.readFileSync(p, 'utf8').split('\n')) {
    const s = line.trim();
    if (!s || s.startsWith('#')) continue;
    const [from, to] = s.split(/\s+/);
    if (from && to && !map.has(from)) map.set(from, to);
  }
  return map;
};

const redirects = readRedirects();

// ── dist/ の HTML を集める ────────────────────────────────
const htmlFiles = [];
const walk = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full);
    else if (e.name.endsWith('.html')) htmlFiles.push(full);
  }
};
walk(DIST);

// ── パスがビルド出力に存在するか ───────────────────────────
// 末尾スラッシュ無しでも index.html があれば良しとする。Astro が 307 で
// スラッシュ付きへ送るため、本番でも 200 に行き着く。
const existsAsFile = (p) => {
  const rel = p.replace(/^\//, '');
  const candidates = p.endsWith('/')
    ? [path.join(DIST, rel, 'index.html')]
    : [path.join(DIST, rel), path.join(DIST, `${rel}.html`), path.join(DIST, rel, 'index.html')];
  return candidates.some((c) => fs.existsSync(c) && fs.statSync(c).isFile());
};

// 転送を追って解決する。循環は打ち切って未解決とする。
const resolves = (p) => {
  let cur = p;
  for (let hop = 0; hop < 10; hop++) {
    if (existsAsFile(cur)) return true;
    const to = redirects.get(cur);
    if (!to) return false;
    if (/^https?:\/\//.test(to)) return true; // 外部への転送は追わない
    cur = to;
  }
  return false;
};

// ── リンクを抽出する ──────────────────────────────────────
// href と src のうち、`/` 始まりのサイト内絶対パスだけを対象にする。
// `//example.com` はプロトコル相対の外部リンクなので除く。
const targets = new Map(); // path -> Set(参照元)

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  for (const m of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
    const raw = m[1];
    if (raw.startsWith('//')) continue;
    let p = raw.split('#')[0].split('?')[0];
    if (!p) continue;
    try {
      p = decodeURIComponent(p);
    } catch {
      // 不正なエスケープはそのまま扱う
    }
    if (!targets.has(p)) targets.set(p, new Set());
    targets.get(p).add(path.relative(DIST, file));
  }
}

// ── 判定 ──────────────────────────────────────────────────
const broken = [...targets.keys()].filter((p) => !resolves(p)).sort();

console.log(`dist/ の HTML ${htmlFiles.length} 件から内部リンク ${targets.size} 種類を検査しました。`);
console.log(`_redirects の規則: ${redirects.size} 件`);

if (broken.length === 0) {
  console.log('リンク切れはありません。');
  process.exit(0);
}

console.error(`\nリンク切れ ${broken.length} 件:`);
for (const p of broken) {
  const refs = [...targets.get(p)].sort();
  const shown = refs.slice(0, 5);
  console.error(`\n  ${p}`);
  console.error(`    参照元 ${refs.length} 件: ${shown.join(', ')}${refs.length > shown.length ? ' ほか' : ''}`);
}
process.exit(1);
