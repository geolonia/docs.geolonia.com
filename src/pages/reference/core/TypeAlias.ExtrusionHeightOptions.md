---
layout: ../../../layouts/ApiLayout.astro
title: 'Type Alias: ExtrusionHeightOptions'
page: reference
---

[**@geolonia/maps-core**](/reference/core/)

***

[@geolonia/maps-core](/reference/core/) / ExtrusionHeightOptions

# Type Alias: ExtrusionHeightOptions

> **ExtrusionHeightOptions** = `object`

[ExtrusionOptions.height](/reference/core/TypeAlias.ExtrusionOptions#height) の詳細な指定。
高さは `heightScale` を指定すれば「値 × `heightScale`」、指定しなければ `range` を 0 から `maxHeight` に比例して割り当てる。
値が数値でない地物の高さは 0 にする。

## Properties

### heightScale?

> `optional` **heightScale?**: `number`

値 1 あたりの高さ（メートル）。データの範囲によらず高さが決まるので、複数の地図で同じ値を同じ高さにして比べられる。
「値 × `heightScale`」が負になる地物の高さは 0 にする。

***

### maxHeight?

> `optional` **maxHeight?**: `number`

`range` の最大値に割り当てる高さ（メートル）。`heightScale` を指定したときは使わない。

#### Default Value

`3000`

***

### property

> **property**: `string`

高さに使うプロパティ名。

***

### range?

> `optional` **range?**: \[`number`, `number`\]

高さ 0 から `maxHeight` に割り当てる値の範囲 `[最小, 最大]`。
省略したとき、または最小が最大以上のときは、データの最小値が 0 以上なら `[0, 最大値]`、負なら `[最小値, 最大値]` を使う。
