---
layout: ../../../layouts/ApiLayout.astro
title: 'Class: DataFeature'
page: reference
---

[**@geolonia/maps-suite**](/reference/suite/geolonia.Namespace.maps)

***

[@geolonia/maps-suite](/reference/suite/geolonia.Namespace.maps) / [geolonia](/reference/suite/geolonia.Namespace.maps) / [maps](/reference/suite/geolonia.Namespace.maps) / DataFeature

# Class: DataFeature

[Data](/reference/suite/geolonia.maps.Class.Data) が保持する 1 件の地物です。

一般的な地図 SDK の Data レイヤーにおける Feature に相当します。
ジオメトリと属性を保持し、[Data.setStyle](/reference/suite/geolonia.maps.Class.Data#setstyle) に渡すスタイル関数の引数になります。

## Example

```typescript
const feature = new geolonia.maps.DataFeature({
  id: "tokyo-station",
  geometry: { type: "Point", coordinates: [139.767125, 35.681236] },
  properties: { name: "東京駅" },
});
feature.getProperty("name"); // "東京駅"
```

## Constructors

### Constructor

> **new DataFeature**(`options?`): `DataFeature`

地物を作成します。

#### Parameters

##### options?

[`DataFeatureOptions`](/reference/suite/geolonia.maps.Interface.DataFeatureOptions)

識別子、ジオメトリ、属性です。

#### Returns

`DataFeature`

## Methods

### forEachProperty()

> **forEachProperty**(`callback`): `void`

すべての属性を走査します。

#### Parameters

##### callback

(`value`, `name`) => `void`

値と属性名を受け取るコールバックです。

#### Returns

`void`

***

### getGeometry()

> **getGeometry**(): `Geometry` \| `null`

地物のジオメトリを返します。設定されていない場合は `null` を返します。

#### Returns

`Geometry` \| `null`

***

### getId()

> **getId**(): `string` \| `number` \| `undefined`

地物の識別子を返します。指定されていない場合は `undefined` を返します。

#### Returns

`string` \| `number` \| `undefined`

***

### getProperty()

> **getProperty**(`name`): `unknown`

属性の値を返します。

#### Parameters

##### name

`string`

属性名です。

#### Returns

`unknown`

***

### removeProperty()

> **removeProperty**(`name`): `void`

属性を削除します。

#### Parameters

##### name

`string`

属性名です。

#### Returns

`void`

***

### setGeometry()

> **setGeometry**(`geometry`): `void`

地物のジオメトリを差し替えます。

#### Parameters

##### geometry

`Geometry` \| `null`

新しいジオメトリです。

#### Returns

`void`

***

### setProperty()

> **setProperty**(`name`, `value`): `void`

属性を設定します。

#### Parameters

##### name

`string`

属性名です。

##### value

`unknown`

設定する値です。

#### Returns

`void`

***

### toGeoJson()

> **toGeoJson**(): `Feature`

この地物を GeoJSON の Feature として返します。
スタイル用の内部プロパティは含まれません。

#### Returns

`Feature`
