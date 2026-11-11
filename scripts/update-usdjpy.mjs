// コスト削減診断（/pricing/cost-reduction/）が使うドル円の月平均を更新する。
// 半年に一度、手で実行してコミットする: npm run update:usdjpy
// 出典は FRED の EXJPUS（FRB の H.10、月平均、円 / USD）。直近 60 か月だけ残す。
import { writeFile } from 'node:fs/promises';

const MONTHS = 60;
const OUT = new URL('../src/data/usdjpy-monthly.json', import.meta.url);
const CSV_URL = 'https://fred.stlouisfed.org/graph/fredgraph.csv?id=EXJPUS';

const res = await fetch(CSV_URL);
if (!res.ok) throw new Error(`FRED から取得できませんでした: ${res.status}`);
const rates = (await res.text())
  .trim()
  .split('\n')
  .slice(1)
  .map((line) => line.split(','))
  // 値がまだ出ていない月は "." になっている
  .filter(([, v]) => v && v !== '.')
  .map(([date, v]) => [date.slice(0, 7), Math.round(Number(v) * 100) / 100])
  .slice(-MONTHS);

if (rates.length < MONTHS) throw new Error(`データが ${rates.length} か月分しかありません`);

const data = {
  source: 'FRED EXJPUS (Board of Governors of the Federal Reserve System, H.10)',
  sourceUrl: 'https://fred.stlouisfed.org/series/EXJPUS',
  updated: new Date().toISOString().slice(0, 10),
  rates,
};
const json = JSON.stringify(data, null, 2).replace(/\[\n\s+("\d{4}-\d{2}"),\n\s+([\d.]+)\n\s+\]/g, '[$1, $2]');
await writeFile(OUT, `${json}\n`);
console.log(`${rates[0][0]} 〜 ${rates.at(-1)[0]} の ${rates.length} か月分を書きました`);
