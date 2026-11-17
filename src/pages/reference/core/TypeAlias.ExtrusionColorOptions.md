---
layout: ../../../layouts/ApiLayout.astro
title: 'Type Alias: ExtrusionColorOptions'
page: reference
---

[**@geolonia/maps-core**](/reference/core/)

***

[@geolonia/maps-core](/reference/core/) / ExtrusionColorOptions

# Type Alias: ExtrusionColorOptions

> **ExtrusionColorOptions** = `object`

[ExtrusionOptions.color](/reference/core/TypeAlias.ExtrusionOptions#color) の詳細な指定。
値がすべて数値なら連続した色に、そうでなければ値ごとのカテゴリの色にする（[CircleOptions.color](/reference/core/TypeAlias.CircleOptions#color) と同じ）。
`colors` に [ColorMap](/reference/core/TypeAlias.ColorMap) を渡したときは、値の種類によらず対応表のとおりにする（照合の規則は [ColorMap](/reference/core/TypeAlias.ColorMap) を参照）。

## Properties

### colors?

> `optional` **colors?**: `string`[] \| [`ColorMap`](/reference/core/TypeAlias.ColorMap)

色。配列なら、数値は小さい側から大きい側へ並べて値の範囲に等間隔で割り当て、カテゴリは出現順に割り当てる。
[ColorMap](/reference/core/TypeAlias.ColorMap) なら、値の種類によらず対応表のとおりに割り当てる（照合の規則は [ColorMap](/reference/core/TypeAlias.ColorMap) を参照）。

#### Default Value

数値は `['#FFF2CC', '#FFAB40', '#EA5C0D', '#B3261E']`

***

### property

> **property**: `string`

色に使うプロパティ名。

***

### range?

> `optional` **range?**: \[`number`, `number`\]

数値の色を割り当てる値の範囲 `[最小, 最大]`。省略するとデータの最小値と最大値を使う。`colors` が [ColorMap](/reference/core/TypeAlias.ColorMap) のときは使わない。
