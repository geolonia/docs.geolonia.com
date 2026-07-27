/**
 * <LiveCode> の描画側で使う道具。
 *
 * MDX の子として置いたフェンスは、Shiki でハイライト済みの HTML としてスロットに届く。
 * その HTML は
 *   - 表示           … そのまま出せば通常のフェンスと同一の見た目
 *   - 実行するソース … タグを剥がして実体参照を戻せば元の文字列に復元できる
 * の2役を兼ねる。復元した文字列のハッシュが、ビルド前にドキュメントを走査した
 * integrations/livecode.mjs 側の ID と一致するので、生成済みのデモページに結び付く。
 */

/** Shiki 出力から言語名（```html の html）を取り出す。 */
export function shikiLang(html: string): string {
  return /data-language="([^"]*)"/.exec(html)?.[1] ?? 'plaintext';
}

const ENTITIES: Record<string, string> = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&#x27;': "'",
  '&#x2F;': '/',
  '&nbsp;': ' ',
};

function decodeEntities(s: string): string {
  return s
    .replace(/&(?:lt|gt|quot|#39|#x27|#x2F|nbsp);/g, (m) => ENTITIES[m])
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&amp;/g, '&'); // & は最後（二重復元を防ぐ）
}

/**
 * スロットに含まれるコードブロックの数。
 * 復元も走査も「最初の1つ」しか見ないので、2つ以上あると
 * 表示されているのに実行されないコードが生まれる。呼び出し側で弾く。
 */
export function countCodeBlocks(html: string): number {
  return (html.match(/<pre\b[^>]*class="[^"]*astro-code/g) ?? []).length;
}

/** Shiki 出力から元のソース文字列を復元する。 */
export function shikiHtmlToSource(html: string): string {
  const inner = html
    .replace(/^[\s\S]*?<code[^>]*>/, '')
    .replace(/<\/code>[\s\S]*$/, '');
  return decodeEntities(inner.replace(/<[^>]+>/g, ''));
}

/** integrations/livecode.mjs の normalizeCode と同じ規則。 */
export function normalizeCode(code: string): string {
  return code.replace(/\r\n/g, '\n').trim();
}

/** html はそのまま埋め込み、それ以外はモジュールとしてバンドルして実行する。 */
export function isModuleLang(lang: string): boolean {
  return lang !== 'html';
}
export function isReactLang(lang: string): boolean {
  return lang === 'jsx' || lang === 'tsx';
}

/** 完全な HTML ドキュメント（<!doctype> や <html> から始まる）かどうか。 */
export function isFullDocument(raw: string): boolean {
  return /^\s*<(?:!doctype\s+html|html[\s>])/i.test(raw);
}

/**
 * 断片の HTML をページとして成立させる。ここで足すのは土台だけ。
 * 地図の高さなど書けるものは書き手のコード側に書かせる
 * （表示されているコードが効いている状態を保つ）。
 */
export function wrapAsDocument(fragment: string): string {
  return `<!doctype html>
<html lang="ja">
<head><meta charset="utf-8"><style>html,body{margin:0;height:100%}</style></head>
<body>
${fragment}
</body>
</html>`;
}
