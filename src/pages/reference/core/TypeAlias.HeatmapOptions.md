---
layout: ../../../layouts/ApiLayout.astro
title: 'Type Alias: HeatmapOptions'
page: reference
---

[**@geolonia/maps-core**](/reference/core/)

***

[@geolonia/maps-core](/reference/core/) / HeatmapOptions

# Type Alias: HeatmapOptions

> **HeatmapOptions** = `object`

GeoloniaMapOptions.heatmap の詳細な指定。

## Properties

### colors?

> `optional` **colors?**: `string`[]

密度の低い側から高い側へ並べた色。密度 0 は透明になる。

#### Default Value

`['#FABF3D', '#FFAB40', '#EA5C0D', '#B3261E']`

***

### weight?

> `optional` **weight?**: `string`

重みに使うプロパティ名。データの最小値を 0、最大値を 1 として扱う。省略するとすべて同じ重み。
