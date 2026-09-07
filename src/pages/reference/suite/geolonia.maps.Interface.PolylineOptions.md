---
layout: ../../../layouts/ApiLayout.astro
title: 'Interface: PolylineOptions'
page: reference
---

[**@geolonia/maps-suite**](/reference/suite/)

***

[@geolonia/maps-suite](/reference/suite/) / [geolonia](/reference/suite/Namespace.geolonia) / [maps](/reference/suite/geolonia.Namespace.maps) / PolylineOptions

# Interface: PolylineOptions

[Polyline](/reference/suite/geolonia.maps.Class.Polyline) を構築するためのオプションです。

## Properties

### map?

> `optional` **map?**: [`Map`](/reference/suite/geolonia.maps.Class.Map) \| `null`

折れ線を追加する地図です。省略する（または `null` を渡す）と、取り外した状態で作成します。

***

### path?

> `optional` **path?**: [`MVCArray`](/reference/suite/geolonia.maps.Class.MVCArray)\<[`LatLng`](/reference/suite/geolonia.maps.Class.LatLng)\> \| [`LatLngLiteralOrLatLng`](/reference/suite/geolonia.maps.TypeAlias.LatLngLiteralOrLatLng)[]

折れ線を構成する順序付きの頂点座標です。
2 点未満のパスは表示されません。

[MVCArray](/reference/suite/geolonia.maps.Class.MVCArray) を渡すとその配列が直接使われ、
以降の変異操作 (`push`, `setAt` など) で自動的に再描画されます。

***

### strokeColor?

> `optional` **strokeColor?**: `string`

線の色です。CSS カラー文字列で指定します。
デフォルトは `"#000000"` です。

***

### strokeOpacity?

> `optional` **strokeOpacity?**: `number`

線の不透明度（0.0〜1.0）です。デフォルトは `1.0` です。

***

### strokeWeight?

> `optional` **strokeWeight?**: `number`

線の太さ（ピクセル）です。デフォルトは `3` です。

***

### visible?

> `optional` **visible?**: `boolean`

線の可視性です。`false` の場合は非表示になります。デフォルトは `true` です。
