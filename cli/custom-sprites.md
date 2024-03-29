---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: カスタムスプライト
description: Geolonia CLI でカスタムスプライトをアップロードする方法を紹介します

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
    prev:
        content: Geolonia CLI
        url: '/cli/'

breadcrumbs:
    - title: Geolonia CLI
      url: /cli/
    - title: カスタムスプライト
      url: /cli/custom-sprites/
---

## 概要

地図上のマーカーを好きなアイコンに置き換えることは、カスタムマーカーで実現できます。[1つのマーカーを置き換える場合は、JavaScriptを書かなくても Embed API のみで実現できます。](/cookbook/003/#カスタムマーカーを使用する)

ただ、GeoJSONなどのデータソースを使って[複数のマーカーを表示](/cookbook/004/)すると、上記のようなカスタムマーカーを使うことができません。その場合には、これから紹介するカスタムスプライトを使います。

## 地図用スプライトシートについて

各スタイルには、その地図スタイルが使うスプライトシートが用意されています。例えば、 `gsi` スタイルの[スプライトシートはこちらです](https://github.com/geoloniamaps/gsi/blob/gh-pages/gsi%402x.png)。このスプライトシート内のアイコンの座標を参照するために別途 [JSON ファイル](https://github.com/geoloniamaps/gsi/blob/gh-pages/gsi%402x.json)が用意されています。

[GeoJSON 仕様を確認](/geojson/)すると、「指定可能なスタイル情報」の `marker-symbol` の値は、このスプライトシート内のアイコンに相当するものです。

このスプライトシートに自分のアイコンを追加するには、 Geolonia CLI のカスタムスプライト機能を使います。

## スプライトをアップロードします

カスタムスプライトは API キーとひも付きます。複数 API キーでスプライトを使用したい場合はもう一度下記の手順でアップロードしてください。

現在対応フォーマット： SVG (推奨), PNG

※ アイコンを作成するにあたって、画面の画質に合わせて1倍と2倍のスプライトシートを2枚作ります。そのため、サイズを変更しても画質が落ちないSVGを推奨しております。ただ、SVGの用意が難しいためPNGも対応可能です。PNGの2倍画質のものが用意されていれば、 `[アイコン名]@2x.png` としてアップロードすると認識し、2倍用のスプライトシートに使われます。

まずは、アイコンをアップロードしましょう。

```
$ geolonia sprites upload ./custom-icon.svg
```

続けて、どの API キーと紐づけるかを選びます。

```
[1] API キー (ユーザー名 が 日付 に作成)
Please select the map key [1]: 1
```

最後に、アイコン名を指定します。デフォルトでは拡張子を抜いた名前になりますが、ここでカスタマイズできます。

```
Please input the sprite ID. Press Return if you are OK with the default name [custom-icon]: custom-icon
```

下記メッセージは、正常にアップロードが完了したことを示しています。

```
Successfully uploaded ./custom-icon.svg as custom-icon
```

以上で、先程選択した API キーで表示されている地図に、このアイコンが含まれているスプライトシートが配信されます。
