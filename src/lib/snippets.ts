/**
 * 動くデモの「唯一の正」を扱う。
 *
 * src/demos/<slug>/<lens>.<ext> に置いたファイルが実体で、
 *   - ドキュメントに表示するコード（このファイルの中身そのもの）
 *   - iframe で実行するデモ（同じファイルを動かす /demos/<slug>/<lens>/）
 * の両方をここから導出する。表示と実行が同一ファイルなので、原理的にズレない。
 *
 * 拡張子が実行方式を決める：
 *   .html      … そのまま HTML として差し込む（スクリプトタグ込みで自己完結）
 *   .js / .ts  … クライアントで import して実行するモジュール。#map に描画する
 *   .jsx/.tsx  … 同上。React として #root にマウントする
 *
 * 拡張子は「読者が実際に書くファイル」に合わせる。チュートリアルが `main.js` を
 * 書かせるなら .js にする（表示される言語ラベルもそれに従う）。
 */

// 表示用：全スニペットのソーステキスト（ビルド時に埋め込む）
const SOURCES = import.meta.glob('/src/demos/**/*.{html,js,jsx,ts,tsx}', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export type SnippetExt = 'html' | 'js' | 'jsx' | 'ts' | 'tsx';

export type Snippet = {
  /** 例: /src/demos/tutorials/embed/first-map/embed.html */
  path: string;
  slug: string;
  lens: string;
  ext: SnippetExt;
  /** Shiki に渡す言語名 */
  lang: string;
  /** ファイルの中身そのもの */
  raw: string;
};

const PATH_RE = /^\/src\/demos\/(.+)\/([^/]+)\.(html|js|jsx|ts|tsx)$/;

/** React としてマウントする（#root）か、素のモジュール（#map）か。 */
export function isReactSnippet(ext: SnippetExt): boolean {
  return ext === 'jsx' || ext === 'tsx';
}
export function isModuleSnippet(ext: SnippetExt): boolean {
  return ext !== 'html';
}

function parse(path: string): Snippet | null {
  const m = PATH_RE.exec(path);
  if (!m) return null;
  const [, slug, lens, ext] = m as unknown as [string, string, string, SnippetExt];
  return { path, slug, lens, ext, lang: ext, raw: SOURCES[path] };
}

/** 全スニペット。動的ルートの getStaticPaths はこれを使う。 */
export function listSnippets(): Snippet[] {
  return Object.keys(SOURCES)
    .map(parse)
    .filter((s): s is Snippet => s !== null)
    .sort((a, b) => a.path.localeCompare(b.path));
}

export function getSnippet(slug: string, lens: string): Snippet {
  const hit = listSnippets().find((s) => s.slug === slug && s.lens === lens);
  if (!hit) {
    // 存在しないスニペットを指したらビルドを落とす（黙って空にしない）。
    throw new Error(
      `スニペットが見つかりません: src/demos/${slug}/${lens}.{html,js,jsx,ts,tsx}\n` +
        `存在するもの: ${listSnippets().map((s) => `${s.slug}/${s.lens}`).join(', ')}`,
    );
  }
  return hit;
}

/** iframe が読み込むデモページの URL。 */
export function demoUrl(slug: string, lens: string): string {
  return `/demos/${slug}/${lens}/`;
}

/**
 * 完全な HTML ドキュメント（<!doctype> や <html> から始まる）かどうか。
 * 完全なドキュメントはハーネスで包まず、そのままページとして出す
 * ＝ ドキュメントに載っている HTML ファイルが、そのまま動いている状態になる。
 */
export function isFullDocument(raw: string): boolean {
  return /^\s*<(?:!doctype\s+html|html[\s>])/i.test(raw);
}

/**
 * リージョンマーカーの行かどうか。
 *   HTML  <!-- #region name -->  /  <!-- #endregion -->
 *   TS    // #region name        /  // #endregion
 * ファイル全体は動くまま、表示だけを一部に絞るために使う。
 */
const REGION_START = /(?:\/\/|<!--)\s*#region\s+(\S+)/;
const REGION_END = /(?:\/\/|<!--)\s*#endregion/;
const REGION_ANY = /(?:\/\/|<!--)\s*#(?:region|endregion)\b/;

/** 行頭の共通インデントを取り除く。 */
function dedent(lines: string[]): string[] {
  const indents = lines
    .filter((l) => l.trim() !== '')
    .map((l) => l.match(/^[ \t]*/)![0].length);
  const min = indents.length ? Math.min(...indents) : 0;
  return min ? lines.map((l) => l.slice(min)) : lines;
}

/**
 * 表示するコードを取り出す。
 * region 指定なし → マーカー行だけ除いた全文。
 * region 指定あり → その領域だけ（インデントを詰めて返す）。
 */
export function extractRegion(raw: string, region?: string): string {
  const lines = raw.replace(/\r\n/g, '\n').split('\n');

  if (!region) {
    return dedent(lines.filter((l) => !REGION_ANY.test(l)))
      .join('\n')
      .trim();
  }

  const out: string[] = [];
  let depth = 0;
  for (const line of lines) {
    const start = REGION_START.exec(line);
    if (start) {
      if (start[1] === region || depth > 0) depth++;
      continue;
    }
    if (REGION_END.test(line)) {
      if (depth > 0) depth--;
      continue;
    }
    if (depth > 0) out.push(line);
  }

  if (out.length === 0) {
    throw new Error(`リージョン "#region ${region}" が見つかりません`);
  }
  return dedent(out).join('\n').trim();
}

/** 表示用のコードと言語をまとめて返す。 */
export function getCode(slug: string, lens: string, region?: string) {
  const snippet = getSnippet(slug, lens);
  return { code: extractRegion(snippet.raw, region), lang: snippet.lang, snippet };
}
