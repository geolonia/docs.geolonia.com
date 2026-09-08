---
layout: ../../../layouts/ApiLayout.astro
title: 'Class: MapCanvasProjection'
page: reference
---

[**@geolonia/maps-suite**](/reference/suite/geolonia.Namespace.maps)

***

[@geolonia/maps-suite](/reference/suite/geolonia.Namespace.maps) / [geolonia](/reference/suite/geolonia.Namespace.maps) / [maps](/reference/suite/geolonia.Namespace.maps) / MapCanvasProjection

# Class: MapCanvasProjection

現在の地図ビューにおける地理座標と画面上のピクセル位置の相互変換を行います。
[Map.getProjection](/reference/suite/geolonia.maps.Class.Map#getprojection) から、またはオーバーレイ内では
[OverlayView.getProjection](/reference/suite/geolonia.maps.Class.OverlayView#getprojection) から取得します。

## Remarks

ピクセル座標は地図のオーバーレイコンテナを基準とするため、
[MapPanes](/reference/suite/geolonia.maps.Interface.MapPanes) のペインに追加した要素と位置が揃います。

## Methods

### fromDivPixelToLatLng()

> **fromDivPixelToLatLng**(`pixel`): [`LatLng`](/reference/suite/geolonia.maps.Class.LatLng) \| `null`

オーバーレイコンテナ内のピクセル位置を、地理座標の点に変換します。

#### Parameters

##### pixel

変換する `{ x, y }` のピクセル位置。

###### x

`number`

###### y

`number`

#### Returns

[`LatLng`](/reference/suite/geolonia.maps.Class.LatLng) \| `null`

対応する [LatLng](/reference/suite/geolonia.maps.Class.LatLng)。取得できない場合は `null`。

***

### fromLatLngToDivPixel()

> **fromLatLngToDivPixel**(`latLng`): \{ `x`: `number`; `y`: `number`; \} \| `null`

地理座標の点を、オーバーレイコンテナ内のピクセル位置に変換します。

#### Parameters

##### latLng

[`LatLngLiteralOrLatLng`](/reference/suite/geolonia.maps.TypeAlias.LatLngLiteralOrLatLng)

変換する点。

#### Returns

\{ `x`: `number`; `y`: `number`; \} \| `null`

`{ x, y }` のピクセル位置。取得できない場合は `null`。
