---
layout: ../../../layouts/ApiLayout.astro
title: 'Interface: PolygonOptions'
page: reference
---

[**@geolonia/maps-suite**](/reference/suite/geolonia.Namespace.maps)

***

[@geolonia/maps-suite](/reference/suite/geolonia.Namespace.maps) / [geolonia](/reference/suite/geolonia.Namespace.maps) / [maps](/reference/suite/geolonia.Namespace.maps) / PolygonOptions

# Interface: PolygonOptions

[Polygon](/reference/suite/geolonia.maps.Class.Polygon) を構築するためのオプションです。

## Properties

### fillColor?

> `optional` **fillColor?**: `string`

塗り潰しの色です。CSS カラー文字列で指定します。
デフォルトは `"#000000"` です。

***

### fillOpacity?

> `optional` **fillOpacity?**: `number`

塗り潰しの不透明度（0.0〜1.0）です。デフォルトは `0.35` です。

***

### map?

> `optional` **map?**: [`Map`](/reference/suite/geolonia.maps.Class.Map) \| `null`

ポリゴンを追加する地図です。省略する（または `null` を渡す）と、取り外した状態で作成します。

***

### paths?

> `optional` **paths?**: [`MVCArray`](/reference/suite/geolonia.maps.Class.MVCArray)\<[`LatLng`](/reference/suite/geolonia.maps.Class.LatLng)\> \| [`MVCArray`](/reference/suite/geolonia.maps.Class.MVCArray)\<[`MVCArray`](/reference/suite/geolonia.maps.Class.MVCArray)\<[`LatLng`](/reference/suite/geolonia.maps.Class.LatLng)\>\> \| [`LatLngLiteralOrLatLng`](/reference/suite/geolonia.maps.TypeAlias.LatLngLiteralOrLatLng)[] \| [`LatLngLiteralOrLatLng`](/reference/suite/geolonia.maps.TypeAlias.LatLngLiteralOrLatLng)[][]

ポリゴンを構成する頂点座標の輪郭です。

- 平坦な配列 (`LatLngLiteralOrLatLng[]`) や
  [MVCArray](/reference/suite/geolonia.maps.Class.MVCArray)`<`[LatLng](/reference/suite/geolonia.maps.Class.LatLng)`>` を渡すと、単一の輪郭になります。
- ネストした配列 (`LatLngLiteralOrLatLng[][]`) や
  [MVCArray](/reference/suite/geolonia.maps.Class.MVCArray)`<`[MVCArray](/reference/suite/geolonia.maps.Class.MVCArray)`<`[LatLng](/reference/suite/geolonia.maps.Class.LatLng)`>>` を渡すと、
  複数の輪郭 (穴あきポリゴン) になります。最初の輪郭が外周、
  それ以降は内側の穴として扱われます。

[MVCArray](/reference/suite/geolonia.maps.Class.MVCArray) を渡すとその配列が直接使われ、以降の変異操作
(`push`, `setAt` など) で自動的に再描画されます。

***

### strokeColor?

> `optional` **strokeColor?**: `string`

外周線の色です。CSS カラー文字列で指定します。
デフォルトは `"#000000"` です。

***

### strokeOpacity?

> `optional` **strokeOpacity?**: `number`

外周線の不透明度（0.0〜1.0）です。デフォルトは `1.0` です。

***

### strokeWeight?

> `optional` **strokeWeight?**: `number`

外周線の太さ（ピクセル）です。デフォルトは `3` です。

***

### visible?

> `optional` **visible?**: `boolean`

ポリゴンの可視性です。`false` の場合は非表示になります。デフォルトは `true` です。
