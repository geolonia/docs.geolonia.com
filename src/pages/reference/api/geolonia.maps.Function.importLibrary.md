---
layout: ../../../layouts/ApiLayout.astro
title: 'Function: importLibrary()'
page: reference
---

[**@geolonia/maps-suite**](/reference/api/)

***

[@geolonia/maps-suite](/reference/api/) / [geolonia](/reference/api/Namespace.geolonia) / [maps](/reference/api/geolonia.Namespace.maps) / importLibrary

# Function: importLibrary()

> **importLibrary**(`name`): `Promise`\<`Record`\<`string`, `unknown`\>\>

ライブラリ名を指定してクラス群を非同期に読み込みます。

`geolonia.maps` 名前空間全体を参照せずに、必要なクラスを取得するために使用します。
各名前は特定のエクスポートのセットを返します。

| 名前       | 返すもの                                         |
| ---------- | ------------------------------------------------ |
| `"maps"`   | `Map`, `MapElement`, `OverlayView`               |
| `"marker"` | `Marker`, `AdvancedMarkerElement`, `MarkerClusterer` |
| `"core"`   | `LatLng`, `LatLngBounds`, `MVCObject`, `event`   |

`"places"`、`"geometry"`、`"drawing"`、`"visualization"` という名前は
認識されますが、まだ実装されていません。これらは空のオブジェクトを返し、
警告を出力します。

## Parameters

### name

`string`

読み込むライブラリ。

## Returns

`Promise`\<`Record`\<`string`, `unknown`\>\>

要求されたクラスをキーに持つオブジェクトに解決される Promise を返します。
  不明なライブラリや未実装のライブラリの場合は空のオブジェクトを返します。

## Example

```typescript
const { Map } = await geolonia.maps.importLibrary("maps");
const { Marker } = await geolonia.maps.importLibrary("marker");

const map = new Map(document.getElementById("map"), {
  center: { lat: 35.6812, lng: 139.7671 },
  zoom: 14,
  apiKey: "YOUR-API-KEY",
});
new Marker({ position: { lat: 35.6812, lng: 139.7671 }, map });
```
