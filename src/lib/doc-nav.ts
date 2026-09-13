/**
 * チュートリアル / ハウツー / 解説の左サイドバー用のリンク一覧。
 *
 * リファレンス（src/lib/api-nav.ts）は TypeDoc の出すファイル名から機械的に木を
 * 組めるので手で維持する一覧を持たない。こちらは事情が違う。並び順と分類が
 * 意味を持つ（チュートリアルは Step 0 から Step 5、ハウツーは「レシピ」と「応用」）ため、
 * ファイル名の辞書順やディレクトリ構造からは導出できない。
 *
 * 索引ページの本文をパースする案もあったが、docs 側の機構をこれ以上増やさない
 * 判断で、ここに literal を置いて手で並べる形にした（#164）。
 *
 * ページを追加・リネームしたときは、このファイルとセクションの索引ページの
 * 両方を直す必要がある。CONTRIBUTING.md の「ページの作り方」にも書いてある。
 */

export type SectionKind = 'tutorial' | 'howto' | 'explanation';

export interface DocNavLink {
  label: string;
  href: string;
  current: boolean;
}

export interface DocNavGroup {
  label: string;
  /** 見出しを等幅で出すか。パッケージ名（embed など）のときだけ true。 */
  mono: boolean;
  links: DocNavLink[];
  /** 開いた状態で描画するか。 */
  open: boolean;
}

export interface DocNav {
  /** nav 要素の aria-label。 */
  label: string;
  /** グループを持つセクション（チュートリアル / ハウツー）。 */
  groups: DocNavGroup[];
  /** グループを持たないセクション（解説）。 */
  links: DocNavLink[];
}

/**
 * チュートリアルの Step。6つの title は embed / maps-react / maps-suite で
 * おおむね共通なので、共通の定義を1つ置き、内容が異なる Step だけを
 * ライブラリごとに上書きする。上書きの理由は TUTORIAL_STEP_OVERRIDES を参照。
 */
const TUTORIAL_STEPS: { slug: string; label: string }[] = [
  { slug: 'first-map', label: 'Step 0: 地図を表示する' },
  { slug: 'view', label: 'Step 1: 初期位置とズームの設定' },
  { slug: 'data', label: 'Step 2: マーカーとデータの追加' },
  { slug: 'style', label: 'Step 3: 地図スタイルの適用' },
  { slug: 'interaction', label: 'Step 4: イベント処理とポップアップ' },
  { slug: 'publish', label: 'Step 5: API キーの設定と本番公開' },
];

/**
 * ライブラリごとに扱う内容が異なる Step のラベル。
 *
 * - maps-react と maps-suite の Step 3 は、ベース地図の差し替えではなく
 *   データの属性に応じた色分けを扱う。
 * - maps-suite の Step 4 は、ポップアップではなく情報ウィンドウを扱う。
 * - maps-react と maps-suite の Step 5 は、npm のビルドを伴う。
 */
const TUTORIAL_STEP_OVERRIDES: Record<string, Record<string, string>> = {
  'maps-react': {
    style: 'Step 3: データに応じたスタイルの適用',
    publish: 'Step 5: ビルドと本番公開',
  },
  'maps-suite': {
    style: 'Step 3: データに応じたスタイルの適用',
    interaction: 'Step 4: イベント処理と情報ウィンドウ',
    publish: 'Step 5: ビルドと本番公開',
  },
};

/** チュートリアルのライブラリ。ディレクトリ名がそのまま表示名になる。 */
const TUTORIAL_LIBS = ['embed', 'maps-react', 'maps-suite'];

/** ハウツー。並びと分類は /howto/ の索引ページに合わせている。 */
const HOWTO_GROUPS: { label: string; slugs: [string, string][] }[] = [
  {
    label: 'レシピ',
    slugs: [
      ['multiple-markers', 'マーカーを複数置くには'],
      ['change-style', '地図の見た目（スタイル）を切り替えるには'],
      ['popup-on-click', 'クリックでポップアップを出すには'],
      ['geojson-data', '外部データ（GeoJSON）を地図に読み込むには'],
      ['current-location', '現在地を表示するには'],
      ['fit-bounds', '全地点が画面に収まるように表示するには'],
      ['map-controls', '地図のコントロールの表示を切り替えるには'],
      ['switch-language', '地図の表示言語を切り替えるには'],
      ['draggable-marker', 'ドラッグできるマーカーで座標を取得するには'],
    ],
  },
  {
    label: '応用（難しめ）',
    slugs: [
      ['maps-core-access', '地図インスタンス（maps-core）に直接アクセスし、MapLibre GL JS の機能を利用するには'],
      ['clustering', '大量の点をクラスタリングするには'],
      ['choropleth', '値に応じてエリアを色分けするには（コロプレス）'],
      ['heatmap', 'ヒートマップで密度を可視化するには'],
      ['3d', '建物や地形を3Dで表示するには'],
      ['custom-source', '独自のデータソース（ベクトルタイル等）を追加するには'],
      ['overlay-hazardmap', 'ハザードマップを地図に重ねるには'],
      ['address-search', '住所で検索してその場所の地図を表示するには'],
      ['globe', '地図を地球儀（グローブ）で表示するには'],
      ['web-component', 'HTML のタグだけで地図を置くには（maps-suite）'],
    ],
  },
  {
    label: 'CLI（コマンドライン）',
    slugs: [
      ['cli-map-keys', 'API キーを YAML でまとめて管理するには'],
    ],
  },
];

/** 解説。ページ数が少ないのでグループを作らずフラットに並べる。 */
const EXPLANATION_PAGES: [string, string][] = [
  ['map-style', '地図のスタイルとは'],
  ['styles', 'Geolonia Maps のスタイル一覧'],
  ['marker-symbol', 'marker-symbol で使えるアイコン'],
  ['free-referers', 'デモキーで無料で試せる環境'],
  ['cli', 'Geolonia CLI とは'],
  ['agent-skills', 'Geolonia Agent Skills とは'],
];

/** 末尾スラッシュを落として比較する。 */
function isCurrent(href: string, currentPath: string): boolean {
  return href.replace(/\/$/, '') === currentPath;
}

function link(href: string, label: string, currentPath: string): DocNavLink {
  return { label, href, current: isCurrent(href, currentPath) };
}

/**
 * セクションのリンク一覧を組み立て、現在地に印を付ける。
 *
 * @param section frontmatter の page（tutorial / howto / explanation）
 * @param currentPath 末尾スラッシュを除いた現在のパス
 */
export function buildDocNav(section: SectionKind, currentPath: string): DocNav {
  let label = '';
  let groups: DocNavGroup[] = [];
  let links: DocNavLink[] = [];

  if (section === 'tutorial') {
    label = 'チュートリアル';
    groups = TUTORIAL_LIBS.map((lib) => ({
      label: lib,
      mono: true,
      links: [
        link(`/tutorials/${lib}/`, '概要', currentPath),
        ...TUTORIAL_STEPS.map((s) =>
          link(`/tutorials/${lib}/${s.slug}/`, TUTORIAL_STEP_OVERRIDES[lib]?.[s.slug] ?? s.label, currentPath),
        ),
      ],
      open: false,
    }));
  } else if (section === 'howto') {
    label = 'ハウツー';
    groups = HOWTO_GROUPS.map((g) => ({
      label: g.label,
      mono: false,
      links: g.slugs.map(([slug, title]) => link(`/howto/${slug}/`, title, currentPath)),
      open: false,
    }));
  } else {
    label = '解説';
    links = EXPLANATION_PAGES.map(([slug, title]) => link(`/explanation/${slug}/`, title, currentPath));
  }

  // 現在地を含むグループだけを開く。セクションの索引ページのようにどのリンクも
  // 現在地でないときは、構成が見えるように全部開く（api-nav と同じ考え方）。
  const anyCurrent = groups.some((g) => g.links.some((l) => l.current));
  for (const g of groups) g.open = anyCurrent ? g.links.some((l) => l.current) : true;

  return { label, groups, links };
}
