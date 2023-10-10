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

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="oNJmZOj" data-user="geolonia" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/geolonia/pen/oNJmZOj">
  GeoJSON API デモ</a> by Geolonia (<a href="https://codepen.io/geolonia">@geolonia</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

<a class="codepen" href="https://codepen.io/geolonia/pen/oNJmZOj" target="codepen"><i class="icon icon--codepen"></i> CodePen でサンプルコードを編集</a>


既定のフォーマットに沿った CSV を リポジトリにアップロードすると、GitHub Actions によって自動的に GeoJSON に変換されます。

GeoJSON は、 `https://<あなたのGitHubユーザー名>.github.io/<リポジトリ名>/<ファイル名>.json` のような URL でアクセスできます。

## 設定手順

### リポジトリをコピー

* <a href="https://github.com/geoloniamaps/geojson-api" target="_blank">https://github.com/geoloniamaps/geojson-api</a> にアクセスし、**「Use this template」** をクリックして下さい。

![テンプレートをリポジトリをコピーする](/img/geojson-api-copy-repository1.png)

* **Owner** を自分のアカウントに変更し、**Repository name** を適当な名前に変更して下さい。

![テンプレートをリポジトリをコピーする](/img/geojson-api-copy-repository2.png)


### Google スプレッドシートで CSV を編集する

* <a href="https://docs.google.com/spreadsheets/d/125tgFwGwkdEX5rapUMQuzVQ0BPshHkU0K_snFagOzwk/edit#gid=0" target="_blank">こちらのサンプルデータ</a>の URLを開いて下さい。
* メニューの [ファイル] > [コピーを作成] を選んで、自分のアカウントにコピーを作成してください。

![](/img/geojson-api-copy-sheet1.png)


* ご自身のデータを入力してください。
* メニューの [ファイル] > [ダウンロード] > [カンマ区切り形式（.csv）] を選んで、入力したデータを CSV でエクスポートして下さい。

![](/img/geojson-api-copy-sheet2.png)

* エクスポートした CSV を任意のファイル名でコミットしてください。
* 緯度経度の取得には、<a href="https://community-geocoder.geolonia.com/#12/35.68124/139.76713" target="_blank">Community Geocoder</a> をご利用することをご推奨します。


### GitHub Pages の設定方法

* GitHub のリポジトリのメニューの中にある [Settings] をクリック > サイドバーの [Pages] をクリックしてください。

![](/img/geojson-api-gh-pages1.png)

* 以下のように branch を `gh-pages` に、フォルダを `/ (root)` に設定してください。

![](/img/geojson-api-gh-pages2.png)


### Geolonia Maps での地図の表示方法

* 保存された CSV は GitHub Actions によって、自動的に GeoJSON に変換されます。GeoJSON は、上述のように `https://<あなたのGitHubユーザー名>.github.io/<リポジトリ名>/<ファイル名>.json`<a href="https://geoloniamaps.github.io/geojson-api/example.json" target="_blank">（サンプル URL）</a> のような URL でアクセスできますので、ブラウザで URL を確認した後、その URL をコピーしてください。
* <a href="https://docs.geolonia.com/tutorial/002/" target="_blank">Geolonia Maps の API キーを取得</a> して、<a href="https://docs.geolonia.com/tutorial/003/" target="_blank">JavaScript API を設置</a> してください。
* 地図を表示したい場所に以下のような HTML を設置してください。

```html
<div class="geolonia" data-geojson="<GeoJSON の URL>"></div>
```


#### サンプル
```html
<div
  class="geolonia"
  data-geojson="https://geolonia.github.io/style-demo-source/example.json"
></div>
```

<div class="geolonia" data-geojson="https://geolonia.github.io/style-demo-source/example.json"></div>


## 備考

* 任意のファイル名の CSV を複数設置することも可能です。
* 点データのみに対応しています。
* `marker-color` は、`#FF0000` または `rgba(255,0,0)` のように指定することが可能です。
* 列の順番に制約はありません。
* `description` では、HTML も利用可能です。
* 上記にない列は、`properties` に保存されますが、これらの値を利用するには JavaScript によるプログラミングが必要です。
* <a href="https://docs.google.com/spreadsheets/d/125tgFwGwkdEX5rapUMQuzVQ0BPshHkU0K_snFagOzwk/edit#gid=0" target="_blank">サンプル CSV は、こちらにあります。</a>
* データの仕様については、Geolonia Maps の <a href="https://docs.geolonia.com/geojson/" target="_blank">GeoJSON 仕様</a> もご参照ください。

