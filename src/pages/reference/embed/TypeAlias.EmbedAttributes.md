---
layout: ../../../layouts/ApiLayout.astro
title: 'Type Alias: EmbedAttributes'
page: reference
---

[**@geolonia/embed**](/reference/embed/)

***

[@geolonia/embed](/reference/embed/) / EmbedAttributes

# Type Alias: EmbedAttributes

> **EmbedAttributes** = `object`

`.geolonia` の地図コンテナから読み取った `data-*` 属性を正規化した形。

各プロパティは kebab-case の `data-*` 属性に対応する（`markerColor` は
`data-marker-color`、`'3d'` は `data-3d`）。
`parseAtts` がコンテナの `dataset` を読み、以下に示す既定値を補う。
`data-*` で指定された値は文字列のまま保持され、未指定の数値フィールドには
数値の既定値が入る。on/off のフラグはリテラル文字列 `'on'` / `'off'` である。
この形はそのまま登録済みの [EmbedPlugin](/reference/embed/TypeAlias.EmbedPlugin) に渡されるため、後方互換のために
構造を安定させている。地図自体はこの値から `attsToOptions` を経て構築される。

## Indexable

> \[`otherKey`: `string`\]: `string` \| `number`

追加の `data-*` 属性はそのまま透過される（[EmbedPlugin](/reference/embed/TypeAlias.EmbedPlugin) が利用する
プラグイン固有の属性など）。

## Properties

### 3d

> **3d**: `string`

`data-3d`（`'on'` / `'off'`）：3D 建物を描画する。

#### Default Value

`''`（off として扱われる）

***

### apiUrl

> **apiUrl**: `string`

`data-api-url`：Geolonia API のエンドポイントのベース URL。

#### Default Value

`` `https://api.geolonia.com/${stage}` ``

***

### bearing

> **bearing**: `string` \| `number`

`data-bearing`：初期方位（回転）。単位は度。

#### Default Value

`0`

***

### cluster

> **cluster**: `string`

`data-cluster`（`'on'` / `'off'`）：GeoJSON のポイント地物をクラスタリングする。

#### Default Value

`'on'`

***

### clusterColor

> **clusterColor**: `string`

`data-cluster-color`：クラスタ化されたポイントマーカーの色。

#### Default Value

`'#ff0000'`

***

### customMarker

> **customMarker**: `string`

`data-custom-marker`：マーカーとして使う要素の CSS セレクタ。

#### Default Value

`''`

***

### customMarkerOffset

> **customMarkerOffset**: `string`

`data-custom-marker-offset`：マーカーのオフセット。`"x, y"` 形式のピクセル値。

#### Default Value

`'0, 0'`

***

### fullscreenControl

> **fullscreenControl**: `string`

`data-fullscreen-control`：全画面コントロール。`'on'` / `'off'`、または表示位置を
受け付ける。

#### Default Value

`'off'`

***

### geojson

> **geojson**: `string`

`data-geojson`：GeoJSON のソース。URL、インラインの JSON 文字列、または
インライン要素（`<script type="application/json">` など）を指す CSS セレクタの
いずれか。

#### Default Value

`''`

***

### geolocateControl

> **geolocateControl**: `string`

`data-geolocate-control`：現在地コントロール。`'on'` / `'off'`、または表示位置を
受け付ける。

#### Default Value

`'off'`

***

### geoloniaControl

> **geoloniaControl**: `string`

`data-geolonia-control`：Geolonia のアトリビューション（ロゴ）コントロール。
`'on'` / `'off'`、または表示位置を受け付ける。

#### Default Value

`'on'`

***

### gestureHandling

> **gestureHandling**: `string`

`data-gesture-handling`（`'on'` / `'off'`）：パン、ズーム、回転のジェスチャを
有効にする。地図を非インタラクティブに生成した場合は `'off'` に固定される。

#### Default Value

`'on'`

***

### hash

> **hash**: `string`

`data-hash`（`'on'` / `'off'`）：地図の表示位置を URL のハッシュに同期する。

#### Default Value

`'off'`

***

### key

> **key**: `string`

`data-key`：Geolonia の API キー（埋め込み `<script>` タグの
`?geolonia-api-key=` クエリで指定しない場合に使う）。

#### Default Value

```ts
キーリングが保持する現在の API キー
```

***

### lang

> **lang**: `string`

`data-lang`：ラベルの言語。`data-lang` に指定できるのは `'ja'`、`'en'`、
`'auto'` など。`parseAtts` は `'ja'` のみを `'ja'` に解決し、それ以外の明示値は
`'en'` に解決する（`'ja-jp'` も `'en'` になる）。`'auto'` および未指定のときは
ブラウザ言語（`getLang()` の結果。`'ja'` または `'en'`）になる。

#### Default Value

未指定のときは `getLang()` の結果（`'ja'` または `'en'`）

***

### lat

> **lat**: `string` \| `number`

`data-lat`：地図中心の緯度。中心は `data-lat` と `data-lng` の両方が
指定されたときにのみ適用される。

#### Default Value

`0`

***

### lng

> **lng**: `string` \| `number`

`data-lng`：地図中心の経度。[EmbedAttributes.lat](#lat) を参照。

#### Default Value

`0`

***

### loader

> **loader**: `string`

`data-loader`（`'on'` / `'off'`）：地図の初期化中にローディング表示を出す。

#### Default Value

`'on'`

***

### marker

> **marker**: `string`

`data-marker`（`'on'` / `'off'`）：中心にマーカーを表示する。中心が設定されて
いるときにのみ有効（[EmbedAttributes.lat](#lat) を参照）。

#### Default Value

`'on'`

***

### markerColor

> **markerColor**: `string`

`data-marker-color`：中心マーカーの色。

#### Default Value

`'#E4402F'`

***

### maxZoom

> **maxZoom**: `string` \| `number`

`data-max-zoom`：最大ズームレベル。

#### Default Value

`20`

***

### minZoom

> **minZoom**: `string` \| `number`

`data-min-zoom`：最小ズームレベル。空文字列は「未指定」を意味する。

#### Default Value

`''`

***

### navigationControl

> **navigationControl**: `string`

`data-navigation-control`：ズームと回転のコントロール。`'on'` / `'off'`、または
表示位置（`'top-right'`、`'bottom-left'` など）を受け付ける。

#### Default Value

`'on'`

***

### openPopup

> **openPopup**: `string`

`data-open-popup`（`'on'` / `'off'`）：読み込み時にマーカーのポップアップを開く。

#### Default Value

`'off'`

***

### pitch

> **pitch**: `string` \| `number`

`data-pitch`：初期ピッチ（傾き）。単位は度。

#### Default Value

`0`

***

### plugin

> **plugin**: `string`

`data-plugin`：実行する埋め込みプラグイン名。無効にする場合は `'off'`。

#### Default Value

`'off'`

***

### scaleControl

> **scaleControl**: `string`

`data-scale-control`：スケールバー。`'on'` / `'off'`、または表示位置を受け付ける。

#### Default Value

`'off'`

***

### style

> **style**: `string`

`data-style`：地図スタイル。Geolonia のスタイル名（`geolonia/basic-v2`）、
style.json の完全な URL、または相対パスのいずれか。

#### Default Value

`'geolonia/basic-v2'`

***

### zoom

> **zoom**: `string` \| `number`

`data-zoom`：初期ズームレベル。

#### Default Value

`0`
