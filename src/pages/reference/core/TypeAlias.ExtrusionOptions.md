---
layout: ../../../layouts/ApiLayout.astro
title: 'Type Alias: ExtrusionOptions'
page: reference
---

[**@geolonia/maps-core**](/reference/core/)

***

[@geolonia/maps-core](/reference/core/) / ExtrusionOptions

# Type Alias: ExtrusionOptions

> **ExtrusionOptions** = `object`

GeoloniaMapOptions.extrusion の詳細な指定。

## Properties

### color?

> `optional` **color?**: `string` \| [`ExtrusionColorOptions`](/reference/core/TypeAlias.ExtrusionColorOptions)

色に使うプロパティ名、または [ExtrusionColorOptions](/reference/core/TypeAlias.ExtrusionColorOptions)。省略すると `height` と同じプロパティで色分けする。

***

### height

> **height**: `string` \| [`ExtrusionHeightOptions`](/reference/core/TypeAlias.ExtrusionHeightOptions)

高さに使うプロパティ名、または [ExtrusionHeightOptions](/reference/core/TypeAlias.ExtrusionHeightOptions)。
