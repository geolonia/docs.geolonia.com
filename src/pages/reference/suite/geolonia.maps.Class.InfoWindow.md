---
layout: ../../../layouts/ApiLayout.astro
title: 'Class: InfoWindow'
page: reference
---

[**@geolonia/maps-suite**](/reference/suite/geolonia.Namespace.maps)

***

[@geolonia/maps-suite](/reference/suite/geolonia.Namespace.maps) / [geolonia](/reference/suite/geolonia.Namespace.maps) / [maps](/reference/suite/geolonia.Namespace.maps) / InfoWindow

# Class: InfoWindow

地図上の点の上にコンテンツを表示するポップアップウィンドウです。

通常はマーカーのクリックに応じて開かれ、そのマーカーに紐付けて表示されます。
地図の中心に単独で開くこともできます。1 つのインスタンスにつき、最後に開かれた
ポップアップのみが表示されます。[open](#open) を再度呼び出すと、
ポップアップが移動します。ユーザーがウィンドウを閉じると、
`"closeclick"` イベントを発火します。

## Example

```typescript
const infoWindow = new geolonia.maps.InfoWindow({
  content: "<h3>Tokyo Station</h3>",
});

marker.addListener("click", () => {
  infoWindow.open(map, marker);
});
```

## Extends

- [`MVCObject`](/reference/suite/geolonia.maps.Class.MVCObject)

## Constructors

### Constructor

> **new InfoWindow**(`options?`): `InfoWindow`

インフォウィンドウを作成します。

#### Parameters

##### options?

[`InfoWindowOptions`](/reference/suite/geolonia.maps.Interface.InfoWindowOptions)

初期コンテンツです。[open](#open) を呼び出すまで
  ウィンドウは表示されません。

#### Returns

`InfoWindow`

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

### close()

> **close**(): `void`

ウィンドウを閉じ、地図から取り除きます。すでに閉じている場合に呼んでも
安全です。

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

### getContent()

> **getContent**(): `string` \| `HTMLElement`

ウィンドウの現在のコンテンツを返します。

#### Returns

`string` \| `HTMLElement`

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

### open()

> **open**(`map`, `anchor?`): `void`

地図上でウィンドウを開きます。マーカーに紐付けて開いた場合は、そのマーカーの
すぐ上に配置されます。それ以外の場合は地図の中心に開きます。このウィンドウが
すでに開かれている場合は、先に閉じられます。

#### Parameters

##### map

[`Map`](/reference/suite/geolonia.maps.Class.Map)

ウィンドウを開く対象の地図です。

##### anchor?

[`Marker`](/reference/suite/geolonia.maps.Class.Marker)

ウィンドウを紐付ける [Marker](/reference/suite/geolonia.maps.Class.Marker)（省略可能）です。

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

### setContent()

> **setContent**(`content`): `void`

表示するコンテンツを設定します。ウィンドウがすでに開いている場合は、
コンテンツがその場で更新されます。

#### Parameters

##### content

`string` \| `HTMLElement`

HTML 文字列または DOM 要素です。

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
