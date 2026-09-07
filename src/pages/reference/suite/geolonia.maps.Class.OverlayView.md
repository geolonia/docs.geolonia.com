---
layout: ../../../layouts/ApiLayout.astro
title: 'Class: OverlayView'
page: reference
---

[**@geolonia/maps-suite**](/reference/suite/)

***

[@geolonia/maps-suite](/reference/suite/) / [geolonia](/reference/suite/Namespace.geolonia) / [maps](/reference/suite/geolonia.Namespace.maps) / OverlayView

# Class: OverlayView

地図に紐付いたカスタムオーバーレイを構築するための基底クラス。

このクラスをサブクラス化して 3 つのライフサイクルメソッド
[onAdd](#onadd)、[draw](#draw)、
[onRemove](#onremove) をオーバーライドし、
[setMap](#setmap) を呼び出して追加します。
[getPanes](#getpanes) で描画先のコンテナを取得し、
[getProjection](#getprojection) で要素を配置します。
`draw` は地図が移動するたびに再度呼ばれます。

## Example

```typescript
class LabelOverlay extends geolonia.maps.OverlayView {
  private el = document.createElement("div");

  onAdd() {
    this.getPanes()?.overlayLayer.appendChild(this.el);
  }
  draw() {
    const p = this.getProjection().fromLatLngToDivPixel({ lat: 35.68, lng: 139.76 });
    if (p) { this.el.style.transform = `translate(${p.x}px, ${p.y}px)`; }
  }
  onRemove() {
    this.el.remove();
  }
}

new LabelOverlay().setMap(map);
```

## Extends

- [`MVCObject`](/reference/suite/geolonia.maps.Class.MVCObject)

## Constructors

### Constructor

> **new OverlayView**(): `OverlayView`

#### Returns

`OverlayView`

#### Inherited from

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

### draw()

> **draw**(): `void`

オーバーレイの要素を配置するためにオーバーライドします。
[onAdd](#onadd) の後、および地図が移動するたびに呼ばれます。

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

### getMap()

> **getMap**(): [`Map`](/reference/suite/geolonia.maps.Class.Map) \| `null`

このオーバーレイが紐付いている地図を返します。紐付いていない場合は `null` を返します。

#### Returns

[`Map`](/reference/suite/geolonia.maps.Class.Map) \| `null`

***

### getPanes()

> **getPanes**(): [`MapPanes`](/reference/suite/geolonia.maps.Interface.MapPanes) \| `null`

オーバーレイの要素を追加する [MapPanes](/reference/suite/geolonia.maps.Interface.MapPanes) を返します。オーバーレイが
まだ地図に追加されていない場合は `null` を返します。

#### Returns

[`MapPanes`](/reference/suite/geolonia.maps.Interface.MapPanes) \| `null`

***

### getProjection()

> **getProjection**(): [`MapCanvasProjection`](/reference/suite/geolonia.maps.Class.MapCanvasProjection)

オーバーレイの要素を配置するための [MapCanvasProjection](/reference/suite/geolonia.maps.Class.MapCanvasProjection) を返します。
[draw](#draw) の中で利用すると最も便利です。

#### Returns

[`MapCanvasProjection`](/reference/suite/geolonia.maps.Class.MapCanvasProjection)

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

### onAdd()

> **onAdd**(): `void`

オーバーレイの DOM 要素を作成し、ペインに追加するためにオーバーライドします。
オーバーレイが地図に追加され、地図の準備が整った後に一度だけ呼ばれます。

#### Returns

`void`

***

### onRemove()

> **onRemove**(): `void`

オーバーレイの要素を削除し、リソースを解放するためにオーバーライドします。
オーバーレイが地図から削除されたときに呼ばれます。

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

オーバーレイを地図に追加します。`null` を渡すと削除します。追加すると
[onAdd](#onadd)、続いて [draw](#draw) が
実行されます。削除すると [onRemove](#onremove) が実行されます。

#### Parameters

##### map

[`Map`](/reference/suite/geolonia.maps.Class.Map) \| `null`

オーバーレイを追加する地図。削除する場合は `null`。

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
