---
layout: ../../layouts/DocLayout.astro
title: リファレンス
description: Geolonia Maps SDK (embed, maps-suite, maps-react, maps-core) の API リファレンスです。
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

`Map` と `Marker` のほか、`InfoWindow` や `MarkerClusterer`、`Circle` や `Polygon` などの図形、`LatLng` や `LatLngBounds` といった値の型があります。ジオメトリの型が混在した GeoJSON をまとめて描画したいときは、`Map.data` から使う `Data` レイヤーがあります。

## @geolonia/maps-react

React 用のライブラリです。**このライブラリだけ、型定義から生成したリファレンスがありません。** props の大半が maps-core のものをそのまま受け取る形なので、下の [maps-core のリファレンス](/reference/core/)にある `GeoloniaMapOptions` が `Map` のオプションの一覧にあたります（`container` を除いたもの）。また、`GeoloniaMapOptions`はMapLibre GL JSを継承しているため、[MapLibre GL JS のドキュメント](https://maplibre.org/maplibre-gl-js/docs/)も参考になります。

`Map` はこれに加えて、`containerStyle` や `className` で入れ物の見た目を決めるプロパティ、`onClick` や `onMoveEnd` などの地図イベントを受け取るプロパティ、クリック対象のレイヤを絞る `interactiveLayerIds`、地図インスタンスを取り出す `onLoad` を持ちます。詳細は[MapLibre GL JS のドキュメント](https://maplibre.org/maplibre-gl-js/docs/)をご覧ください。

用意されているコンポーネントは、地図本体の `Map`、データと描き方の `Source` と `Layer`、`Marker` と `Popup`、コントロール類（`NavigationControl`、`GeolocateControl`、`FullscreenControl`、`ScaleControl`、`AttributionControl`、および自作用の `Control`）です。複数の地図をまとめて扱う `MapProvider` と、`useMap` などのフックもあります。

`Source` と `Layer` に渡すものは、MapLibre GL JS のソース定義とレイヤ定義そのままです。`paint` や `layout` に書ける項目、`filter` の式の書き方は [MapLibre GL JS のドキュメント](https://maplibre.org/maplibre-gl-js/docs/)を見れば分かります。`onLoad` で受け取れる地図インスタンスも MapLibre の `Map` を継承したものなので、同じドキュメントがそのまま使えます。

実際の使い方は[maps-react チュートリアル](/tutorials/maps-react/)と、各ハウツーの react タブを参照してください。

## @geolonia/maps-core

上の3つが、共通の土台として使っているライブラリです。基本的にはMapLibre GL JSをベースにGeolonia独自の地図へのアクセスや便利機能を追加したものになります。直接使う場面は多くありませんが、地図インスタンスのオプションや、各ライブラリが内部で何をしているかを確かめたいときに参照してください。

- [maps-core のリファレンス](/reference/core/)

maps-coreの中核である `GeoloniaMap` は **MapLibre GL JS の `Map` クラスを継承して、Geolonia の地図（API キーの扱い、スタイル名の解決、既定のコントロールなど）に対応させたもの**です。そのため、`flyTo()` や `addLayer()`、`on()` といった MapLibre の機能はそのまま使えます。Geolonia 側で足したものだけが上のリファレンスに載っているので、**継承した側の API は [MapLibre GL JS のドキュメント](https://maplibre.org/maplibre-gl-js/docs/)、とりわけ [`Map` クラスのリファレンス](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/)を参照してください**。対応しているのは MapLibre GL JS v5 系です。

地図本体の `GeoloniaMap` とそのオプション `GeoloniaMapOptions`、`GeoloniaMarker`、GeoJSON にスタイルを当てる `SimpleStyle` などがあります。

## GeoJSON のアイコン

GeoJSON の `marker-symbol` に書ける名前は、型定義ではなく地図スタイルに含まれるアイコンで決まります。一覧は [marker-symbol で使えるアイコン](/reference/marker-symbol/) にあります。

---

手順を追って学ぶなら[チュートリアル](/tutorials/)、目的から探すなら[ハウツー](/howto/)を参照してください。
