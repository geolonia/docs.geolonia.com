/**
 * 検索ダイアログのショートカット（⌘K / Ctrl+K）を譲るべき要素の判定の検査。
 *
 * 文字を入力している最中のショートカットは、その入力欄の操作として扱う。
 * 検索欄で検索語を打っている最中に押してダイアログが閉じる、を防ぐ。
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import isEditableTarget from '../src/lib/editable-target.mjs';

const el = (tagName, props = {}) => ({ tagName, isContentEditable: false, ...props });

test('文字を入力する input は編集中とみなす', () => {
  assert.equal(isEditableTarget(el('INPUT', { type: 'text' })), true);
  assert.equal(isEditableTarget(el('INPUT', { type: 'search' })), true);
  assert.equal(isEditableTarget(el('INPUT', { type: 'email' })), true);
  // type 属性の無い input は text として振る舞う。
  assert.equal(isEditableTarget(el('INPUT', { type: '' })), true);
});

test('textarea と contenteditable は編集中とみなす', () => {
  assert.equal(isEditableTarget(el('TEXTAREA')), true);
  assert.equal(isEditableTarget(el('DIV', { isContentEditable: true })), true);
});

test('文字を入力しない input は編集中とみなさない', () => {
  for (const type of ['checkbox', 'radio', 'button', 'submit', 'reset', 'range', 'color', 'file']) {
    assert.equal(isEditableTarget(el('INPUT', { type })), false, type);
  }
});

test('ふつうの要素と、要素でない対象は編集中とみなさない', () => {
  assert.equal(isEditableTarget(el('BODY')), false);
  assert.equal(isEditableTarget(el('BUTTON')), false);
  assert.equal(isEditableTarget(null), false);
  assert.equal(isEditableTarget({}), false);
});
