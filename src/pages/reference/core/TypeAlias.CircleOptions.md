---
layout: ../../../layouts/ApiLayout.astro
title: 'Type Alias: CircleOptions'
page: reference
---

[**@geolonia/maps-core**](/reference/core/)

***

[@geolonia/maps-core](/reference/core/) / CircleOptions

# Type Alias: CircleOptions

> **CircleOptions** = `object`

GeoloniaMapOptions.circle の指定。

## Properties

### color?

> `optional` **color?**: `string`

円の色に使うプロパティ名。値がすべて数値なら連続した色に、
そうでなければ値ごとに別の色にする。`"12"` のような数字の文字列もカテゴリとして扱う。
オブジェクトや配列の値は色分けしない。`colors` に [ColorMap](/reference/core/TypeAlias.ColorMap) を渡したときは、値の種類によらず対応表のとおりに塗る（照合の規則は [ColorMap](/reference/core/TypeAlias.ColorMap) を参照）。

***

### colors?

> `optional` **colors?**: `string`[] \| [`ColorMap`](/reference/core/TypeAlias.ColorMap)

`color` に使う色。配列なら、数値は小さい側から大きい側へ、カテゴリは出現順に割り当てる。
[ColorMap](/reference/core/TypeAlias.ColorMap) なら、値の種類によらず対応表のとおりに割り当てる（照合の規則は [ColorMap](/reference/core/TypeAlias.ColorMap) を参照）。

***

### size?

> `optional` **size?**: `string`

円の大きさに使うプロパティ名。データの範囲を半径 3 から 11 ピクセルに対応させる。
