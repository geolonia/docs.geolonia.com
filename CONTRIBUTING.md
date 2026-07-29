# ドキュメントの書き方

docs.geolonia.com（リニューアル版）にページを足したり直したりするための手引きです。
仕組みを知らないと踏み抜くところがいくつかあるので、書き始める前に一度目を通してください。

## 目次

- [はじめに](#はじめに)
- [セットアップとコマンド](#セットアップとコマンド)
- [ブランチ運用](#ブランチ運用)
- [どこに何を書くか（Diátaxis）](#どこに何を書くかdiátaxis)
- [ページの作り方](#ページの作り方)
- [動くコードを載せる：LiveCode](#動くコードを載せるlivecode)
- [3つのライブラリを並べる：Lens](#3つのライブラリを並べるlens)
- [その他の部品](#その他の部品)
- [スタイル](#スタイル)
- [デプロイと配信ヘッダ](#デプロイと配信ヘッダ)
- [触ってはいけないもの](#触ってはいけないもの)
- [API キーの扱い](#api-キーの扱い)
- [文章の書き方](#文章の書き方)

## はじめに

このサイトは Astro で作った静的サイトです。中身は Markdown で書き、動く地図やタブなど
コンポーネントが必要になったときだけ MDX に切り替えます。

大事な考え方がひとつあります。**ドキュメントに載っているコードは、実際に動いているコードと
同じものにする**、というルールです。手で書き写したコードは必ずいつかズレるので、
このリポジトリでは「載せるコード」と「動かすコード」を同じ1つの文字列から作る仕組みに
してあります（後述の [LiveCode](#動くコードを載せるlivecode)）。

## セットアップとコマンド

Node.js は **22.12.0 以上**が必要です。

```bash
npm install
npm run dev       # 開発サーバー http://localhost:4321
npm run build     # ./dist/ に静的サイトを書き出す
npm run preview   # ビルド結果をローカルで確認する
npm run cf:dev    # dist/ を wrangler で動かす（Cloudflare Workers の再現）
npm run deploy    # ビルドして Cloudflare Workers にデプロイ
```

テストはありません。**壊れていないことの確認は `npm run build` が通ることで代用**します。
後述のとおり、載せたコードが壊れているとビルドが落ちるようになっています。

地図が実際に描画されるかは、ビルドだけでは分かりません。地図を含むページを足したときは
`npm run preview` でブラウザまで確認してください。

## ブランチ運用

**リニューアル中は `main` に PR を出さないでください。** 実質的な main は
`main-renewal-2026` です。

```bash
git switch main-renewal-2026
git pull
git switch -c renewal/なにをするか
# 作業して commit
git push -u origin renewal/なにをするか
```

PR の宛先も `main-renewal-2026` にします。

## どこに何を書くか（Diátaxis）

`src/pages/` の下は Diátaxis という枠組みで4つに分かれています。ファイル名がそのまま
URL になります（`src/pages/howto/clustering.mdx` → `/howto/clustering/`）。

| ディレクトリ | 役割 | 読者の状態 | 書くもの |
|---|---|---|---|
| `tutorials/` | 学ぶ | まだ何も分からない | 手を動かせば必ず動く一本道。段0から順に積む |
| `howto/` | 解決する | 目的がはっきりしている | 「〜するには」のレシピ。最短で答えに着く |
| `reference/` | 引く | 仕様を確認したい | 属性・API の正確な一覧。**自動生成**（後述） |
| `explanation/` | 理解する | 背景を知りたい | 概念・なぜそうなっているか・使い分け |

迷ったら「読者は何をしている最中か」で決めてください。手を動かしている最中なら
チュートリアルかハウツー、椅子に座って考えているならリファレンスか解説です。

**混ぜないこと。** チュートリアルに仕様の全列挙を書くと初学者が迷子になりますし、
ハウツーに背景の解説を挟むと目的に着くのが遅くなります。書きたくなったら、
その象限のページを別に立ててリンクします。

このほかに次のものがあります。

- `src/pages/index.mdx` … トップページ
- `src/pages/demos/inline/[id].astro` … LiveCode が使うデモページの生成元。**手で触りません**

## ページの作り方

拡張子は原則 `.md` です。コンポーネント（動くコード・タブ・Callout など）を使いたく
なったときだけ `.mdx` にします。

すべてのページは frontmatter でレイアウトを指定します。

```markdown
---
layout: ../../layouts/DocLayout.astro
title: クリックでポップアップを出すには
page: howto
kicker: ハウツー ／ レシピ
badge: howto
---
```

| キー | 必須 | 意味 |
|---|---|---|
| `layout` | ○ | `DocLayout.astro` への相対パス。階層に応じて `../` の数が変わります |
| `title` | ○ | H1 になり、ブラウザのタブにも出ます |
| `page` | | ヘッダーナビのどれを光らせるか。`home` `tutorial` `howto` `reference` `explanation` |
| `kicker` | | H1 の上に出る小さな見出し |
| `badge` | | H1 の頭に付く象限バッジ。`tutorial` `howto` `reference` `explanation` |
| `embed` | | `true` にすると Geolonia embed の CDN スクリプトを読み込みます |

`embed: true` は、そのページで `<GeoloniaMap />` を使うときだけ付けます。CDN スクリプトは
ページ全体を走査して `.geolonia` を地図に変える副作用があるので、必要なページだけに
限定しています。**LiveCode のデモは iframe の中で動くので、`embed: true` は要りません。**

MDX でコンポーネントを使うときは、frontmatter の直後に import を書きます。

```mdx
import Callout from '../../components/Callout.astro'
import LiveCode from '../../components/LiveCode.astro'
```

## 動くコードを載せる：LiveCode

**このリポジトリでいちばん独特な部分です。**

`<LiveCode>` の中にコードブロックを書くと、そのコードが「ページに表示されるコード」と
「その下で実際に動くデモ」の両方になります。

````mdx
<LiveCode title="embed で地図を出す" height={400}>

```html
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8">
    <style>
      .geolonia { width: 100%; height: 400px; }
    </style>
  </head>
  <body>
    <div class="geolonia" data-lat="35.681236" data-lng="139.767125" data-zoom="14"></div>
    <script src="https://cdn.geolonia.com/embed/v5/embed?geolonia-api-key=YOUR-API-KEY"></script>
  </body>
</html>
```

</LiveCode>
````

デモ用に別のファイルを用意する必要はありません。**書いたコードがそのまま動きます。**

### 書くときの決まり

- **コードブロックはちょうど1つ**にしてください。0個でも2個でもビルドが落ちます。
  複数見せたいときは `<LiveCode>` を分けるか、動かさないほうを素のコードブロックで書きます。
- コードブロックには**言語名を必ず付けます**。実行方式が言語で決まります。
- 動かせない言語（`bash` など）を入れるときは `demo={false}` を付けてください。
  付けないとビルドが落ちます（後述）。

フェンスの書き方そのものは Markdown の作法に任せてあるので、次はどれも通ります。

- バッククォート3つでも、チルダ3つ（`~~~js`）でも構いません
- `` ```js title="main.js" `` のように後ろに情報を付けても構いません
- 手順リストの項目の中にインデントして置いても構いません

`<LiveCode>` とコードブロックの間の空行も、あってもなくても動きます。既存のページは
読みやすさのために空けているので、それに合わせてください。

なお、**使い方の説明としてコードブロックの中に `<LiveCode>` を書いても大丈夫**です。
コードブロックの中身は実行対象として拾われないので、動かすつもりのない例からデモページが
生えることはありません（このページの上にある例のような書き方です）。

### 言語ごとの動き

| 言語 | 実行のされ方 | 書き手が用意するもの |
|---|---|---|
| `html` | そのままページとして出力されます。`<!doctype html>` から始まる完全な HTML なら、丸ごとその HTML がページになります | 高さなどの CSS も自分で書いてください |
| `js` `mjs` `ts` | モジュールとして読み込まれます。描画先の `<div id="map">` は用意済みです | `document.getElementById("map")` に描画するコード |
| `jsx` `tsx` | 同上。描画先は `<div id="root">` です | `createRoot(...).render(...)` まで含めた全体 |
| それ以外 | 動かせません。`demo={false}` を付けるか、素のコードブロックで書いてください | — |

`js` 系は**実際にビルドされます**。つまり構文を間違えたり、存在しないパッケージを
import したりすると、その場でビルドが落ちます。読者に壊れたコードを見せずに済む、
というのがこの仕組みの主目的です。

`html` はビルド対象にならないので、構文の誤りは検出されません。プレビューで目視してください。

### 「動く1本」の型

`<LiveCode>` に入れるコードは、**それ単体で完結している**必要があります。ライブラリごとに、
最低限これだけは要る、という形が決まっています。断片をそのまま入れても地図は出ません。

embed（`html`）— 高さの CSS と CDN スクリプトまで含めます。

````mdx
```html
<style>
  .geolonia { width: 100%; height: 100vh; }
</style>

<div class="geolonia" data-lat="35.68" data-lng="139.75" data-zoom="11"></div>

<script src="https://cdn.geolonia.com/embed/v5/embed?geolonia-api-key=YOUR-API-KEY"></script>
```
````

maps-suite（`js`）— CSS を2つ import して、`#map` に描きます。

````mdx
```js
import "maplibre-gl/dist/maplibre-gl.css";
import "@geolonia/maps-core/css";
import { geolonia } from "@geolonia/maps-suite";

const map = new geolonia.maps.Map(document.getElementById("map"), {
  apiKey: "YOUR-API-KEY",
});
```
````

maps-react（`jsx`）— 同じ CSS に加えて、`createRoot(...).render(...)` まで書きます。

````mdx
```jsx
import "maplibre-gl/dist/maplibre-gl.css";
import "@geolonia/maps-core/css";
import { createRoot } from "react-dom/client";
import { Map } from "@geolonia/maps-react";

createRoot(document.getElementById("root")).render(
  <Map apiKey="YOUR-API-KEY" containerStyle={{ width: "100%", height: "100vh" }} />,
);
```
````

デモ枠は既定 360px なので、`100vh` を指定すると枠にちょうど収まります。地図の上に
ボタンなどを置くときは、外側を `display: flex; flex-direction: column; height: 100vh`
にして地図側を `flex: 1` にすると、枠からはみ出しません。

### 断片は素のコードブロックで

チュートリアルのように段階を追って足していくページでは、途中のコードは前の段の続きです。
そういう**断片は `<LiveCode>` にせず素のコードブロックで書き**、そのページの最終形だけを
`<LiveCode>` にします。1ページに動く1本があれば、そのページの成果物は検証されています。

逆に、**完全なプログラムに見えて動かないコード**は載せないでください。読者はそれを
コピーします。動かないものを見せる必要があるとき（`YOUR-REAL-API-KEY` に差し替える例など）は、
動かない理由を本文に必ず書いてください。

### ビルドが落ちるとき

いずれもメッセージに原因と次の一手が書いてあります。

| メッセージ | 原因 |
|---|---|
| `コードブロックはちょうど1つにしてください（見つかった数: N）` | `<LiveCode>` の中が0個か2個以上 |
| `bash は動かせません（動かせるのは …）` | 実行できない言語。`demo={false}` を付ける |
| `demo は真偽値で書いてください` | `demo="false"` と書いている。正しくは `demo={false}` |
| `このコードに対応するデモページが生成されていません` | LiveCode 側の不具合の可能性が高いので、メッセージのコードを添えて報告してください |

### CSS の扱い

「コードに書けるものは、コードに書かせる」方針です。`html` のスニペットは地図の高さを
自分の `<style>` で指定してください。そうすることで、**表示されている CSS が実際に
効いている CSS** になります。

`js` / `jsx` はスタイルを持てないので、描画先（`#map` / `#root`）の大きさだけは
`src/styles/demo.css` が与えています。

### オプション

| プロパティ | 意味 |
|---|---|
| `title` | iframe のタイトル（読み上げ用）。付けてください |
| `height` | デモ枠の高さ(px)。既定は 360。コード側で高さを宣言しているならそれに合わせます |
| `demo={false}` | デモを出さず、コード表示だけにします。単体では動かない断片や、`bash` など動かせない言語に使います |

`demo={false}` は**波かっこで書いてください**。`demo="false"` は JSX では文字列なので
真として扱われ、意図と逆になります（ビルドが落ちるので気づけます）。

### 仕組み（知らなくても書けますが、落ちたとき用に）

ビルドの前に `integrations/livecode.mjs` が `src/pages/**/*.mdx` を **MDX パーサで読み**、
`<LiveCode>` の中のコードブロックを集めます。言語と本文から SHA-256 のハッシュを計算し、
それを ID にして `/demos/inline/<ID>/` というページを ID の数だけ生成します。

ページを描画するときは `LiveCode` コンポーネントが、表示用に渡されたコードから同じ
ハッシュを計算して、そのデモページを iframe で読み込みます。走査するときも描画するときも
同じ文字列を見ているので、ID は必ず一致します。ズレたときはビルドが落ちます。

正規表現ではなく本物の MDX パーサを使っているのがポイントです。フェンスの記法、
リストの中でのインデント、JSX 属性の解釈をパーサに任せているので、
「Markdown としては正しいのに LiveCode だけ落ちる」という状態が起きません。
ハッシュの計算規則は `integrations/livecode-shared.mjs` に1つだけ置き、
走査側と描画側の両方が読んでいます（ここがずれると全ページのデモが一斉に外れます）。

**`.md` は対象外です。** JSX を解釈しないので、`.md` に `<LiveCode>` と書いても
コンポーネントとしては動きません。動くコードを載せたいページは `.mdx` にしてください。

デモが iframe になっているのは、3つのライブラリ（embed の CDN、maps-suite、maps-react）を
同じページで同時に動かすと初期化がぶつかるからです。iframe で分ければ互いに影響しません。
読み込みはスクロールして見えたときに始まるので、ページを開いた瞬間に全部の地図が
動き出すことはありません。

## 3つのライブラリを並べる：Lens

Geolonia Maps には embed / maps-suite / maps-react の3つの入り口があります。同じことを
3通りで見せたいときは `<Lens>` で包みます。

```mdx
import Lens from '../../components/Lens.astro'
import LiveCode from '../../components/LiveCode.astro'

<Lens name="embed">
HTML の属性だけで書けます。

<LiveCode title="embed">
…
</LiveCode>
</Lens>

<Lens name="suite">
…
</Lens>

<Lens name="react">
…
</Lens>
```

`name` に使えるのは `embed` `suite` `react` です。

**連続して並べた `<Lens>` が自動的にひとつのタブ群になります。** タブの見出しは
ページを開いたときに JavaScript が作るので、自分で書く必要はありません。間に段落などを
挟むと別のタブ群として扱われるので、3つは続けて並べてください。

`<Lens>` がひとつだけのときはタブが付かず、そのまま表示されます。1通りしか書けない
ときは `<Lens>` で包まず、素直に本文として書いてしまって構いません。

選んだレンズは `localStorage` に保存され、**サイト全体で同期します**。embed を選んだ読者は
他のページに移動しても embed のままです。ページ内に複数のタブ群があるときも連動します。

その群に存在しないレンズが選ばれている場合は、先頭のものが表示されます（保存された
選択は変わりません）。たとえば embed の例しかないページを react の読者が開いても、
何も表示されない事故は起きません。

## その他の部品

### Callout

補足や注意を目立たせます。

```mdx
<Callout kind="warning" title="うまく出ないとき">
`.geolonia` の高さが 0 になっていないか確認してください。
</Callout>
```

`kind` は `info` `success` `warning` `danger`。省略すると色の付かない枠になります。
`title` も省略できます。

### GeoloniaMap

コードを見せる必要がなく、**地図だけ**を置きたいときに使います。使うページの frontmatter に
`embed: true` が必要です。

```mdx
<GeoloniaMap lat={35.68} lng={139.75} zoom={11} marker="off"
             geojson="/data/sample-spots.geojson" cluster="on"
             tall={true} caption="東京の5スポット" />
```

| プロパティ | 既定 | 意味 |
|---|---|---|
| `lat` / `lng` | 東京駅 | 中心の緯度・経度 |
| `zoom` | `14` | 拡大率 |
| `marker` | `'on'` | 中心のマーカー |
| `geojson` | | 重ねる GeoJSON の URL |
| `cluster` | | 点をクラスタリングするか（`'on'` / `'off'`） |
| `pitch` / `bearing` | | 傾き・方角 |
| `threeD` | | 3D 表示（`data-3d` になります） |
| `tall` | `false` | `true` で高さ 460px（既定は 360px） |
| `caption` | | 地図の下に出す説明 |

座標は緯度・経度を別々のプロパティで渡します。生の embed 属性や MapLibre を直接
扱うときは **`[経度, 緯度]` の順**なので注意してください。

### Tag / QuadBadge

`<Tag k="embed" />` でライブラリ名のバッジ、`<QuadBadge kind="howto">ハウツー</QuadBadge>` で
象限バッジが出ます。

### QuadGrid

トップページの「4つの入口」カードです。中身は固定なので、増やすときは
`src/components/QuadGrid.astro` を直接編集します。

## スタイル

CSS は `src/styles/` にまとまっていて、`BaseLayout` がこの順で読み込みます。

| ファイル | 役割 |
|---|---|
| `ds-tokens.css` | Geolonia デザインシステム本体。**編集しないでください**（外部から持ち込んだもの） |
| `tokens.css` | このサイト用の別名。DS のトークンに `--brand` などの名前を付け直しています |
| `base.css` | 素の HTML 要素（見出し・段落・表・コードブロック）の見た目 |
| `layout.css` | ヘッダー・フッター・本文幅などページの骨格 |
| `components.css` | 部品の見た目（Callout・バッジ・地図枠・LiveCode など） |
| `demo.css` | iframe の中のデモページ専用。`DemoLayout` だけが読み込みます |

**`.astro` ファイルの中に `<style>` を書かないでください。** 新しいコンポーネントを
作るときも、CSS は上のいずれか（部品なら `components.css`）に足します。見た目の調整を
する人が CSS だけを見れば済むようにするためです。

色や余白は、できるだけデザインシステムの CSS 変数を使ってください。

## デプロイと配信ヘッダ

配信ヘッダは `public/_headers` にあります（`dist/` にそのままコピーされ、Cloudflare
Workers が設定として読みます）。

ここにひとつ、**踏み抜きやすい制約**があります。

LiveCode の動くデモは、ページが同じオリジンの `/demos/inline/<ID>/` を iframe で
読み込む作りです。そのため **`X-Frame-Options: DENY` は使えません**。`DENY` は
同一オリジンの iframe も止めるので、サイト中の地図が一斉に表示されなくなります。
しかも LiveCode 由来のエラーはコンソールに出ないため、原因にたどり着きにくいです。

いまは `Content-Security-Policy: frame-ancestors 'self'` にしてあります。自オリジン
からの iframe は通し、第三者による埋め込みは塞ぐ設定です。旧サイト（Netlify）は
`DENY` だったので、**移行のときにそのまま持ち込まないでください**。

## 触ってはいけないもの

- **`src/styles/ds-tokens.css`** … デザインシステムをそのまま持ち込んだファイルです。
  調整したいときは `tokens.css` 側で上書きします。
- **`src/pages/reference/embed/`, `suite/`, `core/`** … `@geolonia/embed`、
  `@geolonia/maps-suite`、`@geolonia/maps-core` の型定義から TypeDoc で生成した
  Markdown です。手で直しても次の生成で消えます。内容を直したいときは、
  各パッケージ側の JSDoc を直してください。`reference/index.md` は手書きなので編集できます。
- **`src/pages/demos/inline/[id].astro`** … LiveCode のデモページを生成する仕掛けです。

## API キーの扱い

サンプルコードのキーは `YOUR-API-KEY` で統一してください。これは Geolonia が用意した
デモキーで、キーを発行しなくても地図が出ます。

**動く環境は決まっています。** `localhost` のほか、GitHub Pages、CodePen、CodeSandbox、
Netlify、Vercel、Cloudflare Pages / Workers などです。

ここで大事なのは、**この一覧を記憶や推測で書かない**ことです。許可されているドメインの
正しい一覧は [`geolonia/free-referers` の `referers.json`](https://github.com/geolonia/free-referers/blob/master/referers.json)
にあります。ドキュメントに書くときは必ずこのファイルを見てください。
過去に「`localhost` と `*.github.io` でしか動かない」と書いてしまい、実際にはもっと広く
動くのに読者に諦めさせていた、という失敗があります。

読者向けの説明ページは [`/explanation/free-referers/`](src/pages/explanation/free-referers.mdx)
にあるので、各ページからはそこへリンクしてください。

## 文章の書き方

- 日本語で書きます。読者に対しては「ですます」。
- 事実は必ず確かめてから書いてください。**動作や既定値を推測で書かないこと。** 迷ったら
  実際に動かすか、ライブラリのソースを読んでください。旧ドキュメントは内容が古くなって
  いることがあるので、根拠にはしません。
- 強調は `**〜**`。日本語で全角の記号に隣接しても効くように remark プラグインを
  入れてあるので、`（例）**強調**` のような書き方でも問題ありません。
- `.md` の中の `<!-- コメント -->` はビルド時に取り除かれるので、書きかけのメモを
  残しておけます（`.mdx` では `{/* コメント */}`）。
- 画面上の位置で案内しないでください（「右上のタブ」など）。レンズタブは記事の中に
  出るようになったので、「上のタブで切り替えられます」のように書きます。
