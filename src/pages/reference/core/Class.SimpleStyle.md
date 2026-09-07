---
layout: ../../../layouts/ApiLayout.astro
title: 'Class: SimpleStyle'
page: reference
---

[**@geolonia/maps-core**](/reference/core/)

***

[@geolonia/maps-core](/reference/core/) / SimpleStyle

# Class: SimpleStyle

simplestyle 仕様の GeoJSON を地図に表示するヘルパークラスです。

ポリゴン、ライン、ポイントの各ジオメトリをそれぞれに適したレイヤーで描画し、
`fill`、`stroke`、`marker-color`、`marker-size`、`title`、`description` などの
simplestyle プロパティを解釈してスタイルへ反映します。ポイントについてはクラスタリング表示に対応します。
ポリゴン、ライン、ポイントの各ジオメトリレイヤー上でクリックすると、`description` プロパティを持つ
フィーチャーについてポップアップを表示します（ラベル用のシンボルレイヤーにはポップアップを登録しません）。

GeoJSON は FeatureCollection を直接渡すほか、GeoJSON を返す URL 文字列を渡して非同期に取得させることもできます。
`addTo`、`updateData`、`fitBounds`、`remove` は `this` を返すため、メソッドチェーンで記述できます。

## Example

```typescript
new SimpleStyle(geojson).addTo(map);
```

## Constructors

### Constructor

> **new SimpleStyle**(`geojson`, `options?`): `SimpleStyle`

SimpleStyle を作成します。

`geojson` に URL 文字列を渡した場合は、その URL から GeoJSON を非同期に取得します。
取得の完了は `_loadingPromise` で待つことができます。

#### Parameters

##### geojson

`string` \| `FeatureCollection`

表示する GeoJSON です。FeatureCollection または GeoJSON を返す URL 文字列を指定します。

##### options?

`Record`\<`string`, `unknown`\>

表示オプションです。指定した項目のみが既定値を上書きします。既定値は
  `id: "geolonia-simple-style"`、`cluster: true`、`heatmap: false`、`clusterColor: "#ff0000"` です。

#### Returns

`SimpleStyle`

## Properties

### \_loadingPromise

> **\_loadingPromise**: `Promise`\<`unknown`\> \| `undefined`

## Methods

### addTo()

> **addTo**(`map`): `SimpleStyle`

地図にソースとレイヤーを追加して GeoJSON を表示します。

ポリゴンとラインのソース、ポイント用のソース（クラスタリング設定付き）を追加し、
ポリゴンとラインのラベル用シンボルレイヤーを配置したうえで、
[setPolygonGeometries](#setpolygongeometries)、
[setLineGeometries](#setlinegeometries)、
[setPointGeometries](#setpointgeometries)、
[setCluster](#setcluster) を呼び出して各ジオメトリのレイヤーを設定します。

#### Parameters

##### map

`Map$1`

表示先の地図です。

#### Returns

`SimpleStyle`

メソッドチェーンのための `this` を返します。

#### Example

```typescript
new SimpleStyle(geojson).addTo(map);
```

***

### fitBounds()

> **fitBounds**(`options?`): `SimpleStyle`

データ全体の範囲に地図をフィットさせます。

現在の GeoJSON のフィーチャーからバウンディングボックスを算出し、そこへ地図を移動します。
フィーチャーが存在しない場合は何もしません。データを URL から取得中に呼び出した場合は、
フィット要求を保持しておき、取得完了後に自動でフィットします。

#### Parameters

##### options?

`map.fitBounds` に渡すオプションです。既定値は `duration: 3000`、`padding: 30` で、
  指定した項目のみがこれらを上書きします。

#### Returns

`SimpleStyle`

メソッドチェーンのための `this` を返します。

***

### remove()

> **remove**(): `SimpleStyle`

追加したソース、レイヤー、イベントハンドラーを地図から除去します。

[setPopup](#setpopup) や [setCluster](#setcluster)
で登録したイベントハンドラーをすべて解除し、ポリゴン、ライン、ポイント、クラスターの各レイヤーと、
それらのソースを削除します。カーソルのスタイルも元に戻します。まだ地図に追加されていない場合は何もしません。

#### Returns

`SimpleStyle`

メソッドチェーンのための `this` を返します。

***

### setCluster()

> **setCluster**(): `void`

クラスタリング用のレイヤーを設定します。

`point_count` を持つクラスターを対象に、クラスターを表す円レイヤーと、
件数（`point_count_abbreviated`）を表示するラベルのシンボルレイヤーを追加します。
円の色は `clusterColor` オプションを使います。クラスターをクリックすると、
そのクラスターが展開するズームレベルまで地図を移動します。あわせてホバー時に
カーソルを変えるハンドラーも設定します。登録したハンドラーは `_eventHandlers` に記録され、
[remove](#remove) でまとめて解除されます。通常は
[addTo](#addto) から呼び出されます。

#### Returns

`void`

***

### setGeoJSON()

> **setGeoJSON**(`geojson`): `void`

内部で保持する GeoJSON を設定します。

`geojson` が URL 文字列の場合は、いったん空のデータを設定したうえで、その URL から GeoJSON を
非同期に取得します。取得中の Promise は `_loadingPromise` に保持され、取得完了後に
[updateData](#updatedata) で表示を更新します。フィット要求が保留されていれば
あわせてフィットします。応答が 2xx 以外の場合は空のデータとして扱い、通信や JSON の解析で
例外が発生した場合はエラーをコンソールに出力します。
`geojson` が FeatureCollection の場合は、そのまま内部データとして設定します。

#### Parameters

##### geojson

`string` \| `FeatureCollection`

設定する FeatureCollection または GeoJSON を返す URL 文字列です。

#### Returns

`void`

***

### setLineGeometries()

> **setLineGeometries**(): `void`

ラインのレイヤーを設定します。

`$type` が `LineString` のフィーチャーを対象にラインレイヤーを追加し、
`stroke-width`（線幅）、`stroke`（線色）、`stroke-opacity`（不透明度）の各 simplestyle プロパティを反映します。
線端と結合は丸めて描画します。あわせて [setPopup](#setpopup) でこのレイヤーにポップアップを設定します。
通常は [addTo](#addto) から呼び出されます。

#### Returns

`void`

***

### setPointGeometries()

> **setPointGeometries**(): `void`

ポイントのレイヤーを設定します。

クラスターに属さないポイントを対象に、2 種類のレイヤーを追加します。
`marker-symbol` を持たないポイントには円レイヤーを、
`marker-symbol` を持つポイントにはアイコンとラベルのシンボルレイヤーを使います。
`marker-size`（`small`、`large`、その他）に応じて円の半径やラベルのオフセットを変え、
`marker-color`、`stroke`、`title`、`text-color` などの simplestyle プロパティを反映します。
あわせて円レイヤーとシンボルレイヤーの双方に [setPopup](#setpopup) でポップアップを設定します。
通常は [addTo](#addto) から呼び出されます。

#### Returns

`void`

***

### setPolygonGeometries()

> **setPolygonGeometries**(): `void`

ポリゴンの塗りレイヤーを設定します。

`$type` が `Polygon` のフィーチャーを対象に塗りレイヤーを追加し、
`fill`、`fill-opacity`、`stroke`（輪郭色）の各 simplestyle プロパティを反映します。
あわせて [setPopup](#setpopup) でこのレイヤーにポップアップを設定します。
通常は [addTo](#addto) から呼び出されます。

#### Returns

`void`

***

### setPopup()

> **setPopup**(`map`, `source`): `Promise`\<`void`\>

指定したレイヤーにクリックでポップアップを表示するイベントハンドラーを設定します。

クリックされたフィーチャーが `description` プロパティを持つ場合、その中心座標に
サニタイズ済みの HTML を表示するポップアップを追加します。あわせてホバー時に
カーソルを変えるハンドラーも設定します。登録したハンドラーは `_eventHandlers` に記録され、
[remove](#remove) でまとめて解除されます。

#### Parameters

##### map

`Map$1`

ポップアップを表示する地図です。

##### source

`string`

ハンドラーを設定する対象のレイヤー ID です。

#### Returns

`Promise`\<`void`\>

***

### updateData()

> **updateData**(`geojson`): `SimpleStyle`

表示中のデータを新しい GeoJSON で差し替えます。

フィーチャーをポイントとそれ以外（ポリゴン、ライン）に振り分け、
それぞれ対応するソースの内容を更新します。レイヤー自体の追加は行わないため、
あらかじめ [addTo](#addto) で地図に追加されている必要があります。

#### Parameters

##### geojson

`FeatureCollection`

差し替える FeatureCollection です。

#### Returns

`SimpleStyle`

メソッドチェーンのための `this` を返します。
