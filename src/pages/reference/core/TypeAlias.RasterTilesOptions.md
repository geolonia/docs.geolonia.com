---
layout: ../../../layouts/ApiLayout.astro
title: 'Type Alias: RasterTilesOptions'
page: reference
---

[**@geolonia/maps-core**](/reference/core/)

***

[@geolonia/maps-core](/reference/core/) / RasterTilesOptions

# Type Alias: RasterTilesOptions

> **RasterTilesOptions** = `object`

GeoloniaMapOptions.rasterTiles の指定。

## Example

```typescript
{
  url: "https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg",
  attribution: '<a href="https://maps.gsi.go.jp/development/ichiran.html">地理院タイル</a>',
  opacity: 0.7,
  maxZoom: 18,
}
```

## Properties

### attribution?

> `optional` **attribution?**: `string`

地図の出典表示に加える出典。HTML として表示するので、URL のパラメータなど信頼できない入力を渡さない。

***

### maxZoom?

> `optional` **maxZoom?**: `number`

配信されている最大ズーム。これより大きいズームでは、このズームのタイルを引き伸ばして表示する。有限数でない値は無視する。

***

### minZoom?

> `optional` **minZoom?**: `number`

配信されている最小ズーム。これより小さいズームではタイルを読み込まない。有限数でない値は無視する。

***

### opacity?

> `optional` **opacity?**: `number`

不透明度。0 から 1 の範囲を超える値は範囲内に収め、有限数でない値は `1` にする。

#### Default Value

`1`

***

### tileSize?

> `optional` **tileSize?**: `number`

タイル 1 枚の大きさ（ピクセル）。一般の XYZ タイルは 256。正の有限数でない値は `256` にする。

#### Default Value

`256`

***

### url

> **url**: `string`

タイルの URL のテンプレート。`{z}`、`{x}`、`{y}` を含める。
含まないときは、コンソールに警告を出して重ねない（TileJSON の URL は受け付けない）。
