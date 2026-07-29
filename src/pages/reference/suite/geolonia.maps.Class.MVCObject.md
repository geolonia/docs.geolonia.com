---
layout: ../../../layouts/ApiLayout.astro
title: 'Class: MVCObject'
page: reference
---

[**@geolonia/maps-suite**](/reference/suite/)

***

[@geolonia/maps-suite](/reference/suite/) / [geolonia](/reference/suite/Namespace.geolonia) / [maps](/reference/suite/geolonia.Namespace.maps) / MVCObject

# Class: MVCObject

スイート内のすべてのコンポーネント（[Map](/reference/suite/geolonia.maps.Class.Map) や [Marker](/reference/suite/geolonia.maps.Class.Marker) など）の
基底クラスです。

3 つの構成要素を提供します。

- **名前付きプロパティ** — [get](#get) / [set](#set)
  は任意の値を保持し、値が変化すると `{key}_changed` イベントを発火します。
- **イベント** — [addListener](#addlistener) はそれらのイベント
  （および `"click"` などサブクラスが発行する任意のカスタムイベント）に登録します。
- **プロパティバインディング** — [bindTo](#bindto) は一方のオブジェクトの
  プロパティを、もう一方のオブジェクトのプロパティと同期した状態に保ちます。

`MVCObject` を直接インスタンス化することはほとんどありません。これを継承した
コンポーネントを通じて操作します。

## Example

```typescript
marker.addListener("position_changed", () => {
  console.log("moved to", marker.getPosition());
});
```

## Extended by

- [`AdvancedMarkerElement`](/reference/suite/geolonia.maps.Class.AdvancedMarkerElement)
- [`Circle`](/reference/suite/geolonia.maps.Class.Circle)
- [`InfoWindow`](/reference/suite/geolonia.maps.Class.InfoWindow)
- [`Map`](/reference/suite/geolonia.maps.Class.Map)
- [`Marker`](/reference/suite/geolonia.maps.Class.Marker)
- [`MarkerClusterer`](/reference/suite/geolonia.maps.Class.MarkerClusterer)
- [`MVCArray`](/reference/suite/geolonia.maps.Class.MVCArray)
- [`OverlayView`](/reference/suite/geolonia.maps.Class.OverlayView)
- [`Polygon`](/reference/suite/geolonia.maps.Class.Polygon)
- [`Polyline`](/reference/suite/geolonia.maps.Class.Polyline)
- [`Rectangle`](/reference/suite/geolonia.maps.Class.Rectangle)

## Constructors

### Constructor

> **new MVCObject**(): `MVCObject`

#### Returns

`MVCObject`

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

`MVCObject`

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

***

### notify()

> **notify**(`key`): `void`

プロパティの `{key}_changed` イベントを手動で発火し、そのすべてのリスナーに
通知します。値が [set](#set) で再代入されるのではなく、その場で
変更された場合に役立ちます。

#### Parameters

##### key

`string`

プロパティ名。

#### Returns

`void`

***

### set()

> **set**(`key`, `value`): `void`

名前付きプロパティを設定し、その `{key}_changed` イベントを発火します。
[bindTo](#bindto) でバインドされた値を置き換える場合は、
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

***

### unbindAll()

> **unbindAll**(): `void`

このオブジェクト上のすべてのバインディングを削除します。

#### Returns

`void`
