---
layout: ../../../layouts/ApiLayout.astro
title: 'Class: Polygon'
page: reference
---

[**@geolonia/maps-suite**](/reference/suite/)

***

[@geolonia/maps-suite](/reference/suite/) / [geolonia](/reference/suite/Namespace.geolonia) / [maps](/reference/suite/geolonia.Namespace.maps) / Polygon

# Class: Polygon

地図上に描画される閉じたポリゴンです。

一般的な地図 SDK のポリゴン（Polygon）コンポーネントに相当します。エリア表示、ジオフェンス、
塗り潰し領域などを表現するのに使用します。最初のリングが外周、それ以降の
リングは内側の穴 (holes) として描画されます。

パスは [MVCArray](/reference/suite/geolonia.maps.Class.MVCArray)`<`[MVCArray](/reference/suite/geolonia.maps.Class.MVCArray)`<`[LatLng](/reference/suite/geolonia.maps.Class.LatLng)`>>` として
管理されるため、`polygon.getPath().push(...)` や外側の MVCArray への
`insertAt` などの変異操作を行うとポリゴンは自動的に再描画されます。

## Example

```typescript
const polygon = new geolonia.maps.Polygon({
  paths: [
    { lat: 35.7, lng: 139.7 },
    { lat: 35.7, lng: 139.8 },
    { lat: 35.6, lng: 139.8 },
    { lat: 35.6, lng: 139.7 },
  ],
  map,
  strokeColor: "#ff0000",
  strokeWeight: 2,
  fillColor: "#ff0000",
  fillOpacity: 0.35,
});

// 穴あきポリゴン
const donut = new geolonia.maps.Polygon({
  paths: [
    [outerA, outerB, outerC, outerD],  // 外周
    [innerA, innerB, innerC, innerD],  // 穴
  ],
  map,
});
```

## Extends

- [`MVCObject`](/reference/suite/geolonia.maps.Class.MVCObject)

## Constructors

### Constructor

> **new Polygon**(`options?`): `Polygon`

ポリゴンを作成します。

#### Parameters

##### options?

[`PolygonOptions`](/reference/suite/geolonia.maps.Interface.PolygonOptions)

初期のパス、地図、描画スタイルです。`paths` と `map`
  の両方が指定された場合、ポリゴンはすぐに表示されます。

#### Returns

`Polygon`

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

### getMap()

> **getMap**(): [`Map`](/reference/suite/geolonia.maps.Class.Map) \| `null`

このポリゴンが追加されている地図を返します。取り外された状態の場合は `null` を返します。

#### Returns

[`Map`](/reference/suite/geolonia.maps.Class.Map) \| `null`

***

### getPath()

> **getPath**(): [`MVCArray`](/reference/suite/geolonia.maps.Class.MVCArray)\<[`LatLng`](/reference/suite/geolonia.maps.Class.LatLng)\>

ポリゴンの最初の輪郭 (外周) を返します。

返される [MVCArray](/reference/suite/geolonia.maps.Class.MVCArray) を直接変異させると、ポリゴンは自動的に再描画されます。
リングが 1 つも無い場合は空の [MVCArray](/reference/suite/geolonia.maps.Class.MVCArray) を返します。

#### Returns

[`MVCArray`](/reference/suite/geolonia.maps.Class.MVCArray)\<[`LatLng`](/reference/suite/geolonia.maps.Class.LatLng)\>

***

### getPaths()

> **getPaths**(): [`MVCArray`](/reference/suite/geolonia.maps.Class.MVCArray)\<[`MVCArray`](/reference/suite/geolonia.maps.Class.MVCArray)\<[`LatLng`](/reference/suite/geolonia.maps.Class.LatLng)\>\>

すべての輪郭を [MVCArray](/reference/suite/geolonia.maps.Class.MVCArray)`<`[MVCArray](/reference/suite/geolonia.maps.Class.MVCArray)`<`[LatLng](/reference/suite/geolonia.maps.Class.LatLng)`>>` として返します。

返される MVCArray を直接変異させると、ポリゴンは自動的に再描画されます。
最初のリングが外周、それ以降のリングは穴として扱われます。

#### Returns

[`MVCArray`](/reference/suite/geolonia.maps.Class.MVCArray)\<[`MVCArray`](/reference/suite/geolonia.maps.Class.MVCArray)\<[`LatLng`](/reference/suite/geolonia.maps.Class.LatLng)\>\>

***

### getVisible()

> **getVisible**(): `boolean`

ポリゴンの可視性を返します。

#### Returns

`boolean`

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

### setMap()

> **setMap**(`map`): `void`

ポリゴンを地図に追加します。`null` を渡すと、現在の地図から取り外します。

#### Parameters

##### map

[`Map`](/reference/suite/geolonia.maps.Class.Map) \| `null`

ポリゴンを描画する地図、または取り外す場合は `null` です。

#### Returns

`void`

***

### setOptions()

> **setOptions**(`options`): `void`

複数のオプションをまとめて更新します。

#### Parameters

##### options

[`PolygonOptions`](/reference/suite/geolonia.maps.Interface.PolygonOptions)

更新するオプションです。指定されていないものは変更されません。

#### Returns

`void`

***

### setPath()

> **setPath**(`path`): `void`

単一の輪郭でパスを差し替えます。

#### Parameters

##### path

[`MVCArray`](/reference/suite/geolonia.maps.Class.MVCArray)\<[`LatLng`](/reference/suite/geolonia.maps.Class.LatLng)\> \| [`LatLngLiteralOrLatLng`](/reference/suite/geolonia.maps.TypeAlias.LatLngLiteralOrLatLng)[]

新しい輪郭です。[MVCArray](/reference/suite/geolonia.maps.Class.MVCArray) または配列を受け付けます。

#### Returns

`void`

***

### setPaths()

> **setPaths**(`paths`): `void`

複数の輪郭でパスを差し替えます。

#### Parameters

##### paths

[`MVCArray`](/reference/suite/geolonia.maps.Class.MVCArray)\<[`LatLng`](/reference/suite/geolonia.maps.Class.LatLng)\> \| [`MVCArray`](/reference/suite/geolonia.maps.Class.MVCArray)\<[`MVCArray`](/reference/suite/geolonia.maps.Class.MVCArray)\<[`LatLng`](/reference/suite/geolonia.maps.Class.LatLng)\>\> \| [`LatLngLiteralOrLatLng`](/reference/suite/geolonia.maps.TypeAlias.LatLngLiteralOrLatLng)[] \| [`LatLngLiteralOrLatLng`](/reference/suite/geolonia.maps.TypeAlias.LatLngLiteralOrLatLng)[][]

新しいパスです。ネストした [MVCArray](/reference/suite/geolonia.maps.Class.MVCArray) や配列などを受け付けます。

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

### setVisible()

> **setVisible**(`visible`): `void`

ポリゴンの可視性を設定します。

#### Parameters

##### visible

`boolean`

`true` で表示、`false` で非表示になります。

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
