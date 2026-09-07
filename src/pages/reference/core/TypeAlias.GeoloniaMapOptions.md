---
layout: ../../../layouts/ApiLayout.astro
title: 'Type Alias: GeoloniaMapOptions'
page: reference
---

[**@geolonia/maps-core**](/reference/core/)

***

[@geolonia/maps-core](/reference/core/) / GeoloniaMapOptions

# Type Alias: GeoloniaMapOptions

> **GeoloniaMapOptions** = `MapOptions` & `object`

[GeoloniaMap](/reference/core/Class.GeoloniaMap) のコンストラクタに渡すオプション。

MapLibre GL JS の `MapOptions` を拡張し、Geolonia 固有の設定
（API キー、スタイル、マーカー、各種コントロール、GeoJSON 表示など）を
追加したものである。`container` や `center`、`zoom` などの基本オプションは
MapLibre の `MapOptions` から継承する。

## Type Declaration

### 3d?

> `optional` **3d?**: `boolean`

3D モード（対応スタイルの建物などの 3D 表示）を有効にするかどうか。

#### Default Value

`false`

### apiKey?

> `optional` **apiKey?**: `string`

Geolonia の API キー。Geolonia がホストするスタイルやタイルを使う場合に必要。
指定するとキーリングにも設定される。

### cluster?

> `optional` **cluster?**: `boolean`

`geojson` のポイント地物をクラスタリングするかどうか。

#### Default Value

`true`

### clusterColor?

> `optional` **clusterColor?**: `string`

クラスタマーカーの色。

#### Default Value

`'#ff0000'`

### customMarker?

> `optional` **customMarker?**: `string`

マーカーとして使うカスタム要素の CSS セレクタ。

### customMarkerOffset?

> `optional` **customMarkerOffset?**: \[`number`, `number`\]

カスタムマーカーのオフセット。`[x, y]` のピクセル値。

### fullscreenControl?

> `optional` **fullscreenControl?**: `boolean` \| `ControlPosition`

全画面コントロール。`true` / `false`、または表示位置を指定する。

#### Default Value

`false`

### geojson?

> `optional` **geojson?**: `string` \| `GeoJSON.FeatureCollection`

SimpleStyle で表示する GeoJSON。URL、または GeoJSON オブジェクトを指定する。
`center` が未指定のときは、この GeoJSON の範囲に自動的にフィットする。

### geolocateControl?

> `optional` **geolocateControl?**: `boolean` \| `ControlPosition`

現在地コントロール。`true` / `false`、または表示位置を指定する。

#### Default Value

`false`

### geoloniaControl?

> `optional` **geoloniaControl?**: `boolean` \| `ControlPosition`

Geolonia のロゴコントロール。`true` / `false`、または表示位置を指定する。

#### Default Value

`true`

### gestureHandling?

> `optional` **gestureHandling?**: `boolean`

スクロール可能なページでジェスチャ操作（2本指での地図操作の要求など）を
有効にするかどうか。

#### Default Value

`true`

### lang?

> `optional` **lang?**: `"ja"` \| `"en"` \| `"auto"`

ラベルの言語。`'ja'` / `'en'` / `'auto'`（ブラウザ言語に従う）。
`'auto'` または未指定のときは `getLang()` の結果（`'ja'` または `'en'`）になる。

#### Default Value

`'auto'`

### loader?

> `optional` **loader?**: `boolean`

地図の読み込み中にローディングアニメーションを表示するかどうか。

#### Default Value

`true`

### marker?

> `optional` **marker?**: `boolean`

中心にデフォルトマーカーを表示するかどうか。`center` が指定されている場合にのみ
実際に表示される。

### markerColor?

> `optional` **markerColor?**: `string`

マーカーの色（CSS カラー文字列）。

### navigationControl?

> `optional` **navigationControl?**: `boolean` \| `ControlPosition`

ズームと回転のコントロール。`true` / `false`、または表示位置
（`'top-right'`、`'bottom-left'` など）を指定する。

#### Default Value

`true`

### openPopup?

> `optional` **openPopup?**: `boolean`

読み込み時にマーカーのポップアップを自動的に開くかどうか。

### scaleControl?

> `optional` **scaleControl?**: `boolean` \| `ControlPosition`

スケールコントロール。`true` / `false`、または表示位置を指定する。

#### Default Value

`false`

### simpleVector?

> `optional` **simpleVector?**: `string`

SimpleStyle Vector で表示するベクトルタイルの URL または論理名。

### stage?

> `optional` **stage?**: `string`

API のステージ（`'dev'` / `'v1'` など）。API エンドポイントの選択に使う。

#### Default Value

`'dev'`

### style?

> `optional` **style?**: `string`

地図スタイル。Geolonia のスタイル論理名（`'geolonia/basic-v2'`）、
style.json の完全な URL、または相対パスのいずれか。

#### Default Value

`'geolonia/basic-v2'`

## Example

```typescript
const map = new GeoloniaMap({
  container: "#map",
  apiKey: "YOUR-API-KEY",
  style: "geolonia/basic-v2",
  center: [139.7671, 35.6812],
  zoom: 14,
  lang: "ja",
});
```
