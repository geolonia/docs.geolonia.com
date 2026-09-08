---
layout: ../../../layouts/ApiLayout.astro
title: 'Variable: event'
page: reference
---

[**@geolonia/maps-suite**](/reference/suite/geolonia.Namespace.maps)

***

[@geolonia/maps-suite](/reference/suite/geolonia.Namespace.maps) / [geolonia](/reference/suite/geolonia.Namespace.maps) / [maps](/reference/suite/geolonia.Namespace.maps) / event

# Variable: event

> `const` **event**: `object`

イベントリスナーを登録するための関数群です。

これらは [instance.addListener](/reference/suite/geolonia.maps.Class.MVCObject#addlistener) を直接呼び出す
代わりの方法であり、一度だけ実行されるリスナーのための
[addListenerOnce](#addlisteneronce) を追加します。

## Type Declaration

### addListener()

> **addListener**(`instance`, `eventName`, `handler`): [`MapsEventListener`](/reference/suite/geolonia.maps.TypeAlias.MapsEventListener)

マップコンポーネント上のイベントに対するハンドラを登録します。

#### Parameters

##### instance

[`MVCObject`](/reference/suite/geolonia.maps.Class.MVCObject)

リッスン対象のコンポーネント（任意の [MVCObject](/reference/suite/geolonia.maps.Class.MVCObject)）。

##### eventName

`string`

リッスンするイベント。

##### handler

(...`args`) => `void`

イベントが発火するたびに、そのイベントの引数とともに呼び出されます。

#### Returns

[`MapsEventListener`](/reference/suite/geolonia.maps.TypeAlias.MapsEventListener)

[MapsEventListener](/reference/suite/geolonia.maps.TypeAlias.MapsEventListener) ハンドルを返します。解除するには `remove()` を呼び出してください。

### addListenerOnce()

> **addListenerOnce**(`instance`, `eventName`, `handler`): [`MapsEventListener`](/reference/suite/geolonia.maps.TypeAlias.MapsEventListener)

最大1回だけ実行され、その後自動的に解除されるハンドラを登録します。

#### Parameters

##### instance

[`MVCObject`](/reference/suite/geolonia.maps.Class.MVCObject)

リッスン対象のコンポーネント（任意の [MVCObject](/reference/suite/geolonia.maps.Class.MVCObject)）。

##### eventName

`string`

リッスンするイベント。

##### handler

(...`args`) => `void`

イベントが最初に発火したときに、一度だけ呼び出されます。

#### Returns

[`MapsEventListener`](/reference/suite/geolonia.maps.TypeAlias.MapsEventListener)

[MapsEventListener](/reference/suite/geolonia.maps.TypeAlias.MapsEventListener) ハンドルを返します。イベント発火前にキャンセルするには `remove()` を呼び出してください。

## Example

```typescript
geolonia.maps.event.addListenerOnce(map, "idle", () => {
  console.log("map finished its first render");
});
```
