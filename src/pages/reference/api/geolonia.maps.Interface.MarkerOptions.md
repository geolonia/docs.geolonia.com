---
layout: ../../../layouts/ApiLayout.astro
title: 'Interface: MarkerOptions'
page: reference
---

[**@geolonia/maps-suite**](/reference/api/)

***

[@geolonia/maps-suite](/reference/api/) / [geolonia](/reference/api/Namespace.geolonia) / [maps](/reference/api/geolonia.Namespace.maps) / MarkerOptions

# Interface: MarkerOptions

[Marker](/reference/api/geolonia.maps.Class.Marker) を構築するためのオプションです。

## Properties

### icon?

> `optional` **icon?**: `object`

カスタムアイコン画像です。省略した場合は、デフォルトのマーカーが表示されます。

#### url

> **url**: `string`

マーカーとして使用する画像の URL です。

***

### map?

> `optional` **map?**: [`Map`](/reference/api/geolonia.maps.Class.Map) \| `null`

マーカーを追加する地図です。省略する（または `null` を渡す）と、取り外した状態で作成します。

***

### position?

> `optional` **position?**: [`LatLngLiteral`](/reference/api/geolonia.maps.Interface.LatLngLiteral)

マーカーを配置する位置です。

***

### title?

> `optional` **title?**: `string`

マーカーにポインターをホバー時に表示されるツールチップのテキストです。
