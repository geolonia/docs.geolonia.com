---
layout: ../../../layouts/ApiLayout.astro
title: 'Class: Point'
page: reference
---

[**@geolonia/maps-suite**](/reference/suite/)

***

[@geolonia/maps-suite](/reference/suite/) / [geolonia](/reference/suite/Namespace.geolonia) / [maps](/reference/suite/geolonia.Namespace.maps) / Point

# Class: Point

2次元平面上の点です。

ピクセル座標やアンカー位置の指定など、地理座標ではない座標を扱う際に使用します。

## Example

```typescript
const anchor = new geolonia.maps.Point(16, 32);
anchor.x; // 16
anchor.y; // 32
```

## Constructors

### Constructor

> **new Point**(`x`, `y`): `Point`

2次元の点を作成します。

#### Parameters

##### x

`number`

X 座標。

##### y

`number`

Y 座標。

#### Returns

`Point`

## Properties

### x

> `readonly` **x**: `number`

X 座標です。

***

### y

> `readonly` **y**: `number`

Y 座標です。

## Methods

### equals()

> **equals**(`other`): `boolean`

`other` が同じ X・Y 座標を持つ場合に `true` を返します。

#### Parameters

##### other

`Point` \| `null`

比較対象の点、または `null`。

#### Returns

`boolean`

***

### toString()

> **toString**(): `string`

`"(x, y)"` の形式に整形した点を返します。

#### Returns

`string`
