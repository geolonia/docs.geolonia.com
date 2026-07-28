/**
 * API リファレンスの左サイドバー用のツリーを組み立てる。
 *
 * 元になるのは TypeDoc（typedoc-plugin-markdown の flattenOutputFiles）が出す
 * フラットなファイル名で、次の規則になっている。
 *
 *   [<名前空間>.<名前空間>.]<種別>.<名前>.md
 *
 *     geolonia.maps.Class.Map.md   → 名前空間 geolonia.maps / Class / Map
 *     Class.GeoloniaMap.md         → 名前空間なし / Class / GeoloniaMap
 *     geolonia.Namespace.maps.md   → 名前空間 geolonia / Namespace / maps
 *
 * ここから種別ごとにまとめる。手で維持する一覧を持たないので、TypeDoc の
 * 再生成でメンバーが増減しても勝手に追従する。
 */

/** 種別トークン。ファイル名のどこが種別かを判定するために使う。 */
const KINDS = ['Class', 'Interface', 'TypeAlias', 'Function', 'Variable', 'Namespace'] as const;
type Kind = (typeof KINDS)[number];

/** 表示順と見出し。TypeDoc の索引ページと同じ並びに合わせている。 */
const KIND_ORDER: { kind: Kind; label: string }[] = [
  { kind: 'Namespace', label: '名前空間' },
  { kind: 'Class', label: 'クラス' },
  { kind: 'Interface', label: 'インターフェース' },
  { kind: 'TypeAlias', label: '型エイリアス' },
  { kind: 'Function', label: '関数' },
  { kind: 'Variable', label: '変数' },
];

/**
 * パッケージの表示名と並び順。ここに無いディレクトリも
 * ディレクトリ名のまま末尾に出るので、追加を忘れても消えはしない。
 */
const PACKAGES: { dir: string; label: string }[] = [
  { dir: 'embed', label: '@geolonia/embed' },
  { dir: 'suite', label: '@geolonia/maps-suite' },
  { dir: 'core', label: '@geolonia/maps-core' },
];

/**
 * `src/pages/reference/<dir>/` の `<dir>` に対応するパッケージ名を返す。
 * 表に無いディレクトリはツリーと同じくディレクトリ名をそのまま使う。
 * meta description と OGP 画像の副題が同じ文言になるように、両者からこれを使う。
 */
export function packageLabel(dir: string): string {
  return PACKAGES.find((p) => p.dir === dir)?.label ?? dir;
}

export interface NavItem {
  name: string;
  href: string;
  current: boolean;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
  current: boolean;
}

export interface NavPackage {
  dir: string;
  label: string;
  index: NavItem | null;
  groups: NavGroup[];
  count: number;
  /** 現在地がこのパッケージの中にあるか。 */
  current: boolean;
  /** 開いた状態で描画するか。索引ページ（どれも現在地でない）では全部開く。 */
  expanded: boolean;
}

/** ファイル名（拡張子なし）を種別と名前に分解する。 */
export function parseEntryName(base: string): { kind: Kind; name: string } | null {
  const parts = base.split('.');
  // 後ろから探す。名前空間側に Class などと同じ語が来ても、種別は名前の直前にある。
  for (let i = parts.length - 2; i >= 0; i--) {
    if ((KINDS as readonly string[]).includes(parts[i])) {
      return { kind: parts[i] as Kind, name: parts.slice(i + 1).join('.') };
    }
  }
  return null;
}

/**
 * import.meta.glob の結果からツリーを作る。
 *
 * @param modules `../pages/reference/<pkg>/<file>.md` を eager で読んだもの
 * @param currentPath 末尾スラッシュを除いた現在のパス
 */
export function buildApiTree(
  modules: Record<string, unknown>,
  currentPath: string,
): NavPackage[] {
  const byDir = new Map<string, { index: NavItem | null; entries: Map<Kind, NavItem[]> }>();

  for (const filePath of Object.keys(modules)) {
    const m = /\/reference\/([^/]+)\/([^/]+)\.md$/.exec(filePath);
    if (!m) continue;
    const [, dir, base] = m;

    if (!byDir.has(dir)) byDir.set(dir, { index: null, entries: new Map() });
    const bucket = byDir.get(dir)!;

    if (base === 'index') {
      const href = `/reference/${dir}/`;
      bucket.index = { name: '概要', href, current: currentPath === `/reference/${dir}` };
      continue;
    }

    const parsed = parseEntryName(base);
    if (!parsed) continue;

    const href = `/reference/${dir}/${base}`;
    const item: NavItem = { name: parsed.name, href, current: currentPath === href };
    if (!bucket.entries.has(parsed.kind)) bucket.entries.set(parsed.kind, []);
    bucket.entries.get(parsed.kind)!.push(item);
  }

  // PACKAGES の順を先に、未知のディレクトリはその後ろに名前順で。
  const known = PACKAGES.filter((p) => byDir.has(p.dir));
  const unknown = [...byDir.keys()]
    .filter((d) => !PACKAGES.some((p) => p.dir === d))
    .sort()
    .map((dir) => ({ dir, label: dir }));

  const packages = [...known, ...unknown].map(({ dir, label }) => {
    const bucket = byDir.get(dir)!;

    const groups: NavGroup[] = KIND_ORDER.flatMap(({ kind, label: kindLabel }) => {
      const items = bucket.entries.get(kind);
      if (!items || items.length === 0) return [];
      items.sort((a, b) => a.name.localeCompare(b.name));
      return [{ label: kindLabel, items, current: items.some((i) => i.current) }];
    });

    const count =
      groups.reduce((n, g) => n + g.items.length, 0) + (bucket.index ? 1 : 0);

    return {
      dir,
      label,
      index: bucket.index,
      groups,
      count,
      current: groups.some((g) => g.current) || !!bucket.index?.current,
      expanded: false,
    };
  });

  // 索引ページ（/reference/）のようにどのページも現在地でないときは、
  // 3パッケージとも開いて構成が見える状態にする。種別グループは閉じたまま
  // なので、全メンバーが一度に出て縦に伸びきることはない。
  const anyCurrent = packages.some((p) => p.current);
  for (const p of packages) p.expanded = anyCurrent ? p.current : true;

  return packages;
}
