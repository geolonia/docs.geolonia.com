---
layout: ../../../layouts/ApiLayout.astro
title: 'Class: Polyline'
page: reference
---

[**@geolonia/maps-suite**](/reference/suite/)

***

[@geolonia/maps-suite](/reference/suite/) / [geolonia](/reference/suite/Namespace.geolonia) / [maps](/reference/suite/geolonia.Namespace.maps) / Polyline

# Class: Polyline

地図上に描画される連続した線分（折れ線）です。

一般的な地図 SDK の折れ線（Polyline）コンポーネントに相当します。ルート、経路、
距離線などを表示するのに使用します。

パスは [MVCArray](/reference/suite/geolonia.maps.Class.MVCArray)`<`[LatLng](/reference/suite/geolonia.maps.Class.LatLng)`>` として管理されるため、
`polyline.getPath().push(...)` や `setAt` などの変異操作を行うと
折れ線は自動的に再描画されます。

## Example

```typescript
const polyline = new geolonia.maps.Polyline({
  path: [
    { lat: 35.6812, lng: 139.7671 },
    { lat: 35.6895, lng: 139.6917 },
  ],
  map,
  strokeColor: "#ff0000",
  strokeOpacity: 0.8,
  strokeWeight: 4,
});

// パスを直接変異させると自動再描画される
polyline.getPath().push(new geolonia.maps.LatLng(35.658, 139.7016));
```

## Extends

- [`MVCObject`](/reference/suite/geolonia.maps.Class.MVCObject)

## Constructors

### Constructor

> **new Polyline**(`options?`): `Polyline`

折れ線を作成します。

#### Parameters

##### options?

[`PolylineOptions`](/reference/suite/geolonia.maps.Interface.PolylineOptions)

初期のパス、地図、描画スタイルです。`path` と `map`
  の両方が指定された場合、折れ線はすぐに表示されます。

#### Returns

`Polyline`

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

この折れ線が追加されている地図を返します。取り外された状態の場合は `null` を返します。

#### Returns

[`Map`](/reference/suite/geolonia.maps.Class.Map) \| `null`

***

### getPath()

> **getPath**(): [`MVCArray`](/reference/suite/geolonia.maps.Class.MVCArray)\<[`LatLng`](/reference/suite/geolonia.maps.Class.LatLng)\>

折れ線を構成する頂点座標の [MVCArray](/reference/suite/geolonia.maps.Class.MVCArray) を返します。

返される [MVCArray](/reference/suite/geolonia.maps.Class.MVCArray) を直接変異させる（`push` / `setAt` / `removeAt` など）と、
折れ線は自動的に再描画されます。

#### Returns

[`MVCArray`](/reference/suite/geolonia.maps.Class.MVCArray)\<[`LatLng`](/reference/suite/geolonia.maps.Class.LatLng)\>

***

### getVisible()

> **getVisible**(): `boolean`

折れ線の可視性を返します。

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

折れ線を地図に追加します。`null` を渡すと、現在の地図から取り外します。

#### Parameters

##### map

[`Map`](/reference/suite/geolonia.maps.Class.Map) \| `null`

折れ線を描画する地図、または取り外す場合は `null` です。

#### Returns

`void`

***

### setOptions()

> **setOptions**(`options`): `void`

複数のオプションをまとめて更新します。

#### Parameters

##### options

[`PolylineOptions`](/reference/suite/geolonia.maps.Interface.PolylineOptions)

更新するオプションです。指定されていないものは変更されません。

#### Returns

`void`

***

### setPath()

> **setPath**(`path`): `void`

折れ線のパスを新しいものへ差し替えます。

#### Parameters

##### path

[`MVCArray`](/reference/suite/geolonia.maps.Class.MVCArray)\<[`LatLng`](/reference/suite/geolonia.maps.Class.LatLng)\> \| [`LatLngLiteralOrLatLng`](/reference/suite/geolonia.maps.TypeAlias.LatLngLiteralOrLatLng)[]

新しいパスです。[MVCArray](/reference/suite/geolonia.maps.Class.MVCArray) または配列を受け付けます。
  配列を渡した場合は内部で [MVCArray](/reference/suite/geolonia.maps.Class.MVCArray) に変換されます。

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

折れ線の可視性を設定します。

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
