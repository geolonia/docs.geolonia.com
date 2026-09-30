/**
 * ビルド出力（dist/）の本文に、強調や取り消し線になり損ねた `**` と `~~` が
 * 残っていないかを確かめる。
 *
 * Markdown は Sätteri で処理しており、Sätteri は CommonMark のフランキング規則を
 * そのまま適用する。日本語では、`**` の内側の端が全角の約物（」や）など）で、
 * 外側に文字が続くと、強調として認識されない。
 *
 *   NG: **「一覧データ＋ループ」**で考えます
 *   OK: **「一覧データ＋ループ」** で考えます
 *
 * このとき、ビルドは通り、`**` が文字のまま表示される。気付けるのは読んだときだけ
 * なので、ここで機械的に拾う。コードとして書いた `**` は対象外にする。
 *
 * 使い方:
 *   npm run build && npm run check:emphasis
 */
import fs from 'node:fs';
import path from 'node:path';

const DIST = 'dist';

if (!fs.existsSync(DIST)) {
  console.error(`${DIST}/ がありません。先に npm run build を実行してください。`);
  process.exit(1);
}

const htmlFiles = [];
const walk = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full);
    else if (e.name.endsWith('.html')) htmlFiles.push(full);
  }
};
walk(DIST);

// コード、スクリプト、スタイルの中身は本文ではないので落とす。
// 残りのタグも落とし、テキストだけにしてから探す。
const toText = (html) =>
  html
    .replace(/<(pre|code|script|style|textarea)\b[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]*>/g, ' ');

const problems = [];
for (const file of htmlFiles) {
  const text = toText(fs.readFileSync(file, 'utf8'));
  for (const m of text.matchAll(/\*\*|~~/g)) {
    const around = text.slice(Math.max(0, m.index - 20), m.index + 22).replace(/\s+/g, ' ');
    problems.push(`${path.relative(DIST, file)}: …${around}…`);
  }
}

console.log(`dist/ の HTML ${htmlFiles.length} 件の本文を検査しました。`);
if (problems.length > 0) {
  console.error(`強調になっていない記号が ${problems.length} 件あります。`);
  for (const p of problems) console.error(`  ${p}`);
  console.error('記号の外側に半角スペースを入れると、強調として認識されます。');
  process.exit(1);
}
console.log('強調になっていない記号はありません。');
