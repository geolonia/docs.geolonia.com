---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: Embed API 仕様
description: Embed API の仕様を紹介します。

# Author box
# author:
#     title: About Author
#     title_url: '#'
#     external_url: true
#     description: Author description

# Micro navigation
micro_nav: true

# Page navigation
page_nav:
    # prev:
    #     content: Previous page
    #     url: '#'
    # next:
    #     content: はじめに
    #     url: '/tutorial/001/'

breadcrumbs:
    - title: Embed API
      url: /embed-api/
    # - title: "hello"
    #   URL: "./"
---

## Embed API とは

Geolonia の地図サービスでは、Embed API という API を提供しています。

この API は、[MapLibre GL JS](https://maplibre.org/maplibre-gl-js-docs/api/) 互換の JavaScript API に加えて、簡単な HTML を記述するだけでユーザーの皆さんのウェブサイトに地図を埋め込むことも可能にしています。

このページでは、Embed API の詳しい仕様について紹介します。

[はじめての方は、チュートリアルからはじめてみることをおすすめします。](/tutorial/)

[JavaScript API を使った本格的な地図アプリの開発方法についてはこちらをご覧ください。](/embed-api/javascript/)

## Embed API の動作環境

* すべてのモダンブラウザ (Edge, Chrome, Safari, Firefox) の最新版。
* Firefox などの一部のブラウザでは、WebGL に対する制限により、一つのページ内に16個を超える地図を設置することはできません。
* API キー `YOUR-API-KEY` に限り、`iframe` 内での利用を許可しておりません。

ご利用中のブラウザが対応ブラウザかどうかは以下のページで確認することができます。 もし地図が表示されれば対応ブラウザです。

[対応ブラウザかどうかを確認する](/examples/supported.html)

## Embed API の設置

Embed API を利用するには、地図を設置したいページの `</body>` の直前に以下のコードを記述してください。

```html
<script type="text/javascript" src="https://cdn.geolonia.com/v1/embed?geolonia-api-key=YOUR-API-KEY"></script>
```

`YOUR-API-KEY` の部分は、みなさんの API キーと置き換えてください。

## HTML の記述

Embed API を利用して地図を設置するには、`geolonia` というクラス属性を持つ `<div />` 要素を設置してください。この要素には、CSS 等で高さが指定されている必要があります。

```html
<div class="geolonia"></div>
```

<div class="geolonia"></div>

地図用の `<div />` 要素の子要素は、マーカーをクリックした際に表示されるポップアップのコンテンツとして使用されます。

```html
<div
  class="geolonia"
  data-lat="35.65810422222222"
  data-lng="139.74135747222223"
  data-zoom="9"
><strong>日本経緯度原点</strong><br>東京都港区麻布台二丁目</div>
```

<div
  class="geolonia"
  data-lat="35.65810422222222"
  data-lng="139.74135747222223"
  data-zoom="9"
><strong>日本経緯度原点</strong><br>東京都港区麻布台二丁目</div>

<a class="codepen" href="https://codepen.io/pen?template=dyomyrX" target="codepen"><i class="icon icon--codepen"></i> CodePen でサンプルコードを編集</a>

## 属性の一覧

表示される地図をカスタマイズするための属性は以下のとおりです。

| 属性 | 内容 | 初期値 |
|---|---|---|
| data-lat | 表示する地図の緯度。例: `35.6581` | `0` |
| data-lng | 表示する地図の経度。例: `139.7413` | `0` |
| data-zoom | 表示する地図のズーム。`0` から `24` までの数字を指定してください。 | `0` |
| data-min-zoom | 表示する地図の最小ズームレベル。 | `` |
| data-max-zoom | 表示する地図のズームレベル。 | `` |
| data-bearing | 地図の方角を `0` から `359` までの数字で指定してください。`0` の場合、地図は北が上になり、`180` の場合は南が上になります。 | `0` |
| data-pitch | 地図の傾斜角を `0` から `60` までの数字で指定してください。 | `0` |
| data-hash | 地図をマウス等で動かした際に、地図の座標やズームがページ URL のハッシュ値と連動させるかどうかを `on` または `off` で指定します。 | `off` |
| data-marker | `data-lat` および `data-lng` で指定した座標にマーカーを設置させるかどうかを `on` または `off` で指定します。 | `on` |
| data-marker-color | マーカーの色を `#FF0000` または `rgba(255, 0, 0, 0.5)` の様に指定してください。 | `#E4402F` |
| data-open-popup | マーカーのポップアップがデフォルトで開いた状態で地図を表示させるかどうかを `on` または `off` で指定します。 | `off` |
| data-custom-marker | カスタムマーカーとして使用するための HTML 要素のセレクタを指定してください。例: `#my-custom-marker` |  |
| data-custom-marker-offset | カスタムマーカーの位置のオフセット値のピクセル数を数字で指定してください。例: `0, 25` | `0, 0` |
| data-gesture-handling | マウスホイールやタッチ操作によるページのスクロールの邪魔にならないように、`alt` キーまたは、2本指による操作を強制します。 | `on` |
| data-geolonia-control | Geolonia のロゴの位置を `top-right`、`bottom-right`、`bottom-left`、`top-left` で指定します。 | `bottom-left` |
| data-navigation-control | ナビゲーションコントロールを表示させるかどうかを `on` または `off` で指定します。<br />`top-right`、`bottom-right`、`bottom-left`、`top-left` のいずれかを指定すると表示位置を変更できます。 | `on` |
| data-geolocate-control | ジオロケーションコントロールを表示させるかどうかを `on` または `off` で指定します。<br />`top-right`、`bottom-right`、`bottom-left`、`top-left` のいずれかを指定すると表示位置を変更できます。 | `off` |
| data-fullscreen-control | フルスクリーンコントロールを表示させるかどうかを `on` または `off` で指定します。<br />`top-right`、`bottom-right`、`bottom-left`、`top-left` のいずれかを指定すると表示位置を変更できます。 | `off` |
| data-scale-control | 地図のスケールを表示させるかどうかを `on` または `off` で指定します。<br />`top-right`、`bottom-right`、`bottom-left`、`top-left` のいずれかを指定すると表示位置を変更できます。 | `off` |
| data-geojson | GeoJSON が記述されている要素のセレクタ、もしくは URL を指定します。[参照](/tutorial/007/) |  |
| data-cluster | GeoJSON のクラスタ機能を有効化させるかどうかを `on` または `off` で指定します。[参照](/tutorial/007/) | `on` |
| data-cluster-color | クラスタ用のサークルの色を指定します。 | `#ff0000` |
| data-style | 地図のスタイルを指定します。[参照](/tutorial/005/) | `osm-bright` |
| data-lang | 地図の言語を `auto` または `ja`、`en` のいずれかで指定します。 | `auto` |
| data-loader | 地図のローディング中のアニメーションを表示させるかどうかを `on` または `off` で指定します。 | `on` |
| data-lazy-loading | 地図の地図の遅延ローディングを行うかどうかを `on` または `off` で指定します。 | `on` |

<strong>属性の使用例:</strong>

```html
<div
  class="geolonia"
  data-lat="35.65810422222222"
  data-lng="139.74135747222223"
  data-zoom="9"
><strong>日本経緯度原点</strong><br>東京都港区麻布台二丁目</div>
```

<a class="codepen" href="https://codepen.io/pen?template=dyomyrX" target="codepen"><i class="icon icon--codepen"></i> CodePen</a> を使用するとサインアップ無しで Geolonia の地図をお試しいただけます。
