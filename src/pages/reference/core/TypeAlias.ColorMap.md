---
layout: ../../../layouts/ApiLayout.astro
title: 'Type Alias: ColorMap'
page: reference
---

[**@geolonia/maps-core**](/reference/core/)

***

[@geolonia/maps-core](/reference/core/) / ColorMap

# Type Alias: ColorMap

> **ColorMap** = `Record`\<`string`, `string`\>

値と色の対応表。キーを値、値を色（CSS カラー文字列）とする。
地物の値は文字列にしてキーと照合する。`{ 1: "#..." }` のような数値のキーは、値 `1` にも `"1"` にも一致する。
対応表に無い値の地物は、地物の simplestyle の色（`circle` は `marker-color`、`choropleth` と `extrusion` は `fill`）、
それも無ければ既定の色で塗る。有効な項目が 1 つも無いときは、すべての地物をこの色で塗る（空の配列が既定の配色になるのとは違う）。
空文字のキーは、値が空文字の地物にだけ一致し、プロパティを持たない地物と値が null の地物には一致しない。
色が空文字の項目と、色が文字列でない項目は無視する。
色の文字列が CSS カラーとして正しいかは検査しない。残った項目の色はすべて式に入るので、解釈できない色が 1 つでもあると、MapLibre が式全体を受け付けない。

## Example

```typescript
{ normal: "#3b82f6", warning: "#eab308", danger: "#ef4444" }
```
