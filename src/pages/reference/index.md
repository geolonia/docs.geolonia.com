---
layout: ../../layouts/DocLayout.astro
title: リファレンス
description: Geolonia Maps SDK (embed, maps-suite, maps-core) の API リファレンスです。
page: reference
quadrant: Diátaxis / 仕事 × 認知
sidebar: api
---

各ライブラリの型定義から生成した API リファレンスです。

## @geolonia/embed

`<script>` タグと `<div>` タグだけで地図を表示するライブラリです。地図の設定は `data-*` 属性で与えます。

- [embed のリファレンス](/reference/embed/)

`EmbedAttributes` に `data-*` 属性の全一覧と既定値があります。プラグインを書く場合は `EmbedPlugin` を参照してください。

## @geolonia/maps-suite

JavaScript から地図を命令的に操作するライブラリです。`geolonia.maps` 名前空間の下にクラスと型が並びます。

- [maps-suite のリファレンス](/reference/suite/geolonia.Namespace.maps)

`Map` と `Marker` のほか、`InfoWindow` や `MarkerClusterer`、`Circle` や `Polygon` などの図形、`LatLng` や `LatLngBounds` といった値の型があります。

## @geolonia/maps-core

上の2つと React 版の maps-react が、共通の土台として使っているライブラリです。直接使う場面は多くありませんが、地図インスタンスのオプションや、各ライブラリが内部で何をしているかを確かめたいときに参照してください。

- [maps-core のリファレンス](/reference/core/)

地図本体の `GeoloniaMap` とそのオプション `GeoloniaMapOptions`、`GeoloniaMarker`、GeoJSON にスタイルを当てる `SimpleStyle` などがあります。

---

手順を追って学ぶなら[チュートリアル](/tutorials/)、目的から探すなら[ハウツー](/howto/)を参照してください。
