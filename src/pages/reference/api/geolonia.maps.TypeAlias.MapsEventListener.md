---
layout: ../../../layouts/ApiLayout.astro
title: 'Type Alias: MapsEventListener'
page: reference
---

[**@geolonia/maps-suite**](/reference/api/)

***

[@geolonia/maps-suite](/reference/api/) / [geolonia](/reference/api/Namespace.geolonia) / [maps](/reference/api/geolonia.Namespace.maps) / MapsEventListener

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
