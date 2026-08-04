---
layout: ../../../layouts/ApiLayout.astro
title: 'Interface: DataOptions'
page: reference
---

[**@geolonia/maps-suite**](/reference/suite/)

***

[@geolonia/maps-suite](/reference/suite/) / [geolonia](/reference/suite/Namespace.geolonia) / [maps](/reference/suite/geolonia.Namespace.maps) / DataOptions

# Interface: DataOptions

[Data](/reference/suite/geolonia.maps.Class.Data) を構築するためのオプションです。

## Properties

### map?

> `optional` **map?**: [`Map`](/reference/suite/geolonia.maps.Class.Map) \| `null`

地物を描画する地図です。省略する（または `null` を渡す）と、取り外した状態で作成します。

***

### style?

> `optional` **style?**: [`DataStyleOptions`](/reference/suite/geolonia.maps.Interface.DataStyleOptions) \| [`DataStyleFunction`](/reference/suite/geolonia.maps.TypeAlias.DataStyleFunction)

初期のスタイルです。静的な値か、地物ごとにスタイルを返す関数を指定します。
