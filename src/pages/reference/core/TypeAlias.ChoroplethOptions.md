---
layout: ../../../layouts/ApiLayout.astro
title: 'Type Alias: ChoroplethOptions'
page: reference
---

[**@geolonia/maps-core**](/reference/core/)

***

[@geolonia/maps-core](/reference/core/) / ChoroplethOptions

# Type Alias: ChoroplethOptions

> **ChoroplethOptions** = `object`

GeoloniaMapOptions.choropleth の詳細な指定。

## Properties

### colors?

> `optional` **colors?**: `string`[]

値の小さい側から大きい側へ並べた色。値の範囲に等間隔で割り当て、間は補間する。

#### Default Value

`['#FFF2CC', '#FFAB40', '#EA5C0D', '#B3261E']`

***

### property

> **property**: `string`

塗り分けに使うプロパティ名。値が数値の地物だけを塗り分ける。

***

### range?

> `optional` **range?**: \[`number`, `number`\]

色を割り当てる値の範囲 `[最小, 最大]`。省略するとデータの最小値と最大値を使う。
