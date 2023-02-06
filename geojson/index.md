---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: GeoJSON 仕様
description: GeoJSON のスタイルを定義するための仕様について紹介します。

# Author box
# author:
#     title: About Author
#     title_url: #
#     external_url: true
#     description: Author description

# Micro navigation
micro_nav: true

# Page navigation
page_nav:
    # prev:
    #     content: Previous page
    #     url: #
    # next:
    #     content: はじめに
    #     url: /tutorial/001/

breadcrumbs:
    - title: GeoJSON 仕様
      url: /geojson/
    # - title: "hello"
    #   URL: "./"
---

## GeoJSON について

GeoJSON とは JSON によって空間情報を扱うためのファイルフォーマットです。

[GeoJSON - Wikipedia](https://ja.wikipedia.org/wiki/GeoJSON)

## Simplestyle について

Simplestyle とは Mapbox 社が公開した GeoJSON にスタイル情報を埋め込むための仕様で、GeoJSON を作成、編集できるサイト [geojson.io](https://geojson.io) 等で採用されています。

[simplestyle-spec](https://github.com/mapbox/simplestyle-spec)

![](/img/simplestyle-sample.png)

[Simplestyle 対応の GeoJSON の例](https://raw.githubusercontent.com/geolonia/docs.geolonia.com/master/geojson/example.geojson)

Geolonia の Embed API の GeoJSON 埋め込み機能でも同様に Simplestyle に対応しています。

```html
<div
  class="geolonia"
  data-geojson="/geojson/example.geojson"
></div>
```

<div
  class="geolonia"
  data-geojson="/geojson/example.geojson"
></div>

## Simplestyle のスキーマ

GeoJSON は、以下のようなルート要素を持っています。

```json
{
  "type": "FeatureCollection",
  "features": []
}
```

`features` の中には `feature` オブジェクト（地物）が配列で保存されており、それらも含めると以下の通りになります。

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": []
      },
      "properties": {}
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": []
      },
      "properties": {}
    }
  ]
}
```

`feature` オブジェクトにはいくつかのタイプがあり、それは `geometry` プロパティの中にある `type` プロパティで指定されています。

Geolonia の Embed API が対応しているタイプは以下の3種類です。

* `Point`: 特定の座標を示すためのマーカーを設置します。
* `LineString`: 複数の座標を結ぶ線を設置します。
* `Polygon`: 多角形の図形を設置します。

Geolonia では、これらのタイプに対して、以下で紹介するスタイル情報に対応しています。

## タイプごとに指定可能なスタイル情報

上述した `Point` などの各 `feature` タイプに対してスタイルを指定するには、それぞれのオブジェクトの `properties` にスタイル情報を埋め込みます。

| プロパティ| 内容| Point | LineString | Polygon |
|---------|---------| :---: | :---:   | :---: |
| title          | 地物のタイトル。 | ○ | ○ | ○ |
| description    | 地物をクリックした際に表示されるコンテンツ | ○ | ○ | ○ |
| marker-size    | マーカーのサイズを `small`、`medium`、`large` のいずれかで指定 | ○ |   |   |
| marker-symbol  | マーカーのアイコン。 | ○ |   |   |
| marker-color   | マーカーの色。例: `#7e7e7e` | ○ |   |   |
| stroke         | 線の色。例: `#555555` | ○ | ○ | ○ |
| stroke-width   | 線の太さ。例: `2` | ○ | ○ |   |
| fill           | 塗りつぶし色。例: `#7e7e7e` |   |   | ○ |

* `○` がついているものが対応しているプロパティです。
* [geojson.io](http://geojson.io/) を使用するとブラウザベースの GUI でスタイル情報を設定することができます。
* `marker-symbol` で使えるアイコンの一覧は、[こちらをご確認](/geojson/marker-symbol/)ください。
* `marker-symbol` については、一部のスタイルで意図したとおりにアイコンを表示できないことがあります。
