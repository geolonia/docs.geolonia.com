/**
 * scripts/to-reference.mjs（TypeDoc の出力をリファレンスのページとして取り込む）の検査。
 *
 * 一時ディレクトリに TypeDoc 風の .md を置き、スクリプトを実際に走らせて出力を見る。
 */
import { after, test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const script = fileURLToPath(new URL('../scripts/to-reference.mjs', import.meta.url));

const roots = [];
after(() => {
  for (const root of roots) fs.rmSync(root, { recursive: true, force: true });
});

const setup = (files) => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'to-reference-'));
  roots.push(root);
  const src = path.join(root, 'api-docs');
  const dest = path.join(root, 'reference', 'core');
  fs.mkdirSync(src, { recursive: true });
  for (const [name, body] of Object.entries(files)) fs.writeFileSync(path.join(src, name), body);
  return { root, src, dest };
};

const run = ({ src, dest }) =>
  execFileSync(process.execPath, [script, src, dest, '/reference/core'], { encoding: 'utf8', stdio: 'pipe' });

const titleOf = (file) => fs.readFileSync(file, 'utf8').match(/^title: '(.*)'$/m)[1];

test('title は H1 の Markdown エスケープを外して書き出す', () => {
  const ctx = setup({
    'Variable.DEFAULT_STAGE.md': '# Variable: DEFAULT\\_STAGE\n\n本文\n',
    'Class.Map.md': '# Class: Map\\<T\\>\n',
    'Function.a.md': '# Function: a\\*b\\`c\\[d\\]\n',
  });
  run(ctx);
  assert.equal(titleOf(path.join(ctx.dest, 'Variable.DEFAULT_STAGE.md')), 'Variable: DEFAULT_STAGE');
  assert.equal(titleOf(path.join(ctx.dest, 'Class.Map.md')), 'Class: Map<T>');
  assert.equal(titleOf(path.join(ctx.dest, 'Function.a.md')), 'Function: a*b`c[d]');
});

test('本文は TypeDoc の出力のまま残す', () => {
  const ctx = setup({ 'Variable.DEFAULT_STAGE.md': '# Variable: DEFAULT\\_STAGE\n\n本文\n' });
  run(ctx);
  const out = fs.readFileSync(path.join(ctx.dest, 'Variable.DEFAULT_STAGE.md'), 'utf8');
  assert.match(out, /^# Variable: DEFAULT\\_STAGE$/m);
});

test('上流から消えたページは取り込み先から消える', () => {
  const ctx = setup({ 'README.md': '# maps-core\n', 'Class.Map.md': '# Class: Map\n' });
  fs.mkdirSync(ctx.dest, { recursive: true });
  fs.writeFileSync(path.join(ctx.dest, 'Function.removed.md'), '# 上流で削除されたページ\n');
  run(ctx);
  assert.deepEqual(fs.readdirSync(ctx.dest).sort(), ['Class.Map.md', 'index.md']);
});

test('取り込み先の外にあるファイルには触らない', () => {
  const ctx = setup({ 'Class.Map.md': '# Class: Map\n' });
  const outside = path.join(ctx.root, 'reference', 'index.md');
  fs.mkdirSync(ctx.dest, { recursive: true });
  fs.writeFileSync(outside, '手書きの索引\n');
  run(ctx);
  assert.equal(fs.readFileSync(outside, 'utf8'), '手書きの索引\n');
});

test('取り込み先にある .md 以外のファイルには触らない', () => {
  const ctx = setup({ 'Class.Map.md': '# Class: Map\n' });
  fs.mkdirSync(ctx.dest, { recursive: true });
  fs.writeFileSync(path.join(ctx.dest, 'image.png'), '');
  run(ctx);
  assert.ok(fs.existsSync(path.join(ctx.dest, 'image.png')));
});

test('取り込み元に .md が無いときは、取り込み先を消さずに止まる', () => {
  const ctx = setup({});
  fs.mkdirSync(ctx.dest, { recursive: true });
  fs.writeFileSync(path.join(ctx.dest, 'Class.Map.md'), '# Class: Map\n');
  assert.throws(() => run(ctx), /Command failed/);
  assert.deepEqual(fs.readdirSync(ctx.dest), ['Class.Map.md']);
});
