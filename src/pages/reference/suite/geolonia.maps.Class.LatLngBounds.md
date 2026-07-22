---
layout: ../../../layouts/ApiLayout.astro
title: 'Class: LatLngBounds'
page: reference
---

[**@geolonia/maps-suite**](/reference/suite/)

***

[@geolonia/maps-suite](/reference/suite/) / [geolonia](/reference/suite/Namespace.geolonia) / [maps](/reference/suite/geolonia.Namespace.maps) / LatLngBounds

# Class: LatLngBounds

南西（左下）の隅と北東（右上）の隅によって定義される、地理座標上の矩形です。

より多くの点を含むように矩形を拡張するには [LatLngBounds.extend](#extend) を使用します
（例えば、複数のマーカーを枠内に収める場合など）。

## Example

```typescript
const bounds = new geolonia.maps.LatLngBounds();
bounds.extend({ lat: 35.6812, lng: 139.7671 });
bounds.extend({ lat: 34.6937, lng: 135.5023 });
map.fitBounds(bounds);
```

## Constructors

### Constructor

> **new LatLngBounds**(`sw?`, `ne?`): `LatLngBounds`

矩形領域（地理的な範囲）を作成します。

引数なしで呼び出すと、後から [LatLngBounds.extend](#extend) で拡張できる空の
矩形領域を生成します。

#### Parameters

##### sw?

[`LatLngLiteral`](/reference/suite/geolonia.maps.Interface.LatLngLiteral) \| [`LatLng`](/reference/suite/geolonia.maps.Class.LatLng)

南西（左下）の隅。

##### ne?

[`LatLngLiteral`](/reference/suite/geolonia.maps.Interface.LatLngLiteral) \| [`LatLng`](/reference/suite/geolonia.maps.Class.LatLng)

北東（右上）の隅。

#### Returns

`LatLngBounds`

## Methods

### contains()

> **contains**(`latLng`): `boolean`

指定した点がこの矩形の内部にある場合に `true` を返します。

#### Parameters

##### latLng

[`LatLngLiteralOrLatLng`](/reference/suite/geolonia.maps.TypeAlias.LatLngLiteralOrLatLng)

判定対象の点。

#### Returns

`boolean`

***

### equals()

> **equals**(`other`): `boolean`

`other` がまったく同じ範囲をカバーする場合に `true` を返します。

#### Parameters

##### other

`LatLngBounds` \| `null`

比較対象の矩形領域（地理的な範囲）、または `null`。

#### Returns

`boolean`

***

### extend()

> **extend**(`point`): `LatLngBounds`

必要に応じて矩形を拡張し、指定した点を含むようにします。メソッドチェーンが
できるように、この同じインスタンスを返します。

#### Parameters

##### point

[`LatLngLiteralOrLatLng`](/reference/suite/geolonia.maps.TypeAlias.LatLngLiteralOrLatLng)

含める点。

#### Returns

`LatLngBounds`

***

### getCenter()

> **getCenter**(): [`LatLng`](/reference/suite/geolonia.maps.Class.LatLng)

矩形の中心にある点を返します。

#### Returns

[`LatLng`](/reference/suite/geolonia.maps.Class.LatLng)

***

### getNorthEast()

> **getNorthEast**(): [`LatLng`](/reference/suite/geolonia.maps.Class.LatLng)

北東（右上）の隅を返します。

#### Returns

[`LatLng`](/reference/suite/geolonia.maps.Class.LatLng)

***

### getSouthWest()

> **getSouthWest**(): [`LatLng`](/reference/suite/geolonia.maps.Class.LatLng)

南西（左下）の隅を返します。

#### Returns

[`LatLng`](/reference/suite/geolonia.maps.Class.LatLng)

***

### isEmpty()

> **isEmpty**(): `boolean`

矩形に面積がない場合に `true` を返します（例えば、作成直後でまだ一度も
拡張されていない矩形領域など）。

#### Returns

`boolean`

***

### toJSON()

> **toJSON**(): [`LatLngBoundsLiteral`](/reference/suite/geolonia.maps.Interface.LatLngBoundsLiteral)

これらの矩形領域（地理的な範囲）のプレーンな [LatLngBoundsLiteral](/reference/suite/geolonia.maps.Interface.LatLngBoundsLiteral)
コピーを返します。`JSON.stringify` に適しています。

#### Returns

[`LatLngBoundsLiteral`](/reference/suite/geolonia.maps.Interface.LatLngBoundsLiteral)

***

### toString()

> **toString**(): `string`

`"((sw_lat, sw_lng), (ne_lat, ne_lng))"` の形式に整形した矩形領域
（地理的な範囲）を返します。

#### Returns

`string`
