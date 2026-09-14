/**
 * textlint-rules/no-ai-tone.js の単体テスト。
 *
 * textlint 本体の CLI を通さず、TextlintKernel に Markdown プラグインと
 * このルールだけを載せて1文ずつ判定する。ドキュメント全体の検査は
 * `npm run lint:text` の役目で、ここではルールの当たり外れだけを見る。
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TextlintKernel } from '@textlint/kernel';
import markdownModule from '@textlint/textlint-plugin-markdown';
import noAiTone, { patterns } from '../textlint-rules/no-ai-tone.js';

// CommonJS で書かれたプラグインを ESM から読むと default に本体が入る。
const markdownPlugin = markdownModule.default ?? markdownModule;
const kernel = new TextlintKernel();

/**
 * Markdown の文字列を検査し、検出されたパターン id の配列を返す。
 * @param {string} text
 * @returns {Promise<string[]>}
 */
async function lint(text) {
  const result = await kernel.lintText(text, {
    ext: '.md',
    plugins: [{ pluginId: 'markdown', plugin: markdownPlugin }],
    rules: [{ ruleId: 'no-ai-tone', rule: noAiTone }],
  });
  return result.messages.map((m) => m.message.match(/^\[([a-z-]+)\]/)[1]);
}

/** 検出されるべき文。id はそのパターンの識別子。 */
const violations = [
  { id: 'lens', text: '同じ地図を3つのレンズで読み解けます。' },
  { id: 'step-dan', text: '段0では地図を出します。' },
  { id: 'step-dan', text: 'このチュートリアルは6段で構成されています。' },
  { id: 'step-dan', text: 'この段では場所を指定します。' },
  { id: 'step-dan', text: '前の段でできたことを確認します。' },
  { id: 'entrance', text: 'チュートリアルの入り口です。' },
  { id: 'ladder', text: '能力の梯子を下から順に登ります。' },
  { id: 'horizontal-bar', text: 'スタイル──地図の見た目──を差し替えます。' },
  { id: 'exclamation', text: 'とても簡単に地図が出ます！' },
  { id: 'toriaezu', text: 'とりあえず地図が欲しいときに使います。' },
  { id: 'volitional', text: 'まず、例を見てみましょう。' },
  { id: 'desune', text: 'これで地図が出ましたですね。' },
  { id: 'reassurance', text: 'つまずいても大丈夫です。' },
  { id: 'greeting', text: 'embed チュートリアルへようこそ。' },
  { id: 'greeting', text: 'おめでとうございます。' },
  { id: 'demo-conjunction', text: '地図は出ました。でも、場所は世界全体のままです。' },
  { id: 'try-it', text: '自分の場所に差し替えてみてください。' },
  { id: 'became-able', text: '地図を表示できるようになりました。' },
  { id: 'we-did-it', text: 'ポップアップまでできました。' },
  { id: 'second-person', text: 'あなたの API キーを指定します。' },
  { id: 'second-person', text: '私たちが提供するライブラリです。' },
  { id: 'meta-statement', text: 'このセクションでは属性を解説します。' },
];

/** 検出されてはいけない文。誤検出の防波堤。 */
const allowed = [
  '段階的に機能を追加します。',
  '段落の間に空行を入れます。',
  '手順は次の3つです。',
  'Step 0: 地図を表示する',
  '以上で embed の実装は完了です。次は Step 1 へ進みます。',
  'HTML タグのみで地図を埋め込みたい場合に向いています。',
  '値が不正な場合、属性は無視されます。',
  'API キーはダッシュボードで発行します。',
  '```\n段0のレンズでとりあえずやってみましょう！\n```',
  '`data-lens` 属性は存在しません。',
  // 「でも」は逆接の接続詞のときだけ違反。助詞（〜でも）は通常の日本語。
  'どのライブラリでも、手順は同じです。',
  '`class="geolonia"` を付けたまま呼んでも、地図が2つになることはありません。',
  '地図を描くライブラリでも、アカウントを操作するツールでもありません。',
];

test('検出すべき言い回しを検出する', async () => {
  for (const { id, text } of violations) {
    const ids = await lint(text);
    assert.ok(ids.includes(id), `"${text}" で ${id} が検出されませんでした（検出: ${ids.join(', ') || 'なし'}）`);
  }
});

test('正しい書き方を誤検出しない', async () => {
  for (const text of allowed) {
    const ids = await lint(text);
    assert.deepEqual(ids, [], `"${text}" が ${ids.join(', ')} として誤検出されました`);
  }
});

test('すべてのパターンにテストケースがある', () => {
  const covered = new Set(violations.map((v) => v.id));
  const missing = patterns.map((p) => p.id).filter((id) => !covered.has(id));
  assert.deepEqual(missing, [], `テストケースの無いパターン: ${missing.join(', ')}`);
});
