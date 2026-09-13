/**
 * docs.geolonia.com 向けの文体チェックルール。
 *
 * 公開ドキュメントとして不適切な言い回しを検出する。対象は次の4種類。
 *
 *   1. 独自の比喩（「レンズ」「段0」「入口」など）
 *   2. 話し言葉・感情的な惹句（「とりあえず」「〜ましょう」「！」など）
 *   3. 講義調のまとめ（「〜できるようになりました」）
 *   4. 対話的な主語とメタ発言（「あなた」「このセクションでは」）
 *
 * 検査するのは本文のテキストだけで、コードブロックとインラインコードは
 * textlint の AST 上で別ノードになるため対象外になる。
 */

/**
 * @typedef {object} Pattern
 * @property {string} id 識別子。テストとエラーメッセージの対応付けに使う。
 * @property {RegExp} re 検出する正規表現。g フラグを必ず付ける。
 * @property {string} message 検出時に出す指示。何に直すかまで書く。
 */

/** @type {Pattern[]} */
export const patterns = [
  // --- 1. 独自の比喩 ---
  {
    id: 'lens',
    re: /レンズ/g,
    message: '「レンズ」は比喩です。「実装方式」「実装の切り替え」など技術的な語に置き換えてください。',
  },
  {
    id: 'step-dan',
    re: /(段[0-9０-９]|[0-9０-９]段|(?:こ|そ|あ)の段(?![階落])|各段(?![階落])|(?:前|次|最初|最後)の段(?![階落]))/g,
    message: 'チュートリアルの進行は「段」ではなく「Step 0」「Step 1」の形式で書いてください。',
  },
  {
    id: 'entrance',
    re: /入口|入り口/g,
    message: '「入口」は情緒的な比喩です。「はじめに」「概要」「エントリーポイント」など内容に合う語に置き換えてください。',
  },
  {
    id: 'ladder',
    re: /梯子|はしごを(?:登|のぼ)/g,
    message: '「梯子」は比喩です。学習の順序はそのまま「Step 0 から順に進みます」と書いてください。',
  },
  {
    id: 'horizontal-bar',
    re: /─/g,
    message: '横棒（─）は日本語の文章では使いません。句読点・括弧・かぎ括弧、または文の言い換えで代替してください。',
  },

  // --- 2. 話し言葉・感情的な惹句 ---
  {
    id: 'exclamation',
    re: /！/g,
    message: '感嘆符（！）は使いません。断定の文に書き換えてください。',
  },
  {
    id: 'toriaezu',
    re: /とりあえず/g,
    message: '「とりあえず」は話し言葉です。適用場面を具体的に書いてください。',
  },
  {
    id: 'volitional',
    re: /ましょう/g,
    message: '勧誘形（〜ましょう）は使いません。「〜します」「〜してください」に書き換えてください。',
  },
  {
    id: 'desune',
    re: /ですね|でしょうね/g,
    message: '同意を求める語尾（〜ですね）は使いません。事実を述べる文にしてください。',
  },
  {
    id: 'reassurance',
    re: /大丈夫|心配(?:あり|は)ません|安心して/g,
    message: '読者をなだめる表現は使いません。何が起きるか、どう対処するかだけを書いてください。',
  },
  {
    id: 'greeting',
    re: /ようこそ|おめでとう/g,
    message: '挨拶や祝辞は技術文書に書きません。本題から始めてください。',
  },
  {
    id: 'demo-conjunction',
    re: /でも[、,]/g,
    message: '逆接の「でも、」は話し言葉です。「ただし」「しかし」に置き換えてください。',
  },
  {
    id: 'try-it',
    re: /てみてください|してみると|やってみ/g,
    message: '「〜してみてください」は冗長です。「〜してください」と書いてください。',
  },

  // --- 3. 講義調のまとめ ---
  {
    id: 'became-able',
    re: /(?:よう|こと)になりました|できるようになり/g,
    message: '「〜できるようになりました」は講義調です。「以上で〜は完了です」のように完了と次の手順で書いてください。',
  },
  {
    id: 'we-did-it',
    re: /できました[。、]/g,
    message: '達成を語る文は使いません。「以上で〜は完了です」のように完了を述べてください。',
  },

  // --- 4. 対話的な主語とメタ発言 ---
  {
    id: 'second-person',
    re: /あなた|私たち|我々/g,
    message: '対話的な主語は使いません。機能や仕様を主語にした文にしてください。',
  },
  {
    id: 'meta-statement',
    re: /(?:こ|そ)の(?:セクション|章|記事|ページ)では[、]?(?:.{0,12}?)(?:解説|説明)します/g,
    message: '「このセクションでは〜を解説します」という前置きは省き、本題から始めてください。',
  },
];

/**
 * @param {import('@textlint/types').TextlintRuleContext} context
 */
export default function noAiTone(context) {
  const { Syntax, RuleError, report, getSource } = context;

  /** @param {import('@textlint/ast-node-types').TxtNode} node */
  const check = (node) => {
    const text = getSource(node);
    for (const pattern of patterns) {
      const re = new RegExp(pattern.re.source, pattern.re.flags);
      let match;
      while ((match = re.exec(text)) !== null) {
        report(node, new RuleError(`[${pattern.id}] ${pattern.message}`, { index: match.index }));
        if (match[0].length === 0) re.lastIndex += 1;
      }
    }
  };

  return {
    [Syntax.Str]: check,
    [Syntax.Html]: check,
  };
}
