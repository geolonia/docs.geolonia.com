---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: CSV を GeoJSON に変換し、地図で表示する
description: CSV を GeoJSON に変換し地図で表示する方法を紹介します。

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
        content: カスタムコントロールのセレクトボックスで選択した都道府県をハイライト表示する
        url: /cookbook/highlight_prefectures/

breadcrumbs:
    - title: クックブック
      url: /cookbook/
    - title: CSV を GeoJSON に変換し、地図で表示する
      url: /cookbook/geojson-api/
---

## GeoJSON API とは

CSV フォーマットのデータを GitHub Actions で GeoJSON に変換し API として公開するための、テンプレートリポジトリです。

Geolonia Maps なら以下のような簡単なマークアップで地図に表示することが可能です。

  ```html
  <div class="geolonia" data-geojson="<GeoJSON の URL>"></div>
  ```

デモ: [https://codepen.io/geolonia/pen/RwgJjmE](https://codepen.io/geolonia/pen/RwgJjmE)

## リポジトリをコピー

[https://github.com/geoloniamaps/geojson-api](https://github.com/geoloniamaps/geojson-api) にアクセスし、**「Use this template」** をクリックして下さい。

![テンプレートをリポジトリをコピーする](/img/geojson-api-copy-repository1.png)

**Owner** を自分のアカウントに変更し、**Repository name** を適当な名前に変更して下さい。

![テンプレートをリポジトリをコピーする](/img/geojson-api-copy-repository2.png)


## データを準備

[こちらのサンプルデータ](https://docs.google.com/spreadsheets/d/125tgFwGwkdEX5rapUMQuzVQ0BPshHkU0K_snFagOzwk/edit#gid=0) を、自分の Google スプレッドシートにコピーして下さい。


入力したデータを CSV でエクスポートし、リポジトリの `data` ディレクトリに配置して下さい。

緯度経度の取得には、Community Geocoder をご利用することをご推奨します。


## GitHub Pages の設定方法

* GitHub のリポジトリのメニューの中にある [Settings] をクリックしてください。
* 移動先のページの下の方にある [GitHub Pages] のところで、以下のように設定してください。

![](https://www.evernote.com/l/ABXqA26fEitDNZG6KDxX-Os6Qb8gciGRKSYB/image.png)


## Geolonia Maps での地図の表示方法

* 保存された CSV は GitHub Actions によって、自動的に GeoJSON に変換されます。GeoJSON は、上述のように `https://<あなたのGitHubユーザー名>.github.io/<リポジトリ名>/<ファイル名>.json` のような URL でアクセスできますので、ブラウザで URL を確認した後、その URL をコピーしてください。
* [Geolonia Maps の API キーを取得](https://docs.geolonia.com/tutorial/002/) して、[JavaScript API を設置](https://docs.geolonia.com/tutorial/003/)  してください。
* 地図を表示したい場所に以下のような HTML を設置してください。

```
<div class="geolonia" data-geojson="<GeoJSON の URL>"></div>
```

デモ: [https://codepen.io/geolonia/pen/RwgJjmE](https://codepen.io/geolonia/pen/RwgJjmE)

[詳しくは Geolonia Maps ドキュメンテーションを御覧ください。](https://docs.geolonia.com/)


### 備考

* `marker-color` は、`#FF0000` または `rgba(255,0,0)` のように指定することが可能です。
* 列の順番に制約はありません。
* `description` では、HTML も利用可能です。
* 上記にない列は、`properties` に保存されますが、これらの値を利用するには JavaScript によるプログラミングが必要です。
* [サンプル CSV は、こちらにあります。](https://docs.google.com/spreadsheets/d/125tgFwGwkdEX5rapUMQuzVQ0BPshHkU0K_snFagOzwk/edit#gid=0)
* データの仕様については、Geolonia Maps の[ドキュメンテーション](https://docs.geolonia.com/geojson/)もご参照ください。

