---
layout: ../../../layouts/ApiLayout.astro
title: 'Interface: CircleOptions'
page: reference
---

[**@geolonia/maps-suite**](/reference/suite/)

***

[@geolonia/maps-suite](/reference/suite/) / [geolonia](/reference/suite/Namespace.geolonia) / [maps](/reference/suite/geolonia.Namespace.maps) / CircleOptions

# Interface: CircleOptions

[Circle](/reference/suite/geolonia.maps.Class.Circle) を構築するためのオプションです。

## Properties

### center?

> `optional` **center?**: [`LatLngLiteral`](/reference/suite/geolonia.maps.Interface.LatLngLiteral)

円の中心座標です。

***

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

円を追加する地図です。省略する（または `null` を渡す）と、取り外した状態で作成します。

***

### radius?

> `optional` **radius?**: `number`

円の半径（メートル）です。

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

円の可視性です。`false` の場合は非表示になります。デフォルトは `true` です。
