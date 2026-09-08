---
layout: ../../../layouts/ApiLayout.astro
title: 'Interface: CameraOptions'
page: reference
---

[**@geolonia/maps-suite**](/reference/suite/geolonia.Namespace.maps)

***

[@geolonia/maps-suite](/reference/suite/geolonia.Namespace.maps) / [geolonia](/reference/suite/geolonia.Namespace.maps) / [maps](/reference/suite/geolonia.Namespace.maps) / CameraOptions

# Interface: CameraOptions

[Map.moveCamera](/reference/suite/geolonia.maps.Class.Map#movecamera) で受け付けるカメラの各プロパティです。
指定されたプロパティのみが即時に反映され、省略された項目は現在値のままです。

## Properties

### center?

> `optional` **center?**: [`LatLngLiteralOrLatLng`](/reference/suite/geolonia.maps.TypeAlias.LatLngLiteralOrLatLng)

地図の中心です。

***

### heading?

> `optional` **heading?**: `number`

北からの時計回りの方位角（度単位）です。`0` は北向きで、値が大きいほど時計回りに回転します。
内部的には MapLibre の bearing にマッピングされます。

***

### tilt?

> `optional` **tilt?**: `number`

チルト角度（度単位）です。`0` は真上から見下ろす状態で、値が大きいほど傾きます。
内部的には MapLibre の pitch にマッピングされます。

***

### zoom?

> `optional` **zoom?**: `number`

ズームレベルです。
