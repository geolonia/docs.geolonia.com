---
layout: ../../../layouts/ApiLayout.astro
title: 'Class: Data'
page: reference
---

[**@geolonia/maps-suite**](/reference/suite/)

***

[@geolonia/maps-suite](/reference/suite/) / [geolonia](/reference/suite/Namespace.geolonia) / [maps](/reference/suite/geolonia.Namespace.maps) / Data

# Class: Data

GeoJSON の地物をまとめて保持し、地図上に描画するレイヤーです。

一般的な地図 SDK の Data レイヤーに相当します。個別のクラス
（[Marker](/reference/suite/geolonia.maps.Class.Marker) / [Polyline](/reference/suite/geolonia.maps.Class.Polyline) / [Polygon](/reference/suite/geolonia.maps.Class.Polygon)）と異なり、
ジオメトリの型が混在した FeatureCollection をそのまま扱えます。

通常は [Map.data](/reference/suite/geolonia.maps.Class.Map#data) 経由で取得します。

## Example

```typescript
map.data.addGeoJson(featureCollection);

map.data.setStyle((feature) => ({
  fillColor: feature.getProperty("category") === "park" ? "#00ff00" : "#888888",
  strokeWeight: 2,
}));
```

## Extends

- [`MVCObject`](/reference/suite/geolonia.maps.Class.MVCObject)

## Constructors

### Constructor

> **new Data**(`options?`): `Data`

データレイヤーを作成します。

#### Parameters

##### options?

[`DataOptions`](/reference/suite/geolonia.maps.Interface.DataOptions)

描画先の地図と初期スタイルです。

#### Returns

`Data`

#### Overrides

[`MVCObject`](/reference/suite/geolonia.maps.Class.MVCObject).[`constructor`](/reference/suite/geolonia.maps.Class.MVCObject#constructor)

## Methods

### add()

> **add**(`feature`): [`DataFeature`](/reference/suite/geolonia.maps.Class.DataFeature)

地物を 1 件追加します。

#### Parameters

##### feature

[`DataFeatureOptions`](/reference/suite/geolonia.maps.Interface.DataFeatureOptions) \| [`DataFeature`](/reference/suite/geolonia.maps.Class.DataFeature)

[DataFeature](/reference/suite/geolonia.maps.Class.DataFeature) または [DataFeatureOptions](/reference/suite/geolonia.maps.Interface.DataFeatureOptions) です。

#### Returns

[`DataFeature`](/reference/suite/geolonia.maps.Class.DataFeature)

追加された [DataFeature](/reference/suite/geolonia.maps.Class.DataFeature) を返します。

***

### addGeoJson()

> **addGeoJson**(`geojson`): [`DataFeature`](/reference/suite/geolonia.maps.Class.DataFeature)[]

GeoJSON を読み込んで地物を追加します。

#### Parameters

##### geojson

`Feature`\<`Geometry`, `GeoJsonProperties`\> \| `FeatureCollection`\<`Geometry`, `GeoJsonProperties`\>

FeatureCollection または Feature です。

#### Returns

[`DataFeature`](/reference/suite/geolonia.maps.Class.DataFeature)[]

追加された [DataFeature](/reference/suite/geolonia.maps.Class.DataFeature) の配列を返します。

#### Throws

FeatureCollection でも Feature でもない場合に `TypeError` を投げます。

***

### addListener()

> **addListener**(`eventName`, `handler`): [`MapsEventListener`](/reference/suite/geolonia.maps.TypeAlias.MapsEventListener)

指定した名前のイベントが発火するたびに実行されるハンドラを登録します。

#### Parameters

##### eventName

`string`

監視するイベント。`"click"` や `"{property}_changed"`
  イベントなどです。

##### handler

[`EventHandler`](/reference/suite/geolonia.maps.TypeAlias.EventHandler)

イベントが発火するたびに、そのイベントの引数とともに呼び出されます。

#### Returns

[`MapsEventListener`](/reference/suite/geolonia.maps.TypeAlias.MapsEventListener)

[MapsEventListener](/reference/suite/geolonia.maps.TypeAlias.MapsEventListener) ハンドル。登録を解除するには `remove()` を
  呼び出します。

#### Inherited from

[`MVCObject`](/reference/suite/geolonia.maps.Class.MVCObject).[`addListener`](/reference/suite/geolonia.maps.Class.MVCObject#addlistener)

***

### bindTo()

> **bindTo**(`key`, `target`, `targetKey`, `noNotify?`): `void`

このオブジェクトの `key` プロパティを、別のオブジェクトの `targetKey`
プロパティにバインドします。これにより、`key` を読み取ると常にターゲットの値が
反映され、ターゲットが変化するたびに `{key}_changed` イベントが発火します。

#### Parameters

##### key

`string`

このオブジェクト上のプロパティ名。

##### target

[`MVCObject`](/reference/suite/geolonia.maps.Class.MVCObject)

バインド先のオブジェクト。

##### targetKey

`string`

ターゲット上のプロパティ名。

##### noNotify?

`boolean` = `false`

`true` の場合、初回およびそれ以降の `{key}_changed`
  通知を抑制します。

#### Returns

`void`

#### Inherited from

[`MVCObject`](/reference/suite/geolonia.maps.Class.MVCObject).[`bindTo`](/reference/suite/geolonia.maps.Class.MVCObject#bindto)

***

### forEach()

> **forEach**(`callback`): `void`

保持しているすべての地物を走査します。

#### Parameters

##### callback

(`feature`) => `void`

地物を受け取るコールバックです。

#### Returns

`void`

***

### get()

> **get**(`key`): `any`

名前付きプロパティの値を返します。一度も設定されていない場合は `undefined`
を返します。

#### Parameters

##### key

`string`

プロパティ名。

#### Returns

`any`

#### Inherited from

[`MVCObject`](/reference/suite/geolonia.maps.Class.MVCObject).[`get`](/reference/suite/geolonia.maps.Class.MVCObject#get)

***

### getFeatureById()

> **getFeatureById**(`id`): [`DataFeature`](/reference/suite/geolonia.maps.Class.DataFeature) \| `undefined`

識別子から地物を取得します。

#### Parameters

##### id

`string` \| `number`

地物の識別子です。

#### Returns

[`DataFeature`](/reference/suite/geolonia.maps.Class.DataFeature) \| `undefined`

見つからない場合は `undefined` を返します。

***

### getMap()

> **getMap**(): [`Map`](/reference/suite/geolonia.maps.Class.Map) \| `null`

このデータレイヤーが追加されている地図を返します。取り外された状態の場合は `null` を返します。

#### Returns

[`Map`](/reference/suite/geolonia.maps.Class.Map) \| `null`

***

### getStyle()

> **getStyle**(): [`DataStyleOptions`](/reference/suite/geolonia.maps.Interface.DataStyleOptions) \| [`DataStyleFunction`](/reference/suite/geolonia.maps.TypeAlias.DataStyleFunction)

現在設定されているスタイルを返します。

#### Returns

[`DataStyleOptions`](/reference/suite/geolonia.maps.Interface.DataStyleOptions) \| [`DataStyleFunction`](/reference/suite/geolonia.maps.TypeAlias.DataStyleFunction)

***

### notify()

> **notify**(`key`): `void`

プロパティの `{key}_changed` イベントを手動で発火し、そのすべてのリスナーに
通知します。値が [set](/reference/suite/geolonia.maps.Class.MVCObject#set) で再代入されるのではなく、その場で
変更された場合に役立ちます。

#### Parameters

##### key

`string`

プロパティ名。

#### Returns

`void`

#### Inherited from

[`MVCObject`](/reference/suite/geolonia.maps.Class.MVCObject).[`notify`](/reference/suite/geolonia.maps.Class.MVCObject#notify)

***

### remove()

> **remove**(`feature`): `void`

地物を削除します。保持していない地物を渡した場合は何もしません。

#### Parameters

##### feature

[`DataFeature`](/reference/suite/geolonia.maps.Class.DataFeature)

削除する地物です。

#### Returns

`void`

***

### set()

> **set**(`key`, `value`): `void`

名前付きプロパティを設定し、その `{key}_changed` イベントを発火します。
[bindTo](/reference/suite/geolonia.maps.Class.MVCObject#bindto) でバインドされた値を置き換える場合は、
先にバインディングを削除します。

#### Parameters

##### key

`string`

プロパティ名。

##### value

`any`

新しい値。

#### Returns

`void`

#### Inherited from

[`MVCObject`](/reference/suite/geolonia.maps.Class.MVCObject).[`set`](/reference/suite/geolonia.maps.Class.MVCObject#set)

***

### setMap()

> **setMap**(`map`): `void`

データレイヤーを地図に追加します。`null` を渡すと、現在の地図から取り外します。

#### Parameters

##### map

[`Map`](/reference/suite/geolonia.maps.Class.Map) \| `null`

描画先の地図、または取り外す場合は `null` です。

#### Returns

`void`

***

### setStyle()

> **setStyle**(`style`): `void`

描画スタイルを設定します。

#### Parameters

##### style

[`DataStyleOptions`](/reference/suite/geolonia.maps.Interface.DataStyleOptions) \| [`DataStyleFunction`](/reference/suite/geolonia.maps.TypeAlias.DataStyleFunction)

静的なスタイル、または地物ごとにスタイルを返す関数です。

#### Returns

`void`

***

### setValues()

> **setValues**(`values`): `void`

複数の名前付きプロパティを一度に設定し、それぞれについて `{key}_changed`
イベントを発火します。

#### Parameters

##### values

`Record`\<`string`, `any`\>

キーがプロパティ名であるオブジェクト。

#### Returns

`void`

#### Inherited from

[`MVCObject`](/reference/suite/geolonia.maps.Class.MVCObject).[`setValues`](/reference/suite/geolonia.maps.Class.MVCObject#setvalues)

***

### toGeoJson()

> **toGeoJson**(`callback`): `void`

現在保持している地物を GeoJSON の FeatureCollection として取り出します。
スタイル用の内部プロパティは含まれません。

#### Parameters

##### callback

(`geojson`) => `void`

FeatureCollection を受け取るコールバックです。

#### Returns

`void`

***

### unbind()

> **unbind**(`key`): `void`

`key` のバインディングを削除し、最後に同期された値を通常のプロパティとして
保持します。

#### Parameters

##### key

`string`

解放するバインド済みのプロパティ名。

#### Returns

`void`

#### Inherited from

[`MVCObject`](/reference/suite/geolonia.maps.Class.MVCObject).[`unbind`](/reference/suite/geolonia.maps.Class.MVCObject#unbind)

***

### unbindAll()

> **unbindAll**(): `void`

このオブジェクト上のすべてのバインディングを削除します。

#### Returns

`void`

#### Inherited from

[`MVCObject`](/reference/suite/geolonia.maps.Class.MVCObject).[`unbindAll`](/reference/suite/geolonia.maps.Class.MVCObject#unbindall)
