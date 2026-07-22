---
layout: ../../../layouts/ApiLayout.astro
title: 'Class: MVCArray<T>'
page: reference
---

[**@geolonia/maps-suite**](/reference/suite/)

***

[@geolonia/maps-suite](/reference/suite/) / [geolonia](/reference/suite/Namespace.geolonia) / [maps](/reference/suite/geolonia.Namespace.maps) / MVCArray

# Class: MVCArray\<T\>

内容が変化したときにイベントを発火するミュータブルな配列です。

[MVCObject](/reference/suite/geolonia.maps.Class.MVCObject) を継承しているため、`addListener`/`bindTo`/`notify` を
引き継ぎます。要素数は `length` MVC プロパティとして公開されます
(`get("length")` を使用するか、`length_changed` をリッスンしてください)。

イベント:
- `insert_at` `(index)` — `index` に要素が挿入されました。
- `remove_at` `(index, removed)` — `removed` が `index` から削除されました。
- `set_at` `(index, previous)` — `index` の要素が置き換えられました。
  `previous` はそれ以前にあった値です。
- `length_changed` — 配列の長さが変化しました。

## Extends

- [`MVCObject`](/reference/suite/geolonia.maps.Class.MVCObject)

## Type Parameters

### T

`T` = `any`

## Constructors

### Constructor

> **new MVCArray**\<`T`\>(`array?`): `MVCArray`\<`T`\>

#### Parameters

##### array?

`T`[]

#### Returns

`MVCArray`\<`T`\>

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

### clear()

> **clear**(): `void`

すべての要素を削除し、(末尾から) 各要素について `remove_at` を発火します。

#### Returns

`void`

***

### forEach()

> **forEach**(`callback`): `void`

各要素について、そのインデックスとともに `callback` を呼び出します。

#### Parameters

##### callback

(`elem`, `i`) => `void`

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

### getArray()

> **getArray**(): `T`[]

内部の配列を返します。直接変更すると変更イベントを発生させずにバイパスします。

#### Returns

`T`[]

***

### getAt()

> **getAt**(`i`): `T`

指定したインデックスの要素を返します (範囲外の場合は `undefined`)。

#### Parameters

##### i

`number`

#### Returns

`T`

***

### getLength()

> **getLength**(): `number`

要素数を返します。

#### Returns

`number`

***

### insertAt()

> **insertAt**(`i`, `elem`): `void`

`i` に `elem` を挿入し、以降の要素をずらします。`insert_at` を発火します。

#### Parameters

##### i

`number`

##### elem

`T`

#### Returns

`void`

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

### pop()

> **pop**(): `T`

最後の要素を削除して返します (空の場合は `undefined`)。
要素が削除された場合、削除された値とともに `remove_at` を発火します。

#### Returns

`T`

***

### push()

> **push**(`elem`): `number`

`elem` を末尾に追加し、新しい長さを返します。`insert_at` を発火します。

#### Parameters

##### elem

`T`

#### Returns

`number`

***

### removeAt()

> **removeAt**(`i`): `T`

`i` の要素を削除して返し、以降の要素をずらします。
削除された値とともに `remove_at` を発火します。

#### Parameters

##### i

`number`

#### Returns

`T`

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

### setAt()

> **setAt**(`i`, `elem`): `void`

`i` の要素を置き換えます。以前の値とともに `set_at` を発火し、配列が
大きくなった場合 (`i` が現在の末尾を超える場合) は `length_changed` を発火します。

#### Parameters

##### i

`number`

##### elem

`T`

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
