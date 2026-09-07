---
layout: ../../../layouts/ApiLayout.astro
title: 'Class: MarkerClusterer'
page: reference
---

[**@geolonia/maps-suite**](/reference/suite/)

***

[@geolonia/maps-suite](/reference/suite/) / [geolonia](/reference/suite/Namespace.geolonia) / [maps](/reference/suite/geolonia.Namespace.maps) / MarkerClusterer

# Class: MarkerClusterer

近接するマーカーをクラスターにまとめ、ズームインに応じて分割されるようにすることで、
マーカーが密集した地図を見やすく保ちます。

管理したいマーカーを（コンストラクターまたは
[addMarker](#addmarker) で）追加すると、クラスタラーが
それらの表示状態を引き継ぎます。クラスターに含まれるマーカーは数字付きの円の
背後に隠れ、十分にズームインすると個別に再表示されます。
クラスターをクリックするとズームインして展開します。

## Remarks

クラスタリングは MapLibre 組み込みの GeoJSON クラスタリング
（Supercluster）を利用しています。マーカーがクラスタラーの管理対象である間は、
[setMap](/reference/suite/geolonia.maps.Class.Marker#setmap) で自分で地図を変更しないでください。

## Example

```typescript
const clusterer = new geolonia.maps.MarkerClusterer({
  map,
  markers: [marker1, marker2, marker3],
});

clusterer.addMarker(marker4);
```

## Extends

- [`MVCObject`](/reference/suite/geolonia.maps.Class.MVCObject)

## Constructors

### Constructor

> **new MarkerClusterer**(`options?`): `MarkerClusterer`

マーカークラスタラーを作成します。

#### Parameters

##### options?

[`MarkerClustererOptions`](/reference/suite/geolonia.maps.Interface.MarkerClustererOptions)

描画先の地図と、クラスタリングするマーカーの初期セットです。

#### Returns

`MarkerClusterer`

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

### addMarker()

> **addMarker**(`marker`): `void`

クラスタラーにマーカーを追加し、再クラスタリングします。

#### Parameters

##### marker

[`Marker`](/reference/suite/geolonia.maps.Class.Marker)

管理するマーカーです。

#### Returns

`void`

***

### addMarkers()

> **addMarkers**(`markers`): `void`

クラスタラーに複数のマーカーを追加し、再クラスタリングします。

#### Parameters

##### markers

[`Marker`](/reference/suite/geolonia.maps.Class.Marker)[]

管理するマーカーです。

#### Returns

`void`

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

### clearMarkers()

> **clearMarkers**(): `void`

クラスタラーからすべてのマーカーを削除し、空の状態にします。

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

クラスタラーが追加されている地図を返します。取り外されている場合は `null` を返します。

#### Returns

[`Map`](/reference/suite/geolonia.maps.Class.Map) \| `null`

***

### getMarkers()

> **getMarkers**(): [`Marker`](/reference/suite/geolonia.maps.Class.Marker)[]

現在クラスタラーが管理しているマーカーのコピーを返します。

#### Returns

[`Marker`](/reference/suite/geolonia.maps.Class.Marker)[]

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

### removeMarker()

> **removeMarker**(`marker`): `void`

クラスタラーからマーカーを削除し、再クラスタリングします。マーカーは地図上で
個別表示の状態に戻ります。

#### Parameters

##### marker

[`Marker`](/reference/suite/geolonia.maps.Class.Marker)

管理を終了するマーカーです。

#### Returns

`void`

***

### removeMarkers()

> **removeMarkers**(`markers`): `void`

クラスタラーから複数のマーカーを削除し、再クラスタリングします。

#### Parameters

##### markers

[`Marker`](/reference/suite/geolonia.maps.Class.Marker)[]

管理を終了するマーカーです。

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

クラスタラーを地図に追加します。`null` を渡すと取り外します。取り外すと、
すべての管理対象のマーカーが個別表示の状態に戻ります。

#### Parameters

##### map

[`Map`](/reference/suite/geolonia.maps.Class.Map) \| `null`

クラスターを描画する地図、または取り外す場合は `null` です。

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
