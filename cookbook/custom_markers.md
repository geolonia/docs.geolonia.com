---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: 複数のカスタムマーカーを追加する
description:

# Author box
# author:
#     title: About Author
#     title_url: '#'
#     external_url: true
#     description: Author description

# Micro navigation
micro_nav: true

# Page navigation
# page_nav:
#     prev:
#         content: ドラッグしたマーカーの緯度・経度を取得する
#         url: '/cookbook/draggable_marker/'

breadcrumbs:
    - title: クックブック
      url: /cookbook/
    - title: 複数のカスタムマーカーを追加する
      url: /cookbook/custom_markers/
---

以下のように、複数のカスタムマーカーを追加する方法を紹介します。

<a class="codepen" href="https://codepen.io/geolonia/pen/dyjoVyW" target="codepen"><i class="icon icon--codepen"></i> CodePen でサンプルコードを編集</a>

<div class="callout callout--warning">
  <p>このクックブックでは、 <a href="/javascript-api/">Javascript API</a> を使用した実装方法を紹介しています。Embed API を使った実装はできませんのでご注意下さい。</p>
</div>

![](/img/custom-markers1.png)

## 地図の初期化

まず、地図を表示するための `div` タグを用意します。

```html
<div id="map"></div>
```

## データを取得する

次に、地図に表示するデータを取得します。今回は、デモ用に用意している GeoJSON の URL を指定しますが、
実際には、ご自身のデータの URL を指定してください。

お手元の CSV ファイルを GeoJSON に変換するには、クックブックの [「CSV を GeoJSON に変換し、地図で表示する」](/cookbook/geojson-api/) をご参考下さい。


```javascript
map.on("load", async () => {
  try {
    // GeoJSON を fetch で取得
    const response = await fetch(
      "https://geolonia.github.io/style-demo-source/cookbook-popup.json"
    );
    // レスポンスを json に変換
    const geojson = await response.json();
  } catch (error) {
    console.error(error);
  }
});
```

## カスタムマーカーを追加する

まず、カスタムマーカーの HTML要素 を作成します。
```javascript
const markerElm = document.createElement("div");
markerElm.className = "custom-marker"; // クラス名をセット
markerElm.innerHTML = feature.properties.title; // GeoJSON feature の title をセット
```


次に、`geolonia.Marker` を使用して、カスタムマーカーを追加します。

```javascript
const marker = new geolonia.Marker(markerElm)
  .setLngLat(feature.geometry.coordinates) // 緯度経度をセット
  .addTo(map); // 地図に追加
```

以上の手順を、GeoJSON の features をループし、feature の 数だけ繰り返すことで、複数のカスタムマーカーを追加することができます。

```javascript
map.on("load", async () => {
  // ... 省略 ...
  // GeoJSON の features をループ
    geojson.features.forEach((feature) => {

      // カスタムマーカーの DOM を作成
      const markerElm = document.createElement("div");
      markerElm.className = "custom-marker";
      markerElm.innerHTML = feature.properties.title;

      // マーカーを追加
      const marker = new geolonia.Marker(markerElm)
        .setLngLat(feature.geometry.coordinates)
        .addTo(map);
    });
  // ... 省略 ...
});
```

## マーカーを CSS でカスタマイズする

追加した `custom-marker` クラスを CSS でカスタマイズすることで、マーカーの見た目を変更することができます。

```css
.custom-marker {
  background-color: #f5f5f5;
  color: #333333;
  padding: 5px 10px;
  font-weight: bold;
  border: 1px solid #333333;
  box-shadow: rgb(50 50 93 / 25%) 0px 13px 27px -5px,
    rgb(0 0 0 / 30%) 0px 8px 16px -8px;
}
```

コード全体を見るには、以下の CodePen のサンプルコードを参照してください。

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="dyjoVyW" data-user="geolonia" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/geolonia/pen/dyjoVyW">
  複数のカスタムマーカーを追加</a> by Geolonia (<a href="https://codepen.io/geolonia">@geolonia</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

<a class="codepen" href="https://codepen.io/geolonia/pen/dyjoVyW" target="codepen"><i class="icon icon--codepen"></i> CodePen でサンプルコードを編集</a>
