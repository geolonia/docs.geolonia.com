---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: スタイル仕様
description: YAML形式でスタイルを定義するための仕様について紹介します。

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
    - title: スタイル仕様
      url: /style-spec/
    # - title: "hello"
    #   URL: "./"
---

## スタイルの仕様

- Mapbox 社の


詳しくは、Mapbox GL JS のドキュメントを御覧ください。

https://docs.mapbox.com/mapbox-gl-js/style-spec/

- Maplibre と Mapbox と Geolonia は互換性があります

このドキュメントでは、[https://github.com/geolonia/charites](https://github.com/geolonia/charites) を使って YAML 形式でスタイルを記述する方法について説明します。


## Layers

スタイルの layers プロパティには、そのスタイルで使用できるすべてのレイヤーが一覧表示されます。レイヤーの種類は `type`プロパティで指定され、`fill`、`line`、`symbol`等があります。

上記の各レイヤーはソースを参照する必要があります。レイヤーは、ソースから取得したデータを受け取り、オプションで特徴をフィルタリングし、それらの特徴のスタイルを定義します。

[https://github.com/geolonia/charites](https://github.com/geolonia/charites) を使って生成した場合ディレクトリ構成は以下のようになります。

```
layers:
  - !!inc/file layers/background.yml
  - !!inc/file layers/water.yml
  - !!inc/file layers/park.yml
  - !!inc/file layers/building.yml
```

### `layout` プロパティと、`paint` プロパティ

レイヤーには、そのレイヤーのデータをどのようにレンダリングするかを決定する、`layout` プロパティと、`paint` プロパティという2つのサブプロパティがあります。

`layout` プロパティはレイヤーの `layout` オブジェクトに表示されます。`layout` プロパティはレンダリングプロセスの初期に適用され、そのレイヤーのデータがどのように GPU に渡されるかを定義しま す。`layout` プロパティを変更するには、非同期の「レイアウ ト」ステップが必要です。

描画プロパティは、レンダリングプロセスの後半で適用されます。`paint` プロパティは、レイヤの「ペイント」オブジェクトに表示されます。`paint` プロパティへの変更は安価で、同期的に行われます。

`layers/waterway-name.yml`

```
id: waterway-name
type: symbol
source: geolonia
source-layer: waterway
minzoom: 13
filter:
  - all
  - - '=='
    - $type
    - LineString
  - - has
    - name
layout:
  text-font:
    - Noto Sans Regular
  text-size: 14
  text-field: '{name}'
  text-max-width: 5
  text-rotation-alignment: map
  symbol-placement: line
  text-letter-spacing: 0.2
  symbol-spacing: 350
paint:
  text-color: '#FFFFFF'
  text-halo-width: 1.5
  text-halo-color: '#000000'
```

## fill

### fill-antialias

塗りつぶしの際にアンチエイリアスをかけるかどうか。

| プロパティ | データ型 | デフォルト |
|---------|---------|---------|
| Paint | [boolean](https://maplibre.org/maplibre-gl-js-docs/style-spec/types/#boolean) | `true` |

### fill-color

このレイヤーの塗りつぶし部分の色を指定します。この色は `rgba` にアルファ成分を加えたものを指定することができ、この色の不透明度は1pxのストロークの不透明度には影響しません。`fill-pattern` で無効になります。

| プロパティ | データ型 | デフォルト |
|---------|---------|---------|
| Paint | [color](https://maplibre.org/maplibre-gl-js-docs/style-spec/types/#color) | `"#000000"` |

### fill-opacity

塗りつぶしレイヤー全体の不透明度です。`fill-color` とは対照的に、`stroke` が使用されている場合、この値は塗りつぶしの周りの1pxのストロークにも影響します。

| プロパティ | データ型 | デフォルト |
|---------|---------|---------|
| Paint | [number](https://maplibre.org/maplibre-gl-js-docs/style-spec/types/#number) (0-1) | `1` |

### fill-outline-color

塗りつぶしの輪郭色です。指定されていない場合は、fill-colorの値と一致します。`fill-pattern` で無効になります。`fill-antialias` を `true` にする必要があります。

| プロパティ | データ型 | デフォルト |
|---------|---------|---------|
| Paint | [color](https://maplibre.org/maplibre-gl-js-docs/style-spec/types/#color) |  |

### fill-pattern

画像の塗りつぶしの描画に使用するスプライト内の画像の名前です．シームレスパターンの場合、画像の幅と高さは2の倍数（2, 4, 8, ..., 512）でなければなりません。ズームに依存する表現は、整数のズームレベルでのみ評価されることに注意してください。

| プロパティ | データ型 | デフォルト |
|---------|---------|---------|
| Paint | [resolvedImage](https://maplibre.org/maplibre-gl-js-docs/style-spec/types/#resolvedimage) |  |

### fill-sort-key

この値に基づいて、フィーチャーを昇順にソートします。高いソートキーを持つフィーチャーは、低いソートキーを持つフィーチャーの上に表示されます。

| プロパティ | データ型 | デフォルト |
|---------|---------|---------|
| Layout | [number](https://maplibre.org/maplibre-gl-js-docs/style-spec/types/#number) |  |

### fill-translate

ジオメトリのオフセット。値は [x, y] で、負の値はそれぞれ左と上を示す。

| プロパティ | データ型 | デフォルト |
|---------|---------|---------|
| Paint | [array](https://maplibre.org/maplibre-gl-js-docs/style-spec/types/#array) of [numbers](https://maplibre.org/maplibre-gl-js-docs/style-spec/types/#number) （単位は `px`） | `[0,0]` |

### fill-translate-anchor

`fill-translate` の基準となるフレームを制御します。`fill-translate` が必要です。

`"map"`を指定します。
 - 塗りつぶしは、地図を基準にして翻訳されます。

`"viewport"`:
 - 塗りつぶしはビューポートに対して相対的に変換されます。

| プロパティ | データ型 | デフォルト |
|---------|---------|---------|
| Paint | `"map"`, `"viewport"` | `"map"` |

### visibility

このレイヤーが表示されているかどうか。

`"visible"`:
このレイヤーを表示するかどうか。

`"none"`:
このレイヤーは表示されません。

| プロパティ | データ型 | デフォルト |
|---------|---------|---------|
| Layout | `"visible"`, `"none"` | `"visible"` |

## line

## symbol
