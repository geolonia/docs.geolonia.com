/**
 * LiveCode の走査側（integrations/livecode.mjs）と描画側（src/lib/livecode.ts）が
 * 共有する規則。
 *
 * この仕組みは「同じ文字列から同じ ID を得る」ことだけで成り立っている。
 * 正規化やハッシュの取り方が両側でずれると、全ページのデモが一斉に外れる。
 * だからここに1つだけ置き、両側が import する（同じ実装を2箇所に書かない）。
 *
 * 走査も描画もビルド時に Node で動くので、node: の組み込みを使ってよい。
 */
import { createHash } from 'node:crypto';

/** 表示と実行で同じ文字列になるよう正規化する。 */
export function normalizeCode(code) {
  return code.replace(/\r\n/g, '\n').trim();
}

/**
 * スニペットの ID。言語も混ぜる。
 * 同じ本文を js と ts で書いたときに衝突させないため。
 */
export function snippetId(lang, code) {
  return createHash('sha256')
    .update(`${lang}\n${normalizeCode(code)}`)
    .digest('hex')
    .slice(0, 12);
}

/**
 * モジュールとしてバンドルして実行する言語。
 * 「html 以外すべて」にすると bash や json のフェンスまで JS として
 * パースしようとして、書き手に理由の分からないビルドエラーが出る。
 * 実行できるものだけを明示的に並べる。
 */
export const MODULE_LANGS = ['js', 'mjs', 'jsx', 'ts', 'tsx'];

export function isModuleLang(lang) {
  return MODULE_LANGS.includes(lang);
}

export function isReactLang(lang) {
  return lang === 'jsx' || lang === 'tsx';
}

/** デモとして動かせる言語か。html はそのまま埋め込む。 */
export function isRunnableLang(lang) {
  return lang === 'html' || isModuleLang(lang);
}

/** 動かせる言語の一覧（エラーメッセージ用）。 */
export const RUNNABLE_LANGS = ['html', ...MODULE_LANGS];
