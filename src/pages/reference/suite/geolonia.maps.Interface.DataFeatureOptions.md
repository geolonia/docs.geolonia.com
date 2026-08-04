---
layout: ../../../layouts/ApiLayout.astro
title: 'Interface: DataFeatureOptions'
page: reference
---

[**@geolonia/maps-suite**](/reference/suite/)

***

[@geolonia/maps-suite](/reference/suite/) / [geolonia](/reference/suite/Namespace.geolonia) / [maps](/reference/suite/geolonia.Namespace.maps) / DataFeatureOptions

# Interface: DataFeatureOptions

[DataFeature](/reference/suite/geolonia.maps.Class.DataFeature) を構築するためのオプションです。

## Properties

### geometry?

> `optional` **geometry?**: `Geometry` \| `null`

地物のジオメトリです。

***

### id?

> `optional` **id?**: `string` \| `number`

地物の識別子です。[Data.getFeatureById](/reference/suite/geolonia.maps.Class.Data#getfeaturebyid) で参照できます。

***

### properties?

> `optional` **properties?**: `Record`\<`string`, `unknown`\>

地物に紐づく任意の属性です。
