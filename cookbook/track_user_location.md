---
layout: default
keywords:
comments: false

title: ユーザーの現在位置をトラッキングする
description: スマホ上で地図を表示したときに、ユーザーの現在位置をずっと表示し続ける方法を紹介します。

micro_nav: true

breadcrumbs:
    - title: クックブック
      url: /cookbook/
    - title: ユーザーの現在位置をトラッキングする
      url: /cookbook/track_user_location/
---

スマホ上で地図を表示したときに、ユーザーの現在位置をずっと表示し続けたほうが便利なときがあります。

[Embed API](/embed-api/) の `data-geolocate-control` を `on` にすれば、ユーザーの現在位置を指し示すジオロケーションコントロールを表示することができますが、スマホを持って歩いているときなど位置が刻々と変わる場合には、コントロールのボタンを何度も押す必要があります。

このような場合には、ジオロケーションコントロールの `trackUserLocation` オプションを有効にするのが良いのですが、Embed API で追加されるジオロケーションコントロールではこのオプションは無効になっています。そこで、[JavaScript API](/javascript-api/) と組み合わせ、`trackUserLocation` を有効にしたコントロールを地図に追加します。

## 地図を表示する

まず、以下のように地図を表示します。

```html
<div id="map"
  data-geojson="https://geolonia.github.io/style-demo-source/cookbook-popup.json"></div>
```

JavaScript を使用するので、クラス属性 geolonia は使わず id 属性 `map` を使用します。

参照: [class 属性 geolonia について](/cookbook/006/#class-%E5%B1%9E%E6%80%A7-geolonia-%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)

## ジオロケーションコントロールを追加する

JavaScript 側では、`map` を指定して geolonia.Map のインスタンスを生成し、`trackUserLocation` を `true` にした GeolocateControl を地図に追加します。

```javascript
const map = new geolonia.Map('#map');
const geolocate = new geolonia.GeolocateControl({
  trackUserLocation: true
});
map.addControl(geolocate);
```

ユーザーをトラッキングできるようにしたジオロケーションコントロールをクリックすると、以下キャプチャのように青く点灯し続け、定期的に端末の位置情報にアクセスしてユーザーの位置を追跡するようになります。

![track_user_location](/img/track_user_location.png)

以下 CodePen でコード全体を確認できます。スマホで開いて、ユーザーの現在位置をトラッキングし続ける様子を確認することができます。

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="GRBJgBM" data-user="geolonia" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/geolonia/pen/GRBJgBM">
  ユーザーの現在位置をトラッキングする</a> by Geolonia (<a href="https://codepen.io/geolonia">@geolonia</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

<a class="codepen" href="https://codepen.io/geolonia/pen/GRBJgBM" target="codepen"><i class="icon icon--codepen"></i> CodePen でサンプルコードを編集</a>
