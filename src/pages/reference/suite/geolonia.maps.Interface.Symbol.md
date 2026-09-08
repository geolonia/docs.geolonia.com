---
layout: ../../../layouts/ApiLayout.astro
title: 'Interface: Symbol'
page: reference
---

[**@geolonia/maps-suite**](/reference/suite/geolonia.Namespace.maps)

***

[@geolonia/maps-suite](/reference/suite/geolonia.Namespace.maps) / [geolonia](/reference/suite/geolonia.Namespace.maps) / [maps](/reference/suite/geolonia.Namespace.maps) / Symbol

# Interface: Symbol

ベクター記号によるマーカーアイコンの定義です。
SVG パスまたは定義済みの [SymbolPath](/reference/suite/geolonia.maps.Variable.SymbolPath) を指定し、
色やサイズを設定することで、画像アセット無しでマーカーを描画できます。

## Properties

### fillColor?

> `optional` **fillColor?**: `string`

塗りの色です。CSS カラー文字列で指定します。

***

### fillOpacity?

> `optional` **fillOpacity?**: `number`

塗りの不透明度です（0〜1）。

***

### path

> **path**: `string` \| [`SymbolPath`](/reference/suite/geolonia.maps.TypeAlias.SymbolPath)

記号の形状です。[SymbolPath](/reference/suite/geolonia.maps.Variable.SymbolPath) の値または SVG パス記法の文字列を指定します。

***

### rotation?

> `optional` **rotation?**: `number`

記号の回転角度です（度単位、時計回り）。

***

### scale?

> `optional` **scale?**: `number`

記号のスケールです。パス座標にこの値を乗じてピクセルサイズを決定します。

***

### strokeColor?

> `optional` **strokeColor?**: `string`

線の色です。CSS カラー文字列で指定します。

***

### strokeOpacity?

> `optional` **strokeOpacity?**: `number`

線の不透明度です（0〜1）。

***

### strokeWeight?

> `optional` **strokeWeight?**: `number`

線の太さです（ピクセル単位）。
