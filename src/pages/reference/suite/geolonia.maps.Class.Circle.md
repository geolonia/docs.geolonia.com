---
layout: ../../../layouts/ApiLayout.astro
title: 'Class: Circle'
page: reference
---

[**@geolonia/maps-suite**](/reference/suite/geolonia.Namespace.maps)

***

[@geolonia/maps-suite](/reference/suite/geolonia.Namespace.maps) / [geolonia](/reference/suite/geolonia.Namespace.maps) / [maps](/reference/suite/geolonia.Namespace.maps) / Circle

# Class: Circle

地図上に描画される円です。

中心座標と半径（メートル）を指定して円を描画します。内部的には
MapLibre の GeoJSON fill/line ソース・レイヤーを利用し、
Haversine の逆計算で円周上の座標列を近似ポリゴンとして生成します。

## Example

```typescript
const circle = new geolonia.maps.Circle({
  center: { lat: 35.6812, lng: 139.7671 },
  radius: 500,
  map,
  strokeColor: "#ff0000",
  strokeWeight: 2,
  fillColor: "#ff0000",
  fillOpacity: 0.35,
});

circle.setRadius(1000);
```

## Extends

- [`MVCObject`](/reference/suite/geolonia.maps.Class.MVCObject)

## Constructors

### Constructor

> **new Circle**(`options?`): `Circle`

円を作成します。

#### Parameters

##### options?

[`CircleOptions`](/reference/suite/geolonia.maps.Interface.CircleOptions)

初期の中心、半径、地図、描画スタイルです。`center` と `map`
  の両方が指定された場合、円はすぐに表示されます。

#### Returns

`Circle`

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

円のバウンディングボックスを返します。
中心または半径が未設定の場合は `null` を返します。

#### Returns

[`LatLngBounds`](/reference/suite/geolonia.maps.Class.LatLngBounds) \| `null`

***

### getCenter()

> **getCenter**(): [`LatLng`](/reference/suite/geolonia.maps.Class.LatLng) \| `null`

円の中心座標を返します。設定されていない場合は `null` を返します。

#### Returns

[`LatLng`](/reference/suite/geolonia.maps.Class.LatLng) \| `null`

***

### getMap()

> **getMap**(): [`Map`](/reference/suite/geolonia.maps.Class.Map) \| `null`

この円が追加されている地図を返します。取り外された状態の場合は `null` を返します。

#### Returns

[`Map`](/reference/suite/geolonia.maps.Class.Map) \| `null`

***

### getRadius()

> **getRadius**(): `number`

円の半径（メートル）を返します。

#### Returns

`number`

***

### getVisible()

> **getVisible**(): `boolean`

円の可視性を返します。

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

### setCenter()

> **setCenter**(`center`): `void`

円の中心座標を設定します。

#### Parameters

##### center

[`LatLngLiteralOrLatLng`](/reference/suite/geolonia.maps.TypeAlias.LatLngLiteralOrLatLng)

新しい中心座標です。

#### Returns

`void`

***

### setMap()

> **setMap**(`map`): `void`

円を地図に追加します。`null` を渡すと、現在の地図から取り外します。

#### Parameters

##### map

[`Map`](/reference/suite/geolonia.maps.Class.Map) \| `null`

円を描画する地図、または取り外す場合は `null` です。

#### Returns

`void`

***

### setOptions()

> **setOptions**(`options`): `void`

複数のオプションをまとめて更新します。

#### Parameters

##### options

[`CircleOptions`](/reference/suite/geolonia.maps.Interface.CircleOptions)

更新するオプションです。指定されていないものは変更されません。

#### Returns

`void`

***

### setRadius()

> **setRadius**(`radius`): `void`

円の半径（メートル）を設定します。

#### Parameters

##### radius

`number`

新しい半径です。

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

円の可視性を設定します。

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
