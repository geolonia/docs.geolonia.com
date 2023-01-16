---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: ドラッグしたマーカーの緯度・経度を取得する
description: 位置情報を持ったデータの編集画面などで、マーカーの位置を変更したい場合に使える、ドラックしたマーカーの緯度・経度を取得する方法を紹介します。

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
        content: JavaScript を使用した高度なカスタマイズ
        url: '/cookbook/006/'
    next:
        content: カスタムコントロールのセレクトボックスで選択した都道府県をハイライト表示する
        url: /cookbook/highlight_prefectures/

breadcrumbs:
    - title: クックブック
      url: /cookbook/
    - title: ドラッグしたマーカーの緯度・経度を取得する
      url: /cookbook/draggable_marker/
---

## 位置情報を持ったデータの編集画面、更新

位置情報を持ったデータの編集画面を用意する場合、地図上のマーカーをドラッグできるようにしておき、ユーザーがそのマーカーを移動させることで、データの位置情報を更新するという UI が良く使われます。その場合、ドラッグし終わったマーカーの緯度・経度を取得し、それらの値を hidden フィールドなどに渡します。

ここではそうした場合に使える、ドラックしたマーカーの緯度・経度を取得する方法を紹介します。

## ドラッグ可能なマーカーを地図に追加する

```html
<div id="map"></div>
```

で用意した div タグ内に地図を表示するため、container に div タグの ID である `map` を指定して geolonia.Map のインスタンスを生成します。地図の中心は、もう一度登場するので、定数 `center` で定義しておきます。

```javascript
const center = [135.506306, 34.652499]
const map = new geolonia.Map({
  container: 'map',
  center: center,
  zoom: 16
})
```

次に geolonia.Marker のインスタンスを生成し、`draggable` オプションを `true` とし、ドラッグできるようにします。マーカーの位置を `setLngLat` で指定し、`addTo` で地図に追加しています。

```javascript
const marker = new geolonia.Marker({
  draggable: true
})
  .setLngLat(center)
  .addTo(map)
```

## ドラッグしたマーカーの緯度・経度を取得する

マーカーをドラッグし終わったときに呼び出す関数を以下のように定義します。 `marker.getLngLat()` でそのときマーカーが指している緯度、経度を取得し、`alert` でそれぞれの値を表示しています。

```javascript
function onDragEnd() {
  const lngLat = marker.getLngLat()
  alert(`緯度: ${lngLat.lat}, 経度: ${lngLat.lng}`)
}
```

`marker` がドラッグされ終わったときに `dragend` イベントが発火されます。このイベントに、上記の関数をひもづけます。

```javascript
marker.on('dragend', onDragEnd)
```

コード全体を見るには、以下の CodePen のサンプルコードを参照してください。

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="xxzrpNa" data-user="geolonia" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/geolonia/pen/xxzrpNa">
  ドラッグしたマーカーの緯度・経度を取得する</a> by Geolonia (<a href="https://codepen.io/geolonia">@geolonia</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

<a class="codepen" href="https://codepen.io/geolonia/pen/xxzrpNa" target="codepen"><i class="icon icon--codepen"></i> CodePen でサンプルコードを編集</a>
