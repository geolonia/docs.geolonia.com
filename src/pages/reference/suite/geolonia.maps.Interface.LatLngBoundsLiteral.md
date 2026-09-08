---
layout: ../../../layouts/ApiLayout.astro
title: 'Interface: LatLngBoundsLiteral'
page: reference
---

[**@geolonia/maps-suite**](/reference/suite/geolonia.Namespace.maps)

***

[@geolonia/maps-suite](/reference/suite/geolonia.Namespace.maps) / [geolonia](/reference/suite/geolonia.Namespace.maps) / [maps](/reference/suite/geolonia.Namespace.maps) / LatLngBoundsLiteral

# Interface: LatLngBoundsLiteral

矩形の地理的範囲を、その各辺によって表現するプレーンオブジェクトです。

これは [LatLngBounds](/reference/suite/geolonia.maps.Class.LatLngBounds) に対応する、軽量でシリアライズ可能な型です。

## Example

```typescript
const bounds: geolonia.maps.LatLngBoundsLiteral = {
  north: 35.7, south: 35.6, east: 139.8, west: 139.7,
};
```

## Properties

### east

> **east**: `number`

東端の経度（度単位）。

***

### north

> **north**: `number`

北端の緯度（度単位）。

***

### south

> **south**: `number`

南端の緯度（度単位）。

***

### west

> **west**: `number`

西端の経度（度単位）。
