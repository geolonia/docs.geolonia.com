---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: カスタムスタイル
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
      url: /custom-style/
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
1. style.yml を編集。
1. コミット後、しばらくすると `gh-pages` ブランチに style.json がコミットされるので、Geolonia Maps で表示する場合は、その URL を以下のように指定してください。

```
<div
  class="geolonia"
  data-style="<style.json の URL>"
></div>
```

例: [https://codepen.io/miya0001/pen/bGRKJgV](https://codepen.io/miya0001/pen/bGRKJgV)


## 背景色を変更する

まず、地図の背景色を変更するには、GitHub で `style.yml` を開きます。以下のスクリーンショットのように、右上の鉛筆アイコンをクリックすると編集ですることができます。 次に、`$background: rgba(19, 28, 54, 1)` と指定されている箇所を、みなさんのお好きな色に変更してください。rgba と Hex 形式で色を指定することができます。

注意：Hex 形式で色を指定する場合は、カラーコードをダブルクォーテーションを囲う必要があります。例：`"#000000"`

## 海などの水の色を変更する

## 道路の色を変更する

## テキストを変更する





1. パブリックの設定にしてください。
1. Saas のように、`$変数名` で指定されています。カラーコードを変更することでみなさんのお好きな色を指定できます。
1. 注意
1. 色は、rgba と hex で指定できます。hex で指定する場合はダブルクォーテーションで囲む必要があります。
1. 右上の鉛筆マークをクリックすると、style.yml を編集することができます。



GitHub 上で style.yml を開くと
