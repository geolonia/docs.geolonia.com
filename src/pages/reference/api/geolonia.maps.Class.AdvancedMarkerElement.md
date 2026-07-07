---
layout: ../../../layouts/ApiLayout.astro
title: 'Class: AdvancedMarkerElement'
page: reference
---

[**@geolonia/maps-suite**](/reference/api/)

***

[@geolonia/maps-suite](/reference/api/) / [geolonia](/reference/api/Namespace.geolonia) / [maps](/reference/api/geolonia.Namespace.maps) / AdvancedMarkerElement

# Class: AdvancedMarkerElement

任意の DOM 要素を見た目として持つマーカーです。

[Marker](/reference/api/geolonia.maps.Class.Marker) の画像アイコンよりもリッチなコンテンツが必要な場合に使用します。
例えば、スタイル付きのラベル、絵文字、任意のカスタム HTML などです。要素は
[content](#content) プロパティを通じていつでも
割り当てまたは置き換えできます。このマーカーは `"click"` イベントを発火します。

## Example

```typescript
const content = document.createElement("div");
content.textContent = "📍";

const marker = new geolonia.maps.AdvancedMarkerElement({
  position: { lat: 35.6812, lng: 139.7671 },
  map,
  content,
});
```

## Extends

- [`MVCObject`](/reference/api/geolonia.maps.Class.MVCObject)

## Constructors

### Constructor

> **new AdvancedMarkerElement**(`options?`): `AdvancedMarkerElement`

高度なマーカーを作成します。

#### Parameters

##### options?

[`AdvancedMarkerElementOptions`](/reference/api/geolonia.maps.Interface.AdvancedMarkerElementOptions)

初期の位置、地図、タイトル、コンテンツ要素です。
  `position` と `map` の両方が指定されている場合、マーカーはすぐに表示されます。

#### Returns

`AdvancedMarkerElement`

#### Overrides

[`MVCObject`](/reference/api/geolonia.maps.Class.MVCObject).[`constructor`](/reference/api/geolonia.maps.Class.MVCObject#constructor)

## Accessors

### content

#### Get Signature

> **get** **content**(): `HTMLElement` \| `null`

マーカーとして描画される DOM 要素です。デフォルトのマーカーの場合は `null` です。

新しい要素を割り当てると、マーカーをその場で再描画します。

##### Returns

`HTMLElement` \| `null`

#### Set Signature

> **set** **content**(`value`): `void`

##### Parameters

###### value

`HTMLElement` \| `null`

##### Returns

`void`

## Methods

### addListener()

> **addListener**(`eventName`, `handler`): [`MapsEventListener`](/reference/api/geolonia.maps.TypeAlias.MapsEventListener)

指定した名前のイベントが発火するたびに実行されるハンドラを登録します。

#### Parameters

##### eventName

`string`

監視するイベント。`"click"` や `"{property}_changed"`
  イベントなどです。

##### handler

[`EventHandler`](/reference/api/geolonia.maps.TypeAlias.EventHandler)

イベントが発火するたびに、そのイベントの引数とともに呼び出されます。

#### Returns

[`MapsEventListener`](/reference/api/geolonia.maps.TypeAlias.MapsEventListener)

[MapsEventListener](/reference/api/geolonia.maps.TypeAlias.MapsEventListener) ハンドル。登録を解除するには `remove()` を
  呼び出します。

#### Inherited from

[`MVCObject`](/reference/api/geolonia.maps.Class.MVCObject).[`addListener`](/reference/api/geolonia.maps.Class.MVCObject#addlistener)

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

[`MVCObject`](/reference/api/geolonia.maps.Class.MVCObject)

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

[`MVCObject`](/reference/api/geolonia.maps.Class.MVCObject).[`bindTo`](/reference/api/geolonia.maps.Class.MVCObject#bindto)

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

[`MVCObject`](/reference/api/geolonia.maps.Class.MVCObject).[`get`](/reference/api/geolonia.maps.Class.MVCObject#get)

***

### getMap()

> **getMap**(): [`Map`](/reference/api/geolonia.maps.Class.Map) \| `null`

このマーカーが追加されている地図を返します。取り外された状態の場合は `null` を返します。

#### Returns

[`Map`](/reference/api/geolonia.maps.Class.Map) \| `null`

***

### getPosition()

> **getPosition**(): [`LatLng`](/reference/api/geolonia.maps.Class.LatLng) \| `null`

マーカーの位置を返します。位置がない場合は `null` を返します。

#### Returns

[`LatLng`](/reference/api/geolonia.maps.Class.LatLng) \| `null`

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
通知します。値が [set](/reference/api/geolonia.maps.Class.MVCObject#set) で再代入されるのではなく、その場で
変更された場合に役立ちます。

#### Parameters

##### key

`string`

プロパティ名。

#### Returns

`void`

#### Inherited from

[`MVCObject`](/reference/api/geolonia.maps.Class.MVCObject).[`notify`](/reference/api/geolonia.maps.Class.MVCObject#notify)

***

### set()

> **set**(`key`, `value`): `void`

名前付きプロパティを設定し、その `{key}_changed` イベントを発火します。
[bindTo](/reference/api/geolonia.maps.Class.MVCObject#bindto) でバインドされた値を置き換える場合は、
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

[`MVCObject`](/reference/api/geolonia.maps.Class.MVCObject).[`set`](/reference/api/geolonia.maps.Class.MVCObject#set)

***

### setMap()

> **setMap**(`map`): `void`

マーカーを地図に追加します。`null` を渡すと、現在の地図から取り外します。

#### Parameters

##### map

[`Map`](/reference/api/geolonia.maps.Class.Map) \| `null`

マーカーを表示する地図です。取り外す場合は `null` を渡します。

#### Returns

`void`

***

### setPosition()

> **setPosition**(`latLng`): `void`

マーカーを新しい位置に移動します。`null` を渡すと位置をクリアします。

#### Parameters

##### latLng

[`LatLngLiteralOrLatLng`](/reference/api/geolonia.maps.TypeAlias.LatLngLiteralOrLatLng) \| `null`

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

[`MVCObject`](/reference/api/geolonia.maps.Class.MVCObject).[`setValues`](/reference/api/geolonia.maps.Class.MVCObject#setvalues)

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

[`MVCObject`](/reference/api/geolonia.maps.Class.MVCObject).[`unbind`](/reference/api/geolonia.maps.Class.MVCObject#unbind)

***

### unbindAll()

> **unbindAll**(): `void`

このオブジェクト上のすべてのバインディングを削除します。

#### Returns

`void`

#### Inherited from

[`MVCObject`](/reference/api/geolonia.maps.Class.MVCObject).[`unbindAll`](/reference/api/geolonia.maps.Class.MVCObject#unbindall)
