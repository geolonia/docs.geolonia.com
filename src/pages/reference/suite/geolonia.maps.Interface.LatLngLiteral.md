---
layout: ../../../layouts/ApiLayout.astro
title: 'Interface: LatLngLiteral'
page: reference
---

[**@geolonia/maps-suite**](/reference/suite/)

***

[@geolonia/maps-suite](/reference/suite/) / [geolonia](/reference/suite/Namespace.geolonia) / [maps](/reference/suite/geolonia.Namespace.maps) / LatLngLiteral

# Interface: LatLngLiteral

地理座標上の点を緯度・経度として表現するプレーンオブジェクトです。

これは [LatLng](/reference/suite/geolonia.maps.Class.LatLng) に対応する、軽量でシリアライズ可能な型です。位置を
受け取るほとんどのメソッドは、[LatLngLiteralOrLatLng](/reference/suite/geolonia.maps.TypeAlias.LatLngLiteralOrLatLng) を通じて
どちらの形式でも受け付けます。

## Example

```typescript
const tokyoStation: geolonia.maps.LatLngLiteral = { lat: 35.6812, lng: 139.7671 };
```

## Properties

### lat

> **lat**: `number`

緯度（度単位、-90 から 90 の範囲）。

***

### lng

> **lng**: `number`

経度（度単位、-180 から 180 の範囲）。
