---
layout: ../../../layouts/ApiLayout.astro
title: 'Interface: MarkerOptions'
page: reference
---

[**@geolonia/maps-suite**](/reference/suite/)

***

[@geolonia/maps-suite](/reference/suite/) / [geolonia](/reference/suite/Namespace.geolonia) / [maps](/reference/suite/geolonia.Namespace.maps) / MarkerOptions

# Interface: MarkerOptions

[Marker](/reference/suite/geolonia.maps.Class.Marker) を構築するためのオプションです。

## Properties

### icon?

> `optional` **icon?**: `object`

カスタムアイコン画像です。省略した場合は、デフォルトのマーカーが表示されます。

#### url

> **url**: `string`

マーカーとして使用する画像の URL です。

***

### map?

> `optional` **map?**: [`Map`](/reference/suite/geolonia.maps.Class.Map) \| `null`

マーカーを追加する地図です。省略する（または `null` を渡す）と、取り外した状態で作成します。

***

### position?

> `optional` **position?**: [`LatLngLiteral`](/reference/suite/geolonia.maps.Interface.LatLngLiteral)

マーカーを配置する位置です。

***

### title?

> `optional` **title?**: `string`

マーカーにポインターをホバー時に表示されるツールチップのテキストです。
