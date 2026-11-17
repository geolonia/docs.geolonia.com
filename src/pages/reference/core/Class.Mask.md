---
layout: ../../../layouts/ApiLayout.astro
title: 'Class: Mask'
page: reference
---

[**@geolonia/maps-core**](/reference/core/)

***

[@geolonia/maps-core](/reference/core/) / Mask

# Class: Mask

指定した範囲（市区町村の境界など）の外側を暗くするヘルパークラスです。

世界全体を覆う面から境界のポリゴンをくり抜いた面を、`fill` のレイヤーで塗ります。
レイヤーは既定では、背景の地図のすべてのレイヤー（地名のラベルを含む）の上で、既定の ID の `SimpleStyle` と
`SimpleStyleVector` のレイヤー（ID に `simple-style` を含む最初のレイヤー）の下に入れます。範囲の外は、地名のラベルも含めて暗くなります。
[MaskOptions.beforeId](/reference/core/TypeAlias.MaskOptions#beforeid) を指定すると、そのレイヤーの下に入れます（最初のラベルのレイヤーを指定すれば、ラベルを明るく残せます）。
マスクより後に `beforeId` を指定せずに追加したレイヤーは最前面に入るので、マスクの上に表示されます。

ソースとレイヤーの ID は `geolonia-mask`（境界線は `geolonia-mask-outline`）に固定なので、1 つの地図に追加できる Mask は 1 つです。

## Example

```typescript
new Mask({ geojson: "./boundary.geojson", outline: true }).addTo(map);
```

## Constructors

### Constructor

> **new Mask**(`option`): `Mask`

#### Parameters

##### option

`string` \| [`MaskOptions`](/reference/core/TypeAlias.MaskOptions)

境界の GeoJSON の URL、または [MaskOptions](/reference/core/TypeAlias.MaskOptions) です。

#### Returns

`Mask`

## Methods

### addTo()

> **addTo**(`map`): `Mask`

地図にマスクを追加します。`geojson` が URL のときは、空のソースとレイヤーを先に追加し、
取得してから中身を入れます。スタイルの読み込みが終わってから呼び出します（MapLibre の `addSource` と同じ）。

- この Mask を追加済みのときは、先に取り除いてから追加し直します（取得中のフィットの予約は取り消します）。
  移動先に同じ ID のソースかレイヤーがあって断るときは、元の地図に追加したままにします。
  ただし、取り除いた後の追加で例外が出たとき（スタイルの読み込み前の地図など）は、元の地図には戻しません。
- 同じ ID（`geolonia-mask`、`geolonia-mask-outline`）のソースかレイヤーがすでにあるとき（別の Mask が追加済みのときを含む。
  境界線を引かない設定でも）、`geojson` が指定されていないとき、`geojson` が URL として不正なときは、
  何も追加せずに `console.error` に出します。
- スタイルの読み込みが終わる前に呼ぶと、MapLibre の `addSource` と同じく例外を投げます。追加しかけたソースとレイヤーは取り除き、
  この Mask はどの地図にも追加されていない状態になります（読み込み後に `addTo` し直せます）。

#### Parameters

##### map

`Map$1`

#### Returns

`Mask`

メソッドチェーンのための `this` を返します。

***

### fitBounds()

> **fitBounds**(`options?`): `Mask`

境界の範囲に地図をフィットさせます。GeoJSON を取得中に呼び出したときは、取得後にフィットします。
[addTo](#addto) の後に呼び出します。地図に追加する前に呼び出しても何もしません。

#### Parameters

##### options?

`FitBoundsOptions` = `{}`

`map.fitBounds` に渡すオプションです。既定値は `duration: 3000`、`padding: 30` です。

#### Returns

`Mask`

メソッドチェーンのための `this` を返します。

***

### remove()

> **remove**(): `Mask`

地図からマスクのレイヤーとソースを取り除きます。取得中の GeoJSON が後から届いても追加しません。
取り除いた後に、もう一度 [addTo](#addto) で追加できます。

#### Returns

`Mask`

メソッドチェーンのための `this` を返します。
