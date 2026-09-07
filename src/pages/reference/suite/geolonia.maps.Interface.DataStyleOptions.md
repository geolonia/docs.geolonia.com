---
layout: ../../../layouts/ApiLayout.astro
title: 'Interface: DataStyleOptions'
page: reference
---

[**@geolonia/maps-suite**](/reference/suite/)

***

[@geolonia/maps-suite](/reference/suite/) / [geolonia](/reference/suite/Namespace.geolonia) / [maps](/reference/suite/geolonia.Namespace.maps) / DataStyleOptions

# Interface: DataStyleOptions

[Data](/reference/suite/geolonia.maps.Class.Data) に追加された地物の描画スタイルです。

## Properties

### fillColor?

> `optional` **fillColor?**: `string`

塗りの色です。CSS カラー文字列で指定します。デフォルトは `"#000000"` です。

***

### fillOpacity?

> `optional` **fillOpacity?**: `number`

塗りの不透明度（0.0〜1.0）です。デフォルトは `0.35` です。

***

### strokeColor?

> `optional` **strokeColor?**: `string`

線の色です。CSS カラー文字列で指定します。デフォルトは `"#000000"` です。

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

地物の可視性です。`false` の場合は非表示になります。デフォルトは `true` です。
