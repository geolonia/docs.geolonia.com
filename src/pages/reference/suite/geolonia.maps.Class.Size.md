---
layout: ../../../layouts/ApiLayout.astro
title: 'Class: Size'
page: reference
---

[**@geolonia/maps-suite**](/reference/suite/geolonia.Namespace.maps)

***

[@geolonia/maps-suite](/reference/suite/geolonia.Namespace.maps) / [geolonia](/reference/suite/geolonia.Namespace.maps) / [maps](/reference/suite/geolonia.Namespace.maps) / Size

# Class: Size

幅と高さで表現される 2 次元のサイズです。

アイコンやポップアップなど、ピクセル単位の寸法を指定する際に使用します。

## Example

```typescript
const size = new geolonia.maps.Size(32, 32);
size.width;  // 32
size.height; // 32
```

## Constructors

### Constructor

> **new Size**(`width`, `height`): `Size`

2 次元のサイズを作成します。

#### Parameters

##### width

`number`

横幅。

##### height

`number`

縦幅。

#### Returns

`Size`

## Properties

### height

> `readonly` **height**: `number`

縦幅です。

***

### width

> `readonly` **width**: `number`

横幅です。

## Methods

### equals()

> **equals**(`other`): `boolean`

`other` が同じ幅と高さを持つ場合に `true` を返します。

#### Parameters

##### other

`Size` \| `null`

比較対象のサイズ、または `null`。

#### Returns

`boolean`

***

### toString()

> **toString**(): `string`

`"(width x height)"` の形式に整形したサイズを返します。

#### Returns

`string`
