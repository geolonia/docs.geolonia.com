---
layout: ../../../layouts/ApiLayout.astro
title: 'Class: Rectangle'
page: reference
---

[**@geolonia/maps-suite**](/reference/suite/geolonia.Namespace.maps)

***

[@geolonia/maps-suite](/reference/suite/geolonia.Namespace.maps) / [geolonia](/reference/suite/geolonia.Namespace.maps) / [maps](/reference/suite/geolonia.Namespace.maps) / Rectangle

# Class: Rectangle

地図上に描画される軸並行の矩形です。

一般的な地図 SDK の矩形（Rectangle）コンポーネントに相当します。バウンディングボックス
表示、範囲選択 UI、地理的な範囲のハイライトなどに使用します。

内部的には [Polygon](/reference/suite/geolonia.maps.Class.Polygon) と同様に MapLibre の GeoJSON fill/line
ソース・レイヤーを利用し、`bounds` の 4 隅から矩形の頂点を導出します。

## Example

```typescript
const rectangle = new geolonia.maps.Rectangle({
  bounds: {
    north: 35.7,
    south: 35.6,
    east: 139.8,
    west: 139.7,
  },
  map,
  strokeColor: "#ff0000",
  strokeWeight: 2,
  fillColor: "#ff0000",
  fillOpacity: 0.35,
});

rectangle.setBounds({
  north: 36.0, south: 35.0, east: 140.0, west: 139.0,
});
```

## Extends

- [`MVCObject`](/reference/suite/geolonia.maps.Class.MVCObject)

## Constructors

### Constructor

> **new Rectangle**(`options?`): `Rectangle`

矩形を作成します。

#### Parameters

##### options?

[`RectangleOptions`](/reference/suite/geolonia.maps.Interface.RectangleOptions)

初期の範囲、地図、描画スタイルです。`bounds` と `map`
  の両方が指定された場合、矩形はすぐに表示されます。

#### Returns

`Rectangle`

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

### getBounds()

> **getBounds**(): [`LatLngBounds`](/reference/suite/geolonia.maps.Class.LatLngBounds) \| `null`

矩形の地理的範囲を返します。範囲が設定されていない場合は `null` を返します。

#### Returns

[`LatLngBounds`](/reference/suite/geolonia.maps.Class.LatLngBounds) \| `null`

***

### getMap()

> **getMap**(): [`Map`](/reference/suite/geolonia.maps.Class.Map) \| `null`

この矩形が追加されている地図を返します。取り外された状態の場合は `null` を返します。

#### Returns

[`Map`](/reference/suite/geolonia.maps.Class.Map) \| `null`

***

### getVisible()

> **getVisible**(): `boolean`

矩形の可視性を返します。

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

### setBounds()

> **setBounds**(`bounds`): `void`

矩形の地理的範囲を設定します。

#### Parameters

##### bounds

[`LatLngBoundsLiteralOrLatLngBounds`](/reference/suite/geolonia.maps.TypeAlias.LatLngBoundsLiteralOrLatLngBounds)

新しい範囲です。[LatLngBounds](/reference/suite/geolonia.maps.Class.LatLngBounds) または [LatLngBoundsLiteral](/reference/suite/geolonia.maps.Interface.LatLngBoundsLiteral) を受け付けます。

#### Returns

`void`

***

### setMap()

> **setMap**(`map`): `void`

矩形を地図に追加します。`null` を渡すと、現在の地図から取り外します。

#### Parameters

##### map

[`Map`](/reference/suite/geolonia.maps.Class.Map) \| `null`

矩形を描画する地図、または取り外す場合は `null` です。

#### Returns

`void`

***

### setOptions()

> **setOptions**(`options`): `void`

複数のオプションをまとめて更新します。

#### Parameters

##### options

[`RectangleOptions`](/reference/suite/geolonia.maps.Interface.RectangleOptions)

更新するオプションです。指定されていないものは変更されません。

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

矩形の可視性を設定します。

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
