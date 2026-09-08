---
layout: ../../../layouts/ApiLayout.astro
title: 'Type Alias: MapsEventListener'
page: reference
---

[**@geolonia/maps-suite**](/reference/suite/geolonia.Namespace.maps)

***

[@geolonia/maps-suite](/reference/suite/geolonia.Namespace.maps) / [geolonia](/reference/suite/geolonia.Namespace.maps) / [maps](/reference/suite/geolonia.Namespace.maps) / MapsEventListener

# Type Alias: MapsEventListener

> **MapsEventListener** = `object`

イベントリスナーを登録したときに返されるハンドルです。

イベントの受信を停止するには [MapsEventListener.remove](#remove) を呼び出します。

## Example

```typescript
const listener = map.addListener("center_changed", () => { ... });
// 不要になったとき:
listener.remove();
```

## Properties

### remove

> **remove**: () => `void`

リスナーを解除し、そのハンドラが呼び出されないようにします。

#### Returns

`void`
