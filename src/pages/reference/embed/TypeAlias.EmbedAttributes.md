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

> \[`otherKey`: `string`\]: `string` \| `number` \| `undefined`

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

### choropleth?

> `optional` **choropleth?**: `string`

`data-choropleth`：`data-geojson` のポリゴンを、このプロパティの値で塗り分ける。
既定値はなく、指定したときだけキーが入る。

***

### choroplethColors?

> `optional` **choroplethColors?**: `string`

`data-choropleth-colors`：塗り分けの色。値の小さい側から順にカンマで区切る。
`値:色` の組をカンマで区切ると、値ごとの色の対応表になる（`data-choropleth-range`
は使わない）。組の読み方は `data-circle-colors` と同じ。
`data-choropleth` が無いときは無視する。

***

### choroplethRange?

> `optional` **choroplethRange?**: `string`

`data-choropleth-range`：色を割り当てる値の範囲。`"最小,最大"` 形式。
省略時や読めないときはデータの最小値と最大値を使う。

***

### circleColor?

> `optional` **circleColor?**: `string`

`data-circle-color`：ポイントの円の色に使うプロパティ名。

***

### circleColors?

> `optional` **circleColors?**: `string`

`data-circle-colors`：`data-circle-color` に使う色をカンマで区切る。
`normal:#3b82f6, danger:#ef4444` のように `値:色` の組をカンマで区切ると、
値ごとの色の対応表になる。組の読み方は次のとおり。

- 組が 1 つでもあれば対応表として読む。`:` の無い項目と色が空の組は、
  コンソールに警告を出して無視する。
- 値と色は、括弧の外にある最後の `:` で分ける。値に `:` を含めてよい。
- 項目は括弧の外のカンマで区切る。括弧の中のカンマ（`rgb(0, 0, 0)`）は
  区切りとして扱わないので、括弧は閉じて書く。閉じていない `(` があると、
  それより後ろのカンマと `:` を区切りとして読まない。
- 値と色の前後の空白は除く。同じ値の組が複数あれば後のものを使う。
- 使える組が 1 つも無ければ、指定しなかったときと同じ既定の色になる。
- 対応表にない値の地物の色は、maps-core の `ColorMap` の規則に従う。

`data-circle-size` と `data-circle-color` のどちらも無いときは無視する。

***

### circleSize?

> `optional` **circleSize?**: `string`

`data-circle-size`：ポイントの円の大きさに使うプロパティ名。

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

### extrusion?

> `optional` **extrusion?**: `string`

`data-extrusion`：`data-geojson` のポリゴンを、このプロパティの値に応じた高さで
立体的に描く。色も、`data-extrusion-color` を省略すると同じプロパティで決める。
地物の simplestyle の `fill` と `data-choropleth` より優先する。立体に見せるには
`data-pitch` も指定する。`data-geojson` が無いときは何も描かない。

***

### extrusionColor?

> `optional` **extrusionColor?**: `string`

`data-extrusion-color`：色に使うプロパティ名。省略すると `data-extrusion` と同じ
プロパティで色分けする。`data-extrusion` が無いときは無視する。

***

### extrusionColorRange?

> `optional` **extrusionColorRange?**: `string`

`data-extrusion-color-range`：数値の色を割り当てる値の範囲。`"最小,最大"` 形式。
省略時や読めないときはデータの最小値と最大値を使う。`data-extrusion` が無い
ときは無視する。

***

### extrusionColors?

> `optional` **extrusionColors?**: `string`

`data-extrusion-colors`：色。数値は値の小さい側から順に、カテゴリは出現順に
割り当てる色をカンマで区切る。`値:色` の組をカンマで区切ると、値ごとの色の
対応表になる（`data-extrusion-color-range` は使わない）。組の読み方は
`data-circle-colors` と同じ。`data-extrusion` が無いときは無視する。

***

### extrusionHeightRange?

> `optional` **extrusionHeightRange?**: `string`

`data-extrusion-height-range`：高さ 0 から最大の高さに割り当てる値の範囲。
`"最小,最大"` 形式。省略時や読めないときはデータの値から決める。
`data-extrusion` が無いときは無視する。

***

### extrusionHeightScale?

> `optional` **extrusionHeightScale?**: `string`

`data-extrusion-height-scale`：値 1 あたりの高さ（メートル）。指定すると高さは
「値 × この数」になる。数値として読めないときは無視する。`data-extrusion` が
無いときは無視する。

***

### extrusionMaxHeight?

> `optional` **extrusionMaxHeight?**: `string`

`data-extrusion-max-height`：`data-extrusion-height-range` の最大値に割り当てる
高さ（メートル）。`data-extrusion-height-scale` があるときは使わない。数値として
読めないときは無視する。`data-extrusion` が無いときは無視する。

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

`data-geojson`：GeoJSON のソース。URL（`https://...`、`/data.geojson`、
`./data.geojson`、`../data.geojson` など）か、地図コンテナの外に置いた、中身が
GeoJSON の FeatureCollection の要素（`<script type="application/json">` など）を
指す CSS セレクタのいずれか。

これ以外の値（インラインの JSON 文字列、`./` を付けない相対パス、何も指さない
セレクタなど）は扱えず、地物は描かれない（多くの場合はエラーになる）。対応外の
値で起きることの詳細は https://github.com/geolonia/embed/issues/570 を参照。

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

### heatmap?

> `optional` **heatmap?**: `string`

`data-heatmap`：`data-geojson` のポイントをヒートマップで描く。`'on'` で重みなし、
プロパティ名でその値を重みにする。`'off'` または空なら描かない。

***

### heatmapColors?

> `optional` **heatmapColors?**: `string`

`data-heatmap-colors`：ヒートマップの色。密度の低い側から順にカンマで区切る。
密度に対する色なので、`値:色` の組（対応表）には対応しない。
`data-heatmap` が無いときは無視する。

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

`data-lang`：ラベルとジェスチャー制御の文言の言語。指定した値はそのまま
maps-core に渡る。`'ja'` と `'ja-jp'` は日本語、`'auto'` と空文字はブラウザ
言語に従い、それ以外の値は英語になる。比較は大文字と小文字を区別するので、
`'ja-JP'` は英語になる。ラベルに効くのは、`data-style` を省略したときか
Geolonia のスタイル名を指定したときだけ。`'ja'`、`'en'`、`'auto'`、空文字以外の
値では、`'ja-jp'` も含めてジェスチャー制御が付かない
（https://github.com/geolonia/embed/issues/571）。

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

### mask?

> `optional` **mask?**: `string`

`data-mask`：指定した範囲の外側を暗くする。境界の GeoJSON の URL（`http://` か
`https://` で始まるもの、または `/` か `.` で始まるパス）を指定する。それ以外の
値は maps-core がコンソールにエラーを出して無視する。中心（`data-lat` と
`data-lng` の両方）、`data-geojson`、`data-simple-vector` のどれも指定して
いないときは、境界の範囲に合わせて表示する。

***

### maskColor?

> `optional` **maskColor?**: `string`

`data-mask-color`：範囲の外側を塗る色。省略すると maps-core の既定値（黒）。
`data-mask` が無いときは無視する。

***

### maskOpacity?

> `optional` **maskOpacity?**: `string`

`data-mask-opacity`：範囲の外側を塗る不透明度（0 から 1）。数値として読めない
ときは無視する。0 から 1 の外の値は maps-core がコンソールにエラーを出して
既定値（0.3）を使う。`data-mask` が無いときは無視する。

***

### maskOutline?

> `optional` **maskOutline?**: `string`

`data-mask-outline`（`'on'` / `'off'`）：境界に線を引く。線は `data-mask-color`
の色で太さ 2 ピクセル。`data-mask` が無いときは無視する。

#### Default Value

```ts
未指定のときは引かない
```

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

### projection?

> `optional` **projection?**: `string`

`data-projection`：地図の投影。`'globe'` で地球儀、`'mercator'` で平面に
する。値は前後の空白を除いて maps-core に渡り、それ以外の値は maps-core が
コンソールにエラーを出して無視する。省略したときと空のときは、スタイルの投影（無ければ
mercator）のまま。

***

### rasterTiles?

> `optional` **rasterTiles?**: `string`

`data-raster-tiles`：重ねるラスタタイルの URL のテンプレート。`{z}`、`{x}`、
`{y}` を含める。スタイルの最初の symbol レイヤ（ラベル）の下に 1 枚重ね、
symbol レイヤが無いスタイルではスタイルのレイヤの一番上に重ねる。どちらの
場合も `data-geojson` と `data-simple-vector` のレイヤはその上に描く。含まない
ときは maps-core がコンソールに警告を出して重ねない。

***

### rasterTilesAttribution?

> `optional` **rasterTilesAttribution?**: `string`

`data-raster-tiles-attribution`：重ねたタイルの出典。地図の出典表示に加わる。
HTML として表示するので、ページの作者が書いた値だけを入れ、URL のパラメータ
など外から受け取った値を入れない。空のときと、`data-raster-tiles` が無いときは
無視する。

***

### rasterTilesMaxZoom?

> `optional` **rasterTilesMaxZoom?**: `string`

`data-raster-tiles-max-zoom`：タイルが配信されている最大ズーム。これより
大きいズームでは、このズームのタイルを引き伸ばして表示する。数値として
読めないときは無視する。`data-raster-tiles` が無いときは無視する。

***

### rasterTilesMinZoom?

> `optional` **rasterTilesMinZoom?**: `string`

`data-raster-tiles-min-zoom`：タイルが配信されている最小ズーム。これより
小さいズームではタイルを読み込まない。数値として読めないときは無視する。
`data-raster-tiles` が無いときは無視する。

***

### rasterTilesOpacity?

> `optional` **rasterTilesOpacity?**: `string`

`data-raster-tiles-opacity`：重ねたタイルの不透明度（0 から 1）。範囲を超える
値は maps-core が範囲内に収める。数値として読めないときは無視する（maps-core
の既定値 1 になる）。`data-raster-tiles` が無いときは無視する。

***

### rasterTilesSize?

> `optional` **rasterTilesSize?**: `string`

`data-raster-tiles-size`：タイル 1 枚の大きさ（ピクセル）。数値として読めない
ときは無視する（maps-core の既定値 256 になる）。`data-raster-tiles` が無い
ときは無視する。

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
