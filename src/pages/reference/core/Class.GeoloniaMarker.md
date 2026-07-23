---
layout: ../../../layouts/ApiLayout.astro
title: 'Class: GeoloniaMarker'
page: reference
---

[**@geolonia/maps-core**](/reference/core/)

***

[@geolonia/maps-core](/reference/core/) / GeoloniaMarker

# Class: GeoloniaMarker

地図上に配置する Geolonia デフォルトデザインの点マーカーです。

MapLibre GL JS の `maplibregl.Marker` を継承しており、`setLngLat` や `addTo`、
`remove` などのメソッドはそのまま利用できます。オプションの `element` を
指定しなかった場合は、Geolonia デフォルトの水滴形 SVG マーカーを自動生成して
表示します。既定のマーカー色は `#E4402F` で、`color` オプションを指定すると
その色でマーカーを描画します。このとき水滴の右半分には、指定色を暗くした色が
自動的に適用されます。また、`element` を指定しなかった場合の `offset` の既定値は
`[0, -15]` であり、水滴の先端が指定した座標を指すように配置されます。

`element` を指定した場合は、上記のデフォルト生成、色の適用、`offset` の既定値の
いずれも適用されず、`maplibregl.Marker` の挙動がそのまま使われます。

## Example

```typescript
const map = new GeoloniaMap({
  container: "#map",
  apiKey: "YOUR-API-KEY",
  center: [139.7671, 35.6812],
  zoom: 14,
});

new GeoloniaMarker({ color: "#4A90D9" })
  .setLngLat([139.7671, 35.6812])
  .addTo(map);
```

## Extends

- `Marker`

## Constructors

### Constructor

> **new GeoloniaMarker**(`options?`): `GeoloniaMarker`

Geolonia マーカーを作成します。

`options.element` が指定されていない場合は、Geolonia デフォルトの SVG マーカー
要素を生成して `options.element` に設定し、`options.color`（未指定時は `#E4402F`）で
マーカーの色を適用したうえで、`options.offset` を `[0, -15]` に設定します。
`options.element` が指定されている場合は、これらの処理を行わず指定された要素を
そのまま使用します。

#### Parameters

##### options?

`MarkerOptions` = `{}`

`maplibregl.Marker` の `MarkerOptions` です。`element` を省略すると
  Geolonia デフォルトのマーカーが生成され、`color` でその色を指定できます。
  省略した場合は空のオブジェクトが使われます。

#### Returns

`GeoloniaMarker`

#### Overrides

`maplibregl.Marker.constructor`
