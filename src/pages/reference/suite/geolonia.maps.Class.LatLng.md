---
layout: ../../../layouts/ApiLayout.astro
title: 'Class: LatLng'
page: reference
---

[**@geolonia/maps-suite**](/reference/suite/)

***

[@geolonia/maps-suite](/reference/suite/) / [geolonia](/reference/suite/Namespace.geolonia) / [maps](/reference/suite/geolonia.Namespace.maps) / LatLng

# Class: LatLng

地理座標（緯度と経度）上の点です。

一度作成された `LatLng` はイミュータブル（変更不可）です。座標を読み取るには
[LatLng.lat](#lat) および [LatLng.lng](#lng) を使用します。

## Example

```typescript
// どちらの形式も等価です:
const a = new geolonia.maps.LatLng(35.6812, 139.7671);
const b = new geolonia.maps.LatLng({ lat: 35.6812, lng: 139.7671 });

a.lat(); // 35.6812
a.lng(); // 139.7671
```

## Constructors

### Constructor

> **new LatLng**(`lat`, `lng`): `LatLng`

個別の緯度・経度の値から点を作成します。

#### Parameters

##### lat

`number`

緯度（度単位）。

##### lng

`number`

経度（度単位）。

#### Returns

`LatLng`

### Constructor

> **new LatLng**(`latLngLiteral`): `LatLng`

[LatLngLiteral](/reference/suite/geolonia.maps.Interface.LatLngLiteral) オブジェクトから点を作成します。

#### Parameters

##### latLngLiteral

[`LatLngLiteral`](/reference/suite/geolonia.maps.Interface.LatLngLiteral)

`lat` と `lng` プロパティを持つオブジェクト。

#### Returns

`LatLng`

## Methods

### equals()

> **equals**(`other`): `boolean`

`other` が同じ緯度・経度を持つ場合に `true` を返します。

#### Parameters

##### other

`LatLng` \| `null`

比較対象の点、または `null`。

#### Returns

`boolean`

***

### lat()

> **lat**(): `number`

緯度を度単位で返します。

#### Returns

`number`

***

### lng()

> **lng**(): `number`

経度を度単位で返します。

#### Returns

`number`

***

### toJSON()

> **toJSON**(): [`LatLngLiteral`](/reference/suite/geolonia.maps.Interface.LatLngLiteral)

この点のプレーンな [LatLngLiteral](/reference/suite/geolonia.maps.Interface.LatLngLiteral) コピーを返します。`JSON.stringify`
に適しています。

#### Returns

[`LatLngLiteral`](/reference/suite/geolonia.maps.Interface.LatLngLiteral)

***

### toString()

> **toString**(): `string`

`"(lat, lng)"` の形式に整形した点を返します。

#### Returns

`string`
