---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: スタイルテンプレート
description: 地図のスタイルをカスタマイズする方法についてご紹介します。

micro_nav: true

# Page navigation
# page_nav:
#     prev:
#       content: JavaScript API
#       url: /js/
#     next:
#       content: クラスリファレンス
#       url: '/js/class/'

breadcrumbs:
    - title: カスタムスタイル
      url: /custom-style-template/
---

## カスタムスタイル

Geolonia では、デフォルトのスタイル `geolonia/basic` 以外にもいくつかのスタイルを用意しています。

以下のサンプルでは、左上のプルダウンでそれらのスタイルを切り替えられるようになっています。

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="result" data-user="geolonia" data-slug-hash="rNVdobe" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Custom control to switch the style">
  <span>See the Pen <a href="https://codepen.io/geolonia/pen/rNVdobe">
  Custom control to switch the style</a> by Geolonia (<a href="https://codepen.io/geolonia">@geolonia</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

<a class="codepen" href="https://codepen.io/geolonia/pen/rNVdobe" target="codepen"><i class="icon icon--codepen"></i> CodePen でサンプルコードを編集</a>

デフォルトで用意しているスタイル以外にも [style-template](https://github.com/miya0001/style-template) というツールで、Mapbox GL JS ベースの地図のスタイルを GitHub 上で簡単に編集することができます。

## カスタムスタイルをつくるための手順

1. [https://github.com/miya0001/style-template](https://github.com/miya0001/style-template) にアクセス。
1. [Use this template] ボタンをクリックしてリポジトリをコピー。
1. しばらくすると `gh-pages` ブランチに `style.json` がコミットされるので、Geolonia Maps で表示する場合は、その URL を以下のように指定してください。 `//TODO: raw形式のURLで指定することを書く？`

```
<div
  class="geolonia"
  data-style="<style.json の URL>"
></div>
```

例: [https://codepen.io/miya0001/pen/bGRKJgV](https://codepen.io/miya0001/pen/bGRKJgV)

## 背景色を変更する

まず、地図の背景色を変更するには、GitHub で `main` ブランチの `style.yml` を開きます。以下のスクリーンショットのように、右上の鉛筆アイコンをクリックすると編集することができます。

![](/img/custom-style-template-1.png)


次に指定されているカラーコードを、みなさんのお好きな色に変更してください。rgba と Hex 形式で色を指定することができます。

![](/img/custom-style-template-2.png)


注意：Hex 形式で色を指定する場合は、カラーコードをダブルクォーテーションを囲う必要があります。例：`"#000000"`

コミットし、しばらくすると gh-pages ブランチ の style.json が更新されます。それにともない地図のスタイルも更新されます。


## 海などの水の色を変更する

海や川などの水の色を変更するには、同じように `$waterColor: rgba(1, 17, 44, 1)` と指定されている箇所のカラーコードを変更してください。

## 道路の色を変更する

道路の色を変更するには、同じように `$highwayColor: rgba(255, 255, 255, 0.4)` と指定されている箇所のカラーコードを変更してください。

## テキストを変更する

地名や店名などのテキストを変更するには、下のように指定されている箇所を変更してください。

```
$textSettings:
  text-halo-blur: 0.5
  text-color: "#FFFFFF"
  text-halo-width: 1
  text-halo-color: "#000000"
```
- `text-halo-blur`(輪郭のぼかしサイズ）
- `text-color`（文字の色）
- `text-halo-width`（輪郭のサイズ）
- `text-halo-color`（輪郭の色）
