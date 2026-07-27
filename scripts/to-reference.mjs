/**
 * TypeDoc の出力（typedoc-plugin-markdown）を、このサイトのページとして取り込む。
 *
 *   1. 各 SDK のリポジトリで `npm run docs` を実行し api-docs/ を生成する
 *   2. このスクリプトで src/pages/reference/<pkg>/ へ変換コピーする
 *
 * やること:
 *   - frontmatter を付ける（layout / title / page）。title は H1 から取る
 *   - 相対 .md リンクをサイト内の絶対パスへ書き換える
 *   - README.md は index.md にリネームする
 *
 * やらないこと:
 *   - TypeDoc が本文冒頭に出すパンくずの除去。
 *     手でコピーされた場合にも効くよう、ビルド時に remark（astro.config.mjs の
 *     remarkStripTypedocBreadcrumb）で落とす。取り込んだ .md は TypeDoc 出力の
 *     忠実なミラーのままにしておき、上流との差分を取りやすくする。
 *
 * 使い方:
 *   node scripts/to-reference.mjs <srcDir> <destDir> <routeBase> [--skip a.md,b.md]
 *
 * --skip は取り込まないファイル名（カンマ区切り）。
 * maps-suite は名前空間ごとに中継ページを吐くが、中身が次のページへの1リンクしか
 * ないため取り込まない。実体は geolonia.Namespace.maps.md 側にある。
 */
import fs from 'node:fs';
import path from 'node:path';

const argv = process.argv.slice(2);
const positional = [];
let skip = new Set();

for (let i = 0; i < argv.length; i++) {
  if (argv[i] === '--skip') {
    skip = new Set(
      (argv[++i] ?? '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    );
  } else {
    positional.push(argv[i]);
  }
}

const [srcDir, destDir, routeBase] = positional;
if (!srcDir || !destDir || !routeBase) {
  console.error('args: <srcDir> <destDir> <routeBase> [--skip a.md,b.md]');
  process.exit(1);
}

fs.mkdirSync(destDir, { recursive: true });

// title: H1 のテキストから \< \> のエスケープを外す
const titleFromH1 = (body) => {
  const m = body.match(/^#\s+(.+?)\s*$/m);
  if (!m) return null;
  return m[1].replace(/\\([<>])/g, '$1');
};

// リンク書き換え: 相対 .md リンクを route 絶対パスへ。README.md は route ルートへ。
const rewriteLinks = (body) =>
  body.replace(/\]\(([^)]+)\)/g, (whole, target) => {
    // 同一ページ内アンカーや外部/絶対リンクは据え置き
    if (target.startsWith('#') || target.startsWith('/') || /^[a-z]+:\/\//.test(target)) {
      return whole;
    }
    const [file, anchor] = target.split('#');
    if (!file.endsWith('.md')) return whole;
    const name = file.slice(0, -3); // strip .md
    const routePath = name === 'README' ? `${routeBase}/` : `${routeBase}/${name}`;
    return `](${routePath}${anchor ? `#${anchor}` : ''})`;
  });

const files = fs.readdirSync(srcDir).filter((f) => f.endsWith('.md'));
let written = 0;

for (const f of files) {
  if (skip.has(f)) {
    console.log(`${f} -> skip`);
    continue;
  }
  const body = fs.readFileSync(path.join(srcDir, f), 'utf8');
  const title = titleFromH1(body) ?? f.replace(/\.md$/, '');
  const destName = f === 'README.md' ? 'index.md' : f;
  const frontmatter =
    '---\n' +
    'layout: ../../../layouts/ApiLayout.astro\n' +
    `title: '${title.replace(/'/g, "''")}'\n` +
    'page: reference\n' +
    '---\n\n';
  fs.writeFileSync(path.join(destDir, destName), frontmatter + rewriteLinks(body));
  console.log(`${f} -> ${destName}  (title: ${title})`);
  written++;
}

console.log(`\n${written} 件を ${destDir} に書き出しました（skip: ${skip.size} 件）。`);
console.log('上流で削除されたメンバーのファイルは残るので、必要なら手で消してください。');
