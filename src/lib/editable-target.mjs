// キーボードショートカットを譲るべき要素か（文字を入力している最中か）。
//
// tracking-path.mjs と同じ理由で .mjs にしてある。ブラウザに配るスクリプトから
// 読み、tests/ の node:test からも直接読んで検証する。

// 文字を入力しない input。これらにフォーカスがあってもショートカットは効かせる。
const NON_TEXT_INPUT_TYPES = new Set([
  'button',
  'checkbox',
  'color',
  'file',
  'hidden',
  'image',
  'radio',
  'range',
  'reset',
  'submit',
]);

/**
 * @param {EventTarget | null} target `KeyboardEvent.target`
 * @returns {boolean} 入力欄、textarea、contenteditable なら true
 */
const isEditableTarget = (target) => {
  if (!target || typeof target.tagName !== 'string') return false;
  if (target.isContentEditable) return true;
  if (target.tagName === 'TEXTAREA') return true;
  if (target.tagName === 'INPUT') return !NON_TEXT_INPUT_TYPES.has(String(target.type).toLowerCase());
  return false;
};

export default isEditableTarget;
