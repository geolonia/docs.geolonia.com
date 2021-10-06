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

スタイルとはマップの見た目を定義するドキュメントのことです。

Geolonia で使用できるスタイルは、Mapbox や MapLibre GL JS の JSON 形式の、スタイルの仕様と互換性があります。

[https://docs.mapbox.com/mapbox-gl-js/style-spec/](https://docs.mapbox.com/mapbox-gl-js/style-spec/)


## YAML 形式のスタイル

Geolonia では、[Charites](https://github.com/geolonia/charites) を使って、JSON 形式のスタイルを、YAML で記述する方法を推奨しています。それによりコメントや、変数の使用が可能になり、ユーザーがデザインをカスタマイズするステップが簡単になります。


## Layers

スタイルの layers プロパティには、そのスタイルで使用できるすべてのレイヤーが一覧表示されます。

[Charites](https://github.com/geolonia/charites) を使って YAML 形式のスタイルを生成した場合、以下のようにそれぞれのレイヤーが定義されているファイルを読み込んでいます。

```
layers:
  - !!inc/file layers/background.yml
  - !!inc/file layers/landuse-school.yml
  - !!inc/file layers/water.yml
  - !!inc/file layers/building.yml
```

レイヤーはファイルの中身は以下のようになっています。

```
id: landuse-school
type: fill
source: geolonia
source-layer: landuse
filter:
  - '=='
  - class
  - school
layout:
  visibility: visible
paint:
  fill-color: rgba(255, 255, 255, 0.1)
```

レイヤーの種類は `type`プロパティで指定され、`fill`、`line`、`symbol`等があります。

- `fill`: 塗りつぶされた多角形で、境界線も追加できます。
- `line`: 線です。
- `symbol`: アイコンまたはテキストラベルです。

これらのタイプは、後ほど紹介するスタイル情報に対応しています。


更に、レイヤーには、`layout` プロパティと、`paint` プロパティという2つのサブプロパティがあります。
後ほど紹介するスタイル情報は、`layout` か `paint` のプロパティとして指定します。プロパティの種類を間違えないようにご注意ください。

```
layout:
  visibility: visible
paint:
  fill-color: rgba(255, 255, 255, 0.1)
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
