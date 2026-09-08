---
layout: ../../../layouts/ApiLayout.astro
title: 'Interface: MapOptions'
page: reference
---

[**@geolonia/maps-suite**](/reference/suite/geolonia.Namespace.maps)

***

[@geolonia/maps-suite](/reference/suite/geolonia.Namespace.maps) / [geolonia](/reference/suite/geolonia.Namespace.maps) / [maps](/reference/suite/geolonia.Namespace.maps) / MapOptions

# Interface: MapOptions

[Map](/reference/suite/geolonia.maps.Class.Map) を構築するためのオプションです。

## Properties

### apiKey?

> `optional` **apiKey?**: `string`

あなたの Geolonia API キーです。

***

### center?

> `optional` **center?**: [`LatLngLiteral`](/reference/suite/geolonia.maps.Interface.LatLngLiteral)

地図の初期中心です。デフォルトは `{ lat: 0, lng: 0 }` (経度 0 / 緯度 0)
です。

***

### disableDefaultUI?

> `optional` **disableDefaultUI?**: `boolean`

デフォルトの UI コントロール（ナビゲーション・ジオロケート・フルスクリーン・
スケール・Geolonia ロゴ）を一括で非表示にするかどうかです。デフォルトは
`false` で、地図の既定 UI が表示されます。`true` の場合はすべての既定
コントロールが表示されません。互換対象の地図 SDK の
`disableDefaultUI` に相当します。

***

### heading?

> `optional` **heading?**: `number`

初期の方位角（度単位）です。北から時計回りの角度で、`0` が北向きです。
デフォルトは `0` です。内部的には MapLibre の bearing にマッピングされます。

***

### style?

> `optional` **style?**: `string`

使用する地図のスタイルです。Geolonia のスタイル識別子（例:
`"geolonia/basic-v2"`）またはスタイル URL で指定します。

***

### threeDimensional?

> `optional` **threeDimensional?**: `boolean`

3D 建物（対応スタイルの建物の立体表示）を有効にするかどうかです。
一般的なベクター地図 SDK の挙動に合わせ、デフォルトは `true`（有効）です。
地図を傾ける（[tilt](#tilt) や [setTilt](/reference/suite/geolonia.maps.Class.Map#settilt)）と
建物が立体で表示されます。立体表示を無効にしたい場合は `false` を指定します。

***

### tilt?

> `optional` **tilt?**: `number`

初期チルト角度（度単位）です。`0` で真上から見下ろす状態です。
デフォルトは `0` です。

***

### zoom?

> `optional` **zoom?**: `number`

初期ズームレベルです。数値が大きいほどより拡大します。
デフォルトは `0` (最も広域) です。
