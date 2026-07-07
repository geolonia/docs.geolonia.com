---
layout: ../../../layouts/ApiLayout.astro
title: 'Interface: AdvancedMarkerElementOptions'
page: reference
---

[**@geolonia/maps-suite**](/reference/api/)

***

[@geolonia/maps-suite](/reference/api/) / [geolonia](/reference/api/Namespace.geolonia) / [maps](/reference/api/geolonia.Namespace.maps) / AdvancedMarkerElementOptions

# Interface: AdvancedMarkerElementOptions

[AdvancedMarkerElement](/reference/api/geolonia.maps.Class.AdvancedMarkerElement) を構築するためのオプションです。

## Properties

### content?

> `optional` **content?**: `HTMLElement` \| `null`

マーカーとして描画するカスタム DOM 要素です。省略した場合は、デフォルトの
マーカーが表示されます。

***

### map?

> `optional` **map?**: [`Map`](/reference/api/geolonia.maps.Class.Map) \| `null`

マーカーを追加する地図です。省略するか `null` を渡すと、取り外された状態で作成されます。

***

### position?

> `optional` **position?**: [`LatLngLiteral`](/reference/api/geolonia.maps.Interface.LatLngLiteral)

マーカーを配置する位置です。

***

### title?

> `optional` **title?**: `string`

マーカーにポインターをホバー時に表示されるツールチップのテキストです。
