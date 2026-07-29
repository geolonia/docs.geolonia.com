---
layout: ../../../layouts/ApiLayout.astro
title: 'Interface: RectangleOptions'
page: reference
---

[**@geolonia/maps-suite**](/reference/suite/)

***

[@geolonia/maps-suite](/reference/suite/) / [geolonia](/reference/suite/Namespace.geolonia) / [maps](/reference/suite/geolonia.Namespace.maps) / RectangleOptions

# Interface: RectangleOptions

[Rectangle](/reference/suite/geolonia.maps.Class.Rectangle) を構築するためのオプションです。

## Properties

### bounds?

> `optional` **bounds?**: [`LatLngBoundsLiteralOrLatLngBounds`](/reference/suite/geolonia.maps.TypeAlias.LatLngBoundsLiteralOrLatLngBounds)

矩形の地理的範囲です。
[LatLngBounds](/reference/suite/geolonia.maps.Class.LatLngBounds) または [LatLngBoundsLiteral](/reference/suite/geolonia.maps.Interface.LatLngBoundsLiteral) のいずれかを受け付けます。

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

矩形を追加する地図です。省略する（または `null` を渡す）と、取り外した状態で作成します。

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

矩形の可視性です。`false` の場合は非表示になります。デフォルトは `true` です。
