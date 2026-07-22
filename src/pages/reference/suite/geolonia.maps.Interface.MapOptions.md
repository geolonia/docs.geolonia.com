---
layout: ../../../layouts/ApiLayout.astro
title: 'Interface: MapOptions'
page: reference
---

[**@geolonia/maps-suite**](/reference/suite/)

***

[@geolonia/maps-suite](/reference/suite/) / [geolonia](/reference/suite/Namespace.geolonia) / [maps](/reference/suite/geolonia.Namespace.maps) / MapOptions

# Interface: MapOptions

[Map](/reference/suite/geolonia.maps.Class.Map) を構築するためのオプションです。

## Properties

### apiKey?

> `optional` **apiKey?**: `string`

あなたの Geolonia API キーです。

***

### center?

> `optional` **center?**: [`LatLngLiteral`](/reference/suite/geolonia.maps.Interface.LatLngLiteral)

地図の初期中心です。デフォルトは東京駅
(`{ lat: 35.681236, lng: 139.767125 }`) です。

***

### style?

> `optional` **style?**: `string`

使用する地図のスタイルです。Geolonia のスタイル識別子（例:
`"geolonia/basic-v2"`）またはスタイル URL で指定します。

***

### zoom?

> `optional` **zoom?**: `number`

初期ズームレベルです。数値が大きいほどより拡大します。デフォルトは `14` です。
