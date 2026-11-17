---
layout: ../../../layouts/ApiLayout.astro
title: 'Type Alias: MaskOptions'
page: reference
---

[**@geolonia/maps-core**](/reference/core/)

***

[@geolonia/maps-core](/reference/core/) / MaskOptions

# Type Alias: MaskOptions

> **MaskOptions** = `object`

`GeoloniaMapOptions` の `mask` の詳細な指定。

## Properties

### beforeId?

> `optional` **beforeId?**: `string`

マスクをこの ID のレイヤーの下に入れる。背景の地図の最初の地名のラベルのレイヤーを指定すると、ラベルを範囲の外でも明るく残せる。
そのレイヤーより後ろのレイヤー（スタイルによっては建物や行政界も）は、すべて明るく残る。
省略したとき、または地図に無い ID のとき（`console.error` に出す）は、背景の地図のすべてのレイヤーの上で、
ID に `simple-style` を含む最初のレイヤー（`GeoloniaMap` の `geojson` / `simpleVector` オプションの地物）の下に入れる。

***

### color?

> `optional` **color?**: `string`

範囲の外側を塗る色（CSS カラー文字列）。

#### Default Value

`'#000000'`

***

### geojson

> **geojson**: `string` \| `GeoJSON.Feature` \| `GeoJSON.FeatureCollection` \| `GeoJSON.Polygon` \| `GeoJSON.MultiPolygon` \| `GeoJSON.GeometryCollection`

境界。GeoJSON の URL（`http://` か `https://` で始まるもの、または `/` か `.` で始まるパス）、または Feature か FeatureCollection を指定する。
Polygon、MultiPolygon、GeometryCollection のジオメトリを直接渡してもよく、URL が返す GeoJSON も最上位がジオメトリでよい。
Polygon と MultiPolygon の面を（GeometryCollection の中のものも）すべてくり抜き、それ以外のジオメトリは無視する。
URL の取得（本文の受信まで）は 30 秒で打ち切り、`console.error` に出す。一部の面や穴を捨てたときは `console.warn` に、すべての面を捨てたときは `console.error` に出す。
面の穴（境界に囲まれた別の地域）は暗くし、その穴の中にある面（湖の中の島など）はくり抜く。
穴の中にある面かどうかは、頂点と辺の中点がすべて穴の内側か線の上（約 0.2 メートル以内）にあるかで判定するので、隣り合う面は頂点を共有するか、座標を小数 6 桁以上の精度にする。
面が重なっていると正しくくり抜けないので、重ならない面を渡す。経度 ±180 度をまたぐ面と、経度緯度の範囲の外の座標を含む面には対応しない。
MapLibre は 1 つの面のリングを 1 タイルあたり 500 本までしか塗らないので、1 タイルに約 500 を超える面が入ると、小さい面がくり抜かれないことがある。

***

### opacity?

> `optional` **opacity?**: `number`

範囲の外側を塗る不透明度（0 から 1）。0〜1 の数でない値は `console.error` に出し、既定値を使う。

#### Default Value

`0.3`

***

### outline?

> `optional` **outline?**: `boolean` \| \{ `color?`: `string`; `width?`: `number`; \}

境界に線を引くかどうか。`true` のときは `color` の色で太さ 2 ピクセルの実線を引く。
色と太さを変えるときはオブジェクトで指定する。

#### Union Members

`boolean`

***

##### Type Literal

\{ `color?`: `string`; `width?`: `number`; \}

##### color?

> `optional` **color?**: `string`

境界線の色（CSS カラー文字列）。省略すると `color` と同じ。

##### width?

> `optional` **width?**: `number`

境界線の太さ（ピクセル）。

###### Default Value

`2`

#### Default Value

`false`
