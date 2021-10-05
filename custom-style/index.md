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

私たちは、すべてのスタイルを GitHub で公開しており、これらのスタイルのリポジトリの README に **DEMO on editor** というリンクがあり、そこでみなさんご自身の好みのスタイルを作ることが可能になっています。

* [geolonia/basic](https://github.com/geolonia/basic)
* [geolonia/midnight](https://github.com/geolonia/midnight)
* [geolonia/red-planet](https://github.com/geolonia/red-planet)
* [geolonia/notebook](https://github.com/geolonia/notebook)

![](/img/maputnik.png)

これは、[Maputnik](https://maputnik.github.io/) というオープンソースのソフトウエアで、Mapbox GL JS ベースの地図のスタイルを GUI で簡単に編集することができます。

## カスタムスタイルをつくるための手順

カスタムスタイルをつくるための最も簡単な手順は、[geolonia/midnight](https://github.com/geolonia/midnight) をベースに Maputnik をカスタマイズしていくことです。

このスタイルは、ユーザーのみなさんが簡単に地図のデザインをカスタマイズできるようにレイヤーの数を少なめにしてあり、色の数もある程度絞っています。

ではさっそく、geolonia/midnight を編集するための画面を Maputnik で開いてみましょう。

<a href="https://editor.geolonia.com/?style=https://raw.githubusercontent.com/geolonia/midnight/master/style.json"><i class="icon icon--github"></i> geolonia/midnight を編集する</a>

Geolonia の地図に限らず、Mapbox GL JS ベースの地図は、とてもたくさんのレイヤーから成り立っています。

これらのレイヤーには、地図上に表示される背景（background）の上に、海や陸地、地域、建物などのポリゴン (fill)や、道路などのライン (line)、店舗などの位置情報を示す点 (symbol) などが含まれています。

Mapbox GL JS のスタイルでは、fill や line、symbol ごとに背景色や輪郭、透視度などを設定することができます。

これらをひとつずつ把握して個々に編集していくのはとても大変なので、上述のように Maputnik で編集していきましょう。

## 背景色を変更する

まず、地図の背景色を変更するには、以下のスクリーンショットのように、左側のレイヤー選択メニューで `background` をクリックしてください。 次に、もう一つの矢印のテキスト入力ボックスに `rgbaa(19, 28, 54, 1)` と入力されていると思いますので、そこをクリックして表示されるカラーピッカーを用いて、好きな色に変更してみてください。

![](/img/custom-style-1.png)

## 海などの水の色を変更する

海や川などの水の色を変更するには、まず地図上で海をクリックして表示されるツールチップ内の `water` をクリックしてください。

左側のサイドバーで `water` レイヤーが選択されますので、先ほどと同じ要領でカラーピッカーを用いて色を選択してください。

![](/img/custom-style-2.png)

## 建物などの色を変更する

建物などの色を変更するのも、上述した水の色を変更する方法と同じです。

ただし、建物の場合はいくつかのレイヤーと重なっている場合があり、以下のスクリーンショットの例では建物 (`building`) と地下鉄 (`tunnel-path`) が重なっているようです。

その場合、ツールチップ上にそれぞれのレイヤーが表示されますので、その中から編集したいレイヤー（今回の場合は `building`）をクリックしてください。

![](/img/custom-style-3.png)

## テキストを変更する

地図上に表示されているテキストのスタイルを変更することもできます。

地図上に表示されているテキストの多くは `poi` というレイヤーに含まれています。 （`poi` は "point of interest" の略です。）

まず地図上で適当な店舗をクリックして、ツールチップ内の `poi` をクリックしてください。

その後、左側のサイドバー内で "Text paint properties" を探して、テキストの色 (`Color`) や輪郭の色 (`Halo color`) をこれまでと同じ要領で変更してください。

![](/img/custom-style-4.png)

<div class="callout callout--danger">
<p>Mapbox GL ではフォントを変更することも可能ですが、WebGL の性格上日本語フォントを埋め込むにはフォントのフォーマットを変更する必要がある上に独自にホスティングする必要があり、それでもとても大きなサイズとなるため、地図の表示に時間がかかるようになります。</p>
<p>そのため、Geolonia ではユーザーのローカルフォントを使用するように Embed API にてあらかじめ設定されていますので、フォントを変更しても意図したとおりに表示されません。</p>

<p>参考: <a href="https://docs.mapbox.com/mapbox-gl-js/example/local-ideographs/">https://docs.mapbox.com/mapbox-gl-js/example/local-ideographs/</a></p>
</div>

## カスタムスタイルを使用する

### 1. API キーを変更する

カスタムスタイルを使用するには、まずスタイル内に API キーを記述する必要があります。

Maputnik のメニューの "Data Sources" をクリックして表示されるポップアップウインドウの中の `YOUR-API-KEY` を、ダッシュボードであらかじめ取得した API キーに変更してエンターキーをクリックしたあと、右上の "X" ボタンをクリックして保存してください。

![](/img/custom-style-api-key.png)

API キーに対しては、あらかじめ `https://editor.geolonia.com` を許可しておかないと、API キーを変更後に地図が表示されなくなります。（この設定は必須ではありません。）

![](/img/custom-style-dashboard.png)

* とりあえず試したい方は、GitHub ページを利用することをおすすめします。その場合、API キーは `YOUR-API-KEY` のままでご利用いただけます。

### 2. スタイルをサーバーにアップロードする

スタイルを皆さんのウェブサイトで実際に使用するには、ウェブサーバーにアップロードする必要があります。

まず、上部のメニューにある "Export" をクリックして表示されるポップアップ内の "Download" をクリックして、JSON フォーマットのファイルをダウンロードしてください。

![](/img/custom-style-export.png)

次に地図を表示するための HTML に、アップロードしたスタイルにアクセスするための URL を記述してください。

```html
<div class="geolonia" data-style="https://example.com/my-style.json">
```

上の例では、`https://example.com/my-style.json` がカスタムスタイルの URL です。

手早く試したい場合は、GitHub にアップロードするのがおすすめです。 Geolonia の地図は、GitHub ページ上では無料で使えるようになっていますので、上述した API キーを変更する必要もありません。

## さらに高度なカスタマイズ

本ドキュメントでは、色を変更する方法のみについてご紹介しましたが、実際にはもっと多くのことが可能です。

* ズームレベルや各地物が持つプロパティなどの条件に応じて表示非表示を切り替えたりデザインを切り替える。
* 道路の幅をズームレベルに応じて切り替える。
* ズームレベルを特定の範囲内に固定する。
* 各地物がもつメタデータに含まれる数字を元にヒートマップを表示する。

詳しくは、Mapbox GL JS のドキュメントを御覧ください。

[https://docs.mapbox.com/mapbox-gl-js/style-spec/](https://docs.mapbox.com/mapbox-gl-js/style-spec/)

また、JavaScript を使用してダイナミックにスタイルを変更することも可能です。

以下のページですこしずつサンプルを増やしていきますので、よろしくお願いいたします。


[JavaScript API](/javascript-api/)
