---
layout: ../../../layouts/ApiLayout.astro
title: 'Class: SimpleStyleVector'
page: reference
---

[**@geolonia/maps-core**](/reference/core/)

***

[@geolonia/maps-core](/reference/core/) / SimpleStyleVector

# Class: SimpleStyleVector

ベクトルタイル（tiles.json / TileJSON）を simplestyle の規約に沿って地図に表示するヘルパーです。

GeoJSON を対象とする SimpleStyle のベクトルタイル版に相当します。TileJSON の URL を渡すと、
`g-simplestyle-v1` という source-layer に含まれるポリゴン、ライン、ポイントの各ジオメトリを、
フィーチャーが持つ simplestyle プロパティ（`fill`、`stroke`、`marker-color`、`marker-size`、`title` など）
に従って描画します。フィーチャーが該当プロパティを持たない場合は、既定の色やサイズが適用されます。
ポリゴン、ライン、ポイントの各ジオメトリレイヤー上でクリックすると、`description` プロパティを持つ
フィーチャーについて、その内容を HTML としてポップアップ表示します（ポリゴンやラインのラベル用
シンボルレイヤーにはポップアップを登録しません）。

## Example

```typescript
new SimpleStyleVector(url).addTo(map);
```

## Constructors

### Constructor

> **new SimpleStyleVector**(`url`): `SimpleStyleVector`

#### Parameters

##### url

`string`

表示するベクトルタイルソースの TileJSON（tiles.json）URL です。

#### Returns

`SimpleStyleVector`

## Methods

### addTo()

> **addTo**(`map`): `void`

地図にベクトルタイルソースと各レイヤーを追加し、simplestyle の規約に沿って表示します。

ソースを追加したうえで、ポリゴン（塗り潰しとラベル）、ライン（線とラベル）、
ポイント（円、アイコン、ラベル）の各レイヤーを設定します。あわせて、ポリゴンの塗り潰し、
ラインの線、ポイントの円とアイコンの各レイヤーにクリック時のポップアップを登録します
（ポリゴンやラインのラベル用シンボルレイヤーには登録しません）。

地図コンテナの `data-lng` および `data-lat` 属性がいずれも指定されていない場合は、
ソースの読み込み完了を待って、そのソースの `bounds` に一度だけ地図の表示範囲を合わせます
（`padding` は 30、アニメーションなし）。

#### Parameters

##### map

`Map$1`

レイヤーを追加する対象の地図インスタンスです。

#### Returns

`void`

#### Example

```typescript
new SimpleStyleVector(url).addTo(map);
```

***

### setLineGeometries()

> **setLineGeometries**(`map`): `void`

ラインジオメトリ用のレイヤーを設定します。

`$type` が `LineString` のフィーチャーに対して線レイヤー（`line` タイプ）を追加します。
線幅はフィーチャーの `stroke-width` プロパティ、線色は `stroke`、
不透明度は `stroke-opacity` を用い、いずれも未指定の場合は既定値を適用します。
線の端点と結合部はいずれも丸め（`round`）で描画します。
あわせて、このラインレイヤーにクリック時のポップアップを登録します。

#### Parameters

##### map

`Map$1`

レイヤーを追加する対象の地図インスタンスです。

#### Returns

`void`

***

### setPointGeometries()

> **setPointGeometries**(`map`): `void`

ポイントジオメトリ用のレイヤーを設定します。

2 つのレイヤーを追加します。1 つは `marker-symbol` を持たないポイント向けの円レイヤー
（`circle` タイプ）で、半径はフィーチャーの `marker-size`（`small` は 7、`large` は 13、
それ以外は 9）に応じて変化し、色は `marker-color`、外周線は `stroke` 系プロパティを用います。
もう 1 つはすべてのポイント向けのシンボルレイヤー（`symbol` タイプ）で、`marker-symbol` を
アイコン画像として、`title` をラベルとして表示します。ラベルの位置は `marker-size` に応じて調整します。
あわせて、円レイヤーとシンボルレイヤーの両方にクリック時のポップアップを登録します。

#### Parameters

##### map

`Map$1`

レイヤーを追加する対象の地図インスタンスです。

#### Returns

`void`

***

### setPolygonGeometries()

> **setPolygonGeometries**(`map`): `void`

ポリゴンジオメトリ用のレイヤーを設定します。

`$type` が `Polygon` のフィーチャーに対して塗り潰しレイヤー（`fill` タイプ）を追加します。
塗り色はフィーチャーの `fill` プロパティ、不透明度は `fill-opacity`、
外周線の色は `stroke` プロパティを用い、いずれも未指定の場合は既定値を適用します。
あわせて、このポリゴンレイヤーにクリック時のポップアップを登録します。

#### Parameters

##### map

`Map$1`

レイヤーを追加する対象の地図インスタンスです。

#### Returns

`void`

***

### setPopup()

> **setPopup**(`map`, `source`): `Promise`\<`void`\>

指定したレイヤーにクリック時のポップアップ表示を設定します。

対象レイヤーのフィーチャーがクリックされると、そのフィーチャーの中心座標
（`@turf/center` で算出）にポップアップを表示します。ポップアップの内容は、
フィーチャーの `description` プロパティをサニタイズした HTML です。`description` を
持たないフィーチャーではポップアップを表示しません。あわせて、`description` を持つ
フィーチャーにマウスが乗ったときはカーソルをポインターに変更し、離れたときに元へ戻します。

#### Parameters

##### map

`Map$1`

イベントを登録する対象の地図インスタンスです。

##### source

`string`

ポップアップを設定する対象のレイヤー ID です。

#### Returns

`Promise`\<`void`\>

イベントリスナーの登録が完了すると解決する Promise です。
