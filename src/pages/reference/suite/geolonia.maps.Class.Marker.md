---
layout: ../../../layouts/ApiLayout.astro
title: 'Class: Marker'
page: reference
---

[**@geolonia/maps-suite**](/reference/suite/geolonia.Namespace.maps)

***

[@geolonia/maps-suite](/reference/suite/geolonia.Namespace.maps) / [geolonia](/reference/suite/geolonia.Namespace.maps) / [maps](/reference/suite/geolonia.Namespace.maps) / Marker

# Class: Marker

地図上に配置される点マーカーです。

[position](/reference/suite/geolonia.maps.Interface.MarkerOptions#position) と [map](/reference/suite/geolonia.maps.Interface.MarkerOptions#map)
を指定して作成するとすぐに表示します。または取り外した状態で作成し、後から
[setMap](#setmap) で追加することもできます。マーカーは
`"click"` イベントを発火します。

任意の HTML コンテンツを持つマーカーには、代わりに
[AdvancedMarkerElement](/reference/suite/geolonia.maps.Class.AdvancedMarkerElement) を使用してください。

## Example

```typescript
const marker = new geolonia.maps.Marker({
  position: { lat: 35.6812, lng: 139.7671 },
  map,
  title: "Tokyo Station",
});

marker.addListener("click", () => console.log("clicked!"));
```

## Extends

- [`MVCObject`](/reference/suite/geolonia.maps.Class.MVCObject)

## Constructors

### Constructor

> **new Marker**(`options?`): `Marker`

マーカーを作成します。

#### Parameters

##### options?

[`MarkerOptions`](/reference/suite/geolonia.maps.Interface.MarkerOptions)

初期の位置、地図、ツールチップ、アイコンです。`position` と
  `map` の両方が指定された場合、マーカーはすぐに表示されます。

#### Returns

`Marker`

#### Overrides

[`MVCObject`](/reference/suite/geolonia.maps.Class.MVCObject).[`constructor`](/reference/suite/geolonia.maps.Class.MVCObject#constructor)

## Methods

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

### getIcon()

> **getIcon**(): [`MarkerIcon`](/reference/suite/geolonia.maps.TypeAlias.MarkerIcon) \| `null`

マーカーのカスタムアイコンを返します。デフォルトを使用している場合は `null` を返します。

#### Returns

[`MarkerIcon`](/reference/suite/geolonia.maps.TypeAlias.MarkerIcon) \| `null`

***

### getMap()

> **getMap**(): [`Map`](/reference/suite/geolonia.maps.Class.Map) \| `null`

このマーカーが追加されている地図を返します。取り外された状態の場合は `null` を返します。

#### Returns

[`Map`](/reference/suite/geolonia.maps.Class.Map) \| `null`

***

### getMapLibreMarker()

> **getMapLibreMarker**(): `Marker` \| `null`

基盤となる MapLibre GL JS の `Marker` インスタンスを返します。

SDK がカバーしていないマーカーの機能に直接アクセスする場合に使用します。
マーカーが地図に追加される前は `null` を返します。

#### Returns

`Marker` \| `null`

***

### getPosition()

> **getPosition**(): [`LatLng`](/reference/suite/geolonia.maps.Class.LatLng) \| `null`

マーカーの位置を返します。位置がない場合は `null` を返します。

#### Returns

[`LatLng`](/reference/suite/geolonia.maps.Class.LatLng) \| `null`

***

### getTitle()

> **getTitle**(): `string`

マーカーのツールチップのテキストを返します。

#### Returns

`string`

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

### setIcon()

> **setIcon**(`icon`): `void`

カスタムアイコンを設定します。画像 URL (`{ url }`)、ベクター記号 ([Symbol](/reference/suite/geolonia.maps.Interface.Symbol))、
または `null`（デフォルトに戻す）を渡します。

#### Parameters

##### icon

[`MarkerIcon`](/reference/suite/geolonia.maps.TypeAlias.MarkerIcon) \| `null`

アイコン定義、または `null` です。

#### Returns

`void`

***

### setMap()

> **setMap**(`map`): `void`

マーカーを地図に追加します。`null` を渡すと、現在の地図から取り外します。

#### Parameters

##### map

[`Map`](/reference/suite/geolonia.maps.Class.Map) \| `null`

マーカーを表示する地図、または取り外す場合は `null` です。

#### Returns

`void`

***

### setPosition()

> **setPosition**(`latLng`): `void`

マーカーを新しい位置へ移動します。`null` を渡すと位置をクリアします。

#### Parameters

##### latLng

[`LatLngLiteralOrLatLng`](/reference/suite/geolonia.maps.TypeAlias.LatLngLiteralOrLatLng) \| `null`

新しい位置です。

#### Returns

`void`

***

### setTitle()

> **setTitle**(`title`): `void`

マーカーのツールチップのテキストを設定します。ホバー時に表示されます。

#### Parameters

##### title

`string`

ツールチップのテキストです。

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
