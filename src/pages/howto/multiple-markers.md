---
layout: ../../layouts/DocLayout.astro
title: マーカーを複数置くには
page: howto
quadrant: ハウツー / レシピ
---

複数の地点をまとめて地図に出すレシピ。1点だけなら `data-marker="on"` で十分。**2点以上は「一覧データ＋ループ」**で考えます。

## 1. 点の一覧を用意する

座標は **[経度, 緯度]** の順です。

```js
const points = [
  { name: "東京駅",     lng: 139.767125, lat: 35.681236 },
  { name: "新宿駅",     lng: 139.700258, lat: 35.690921 },
  { name: "渋谷駅",     lng: 139.701636, lat: 35.658034 },
];
```

## 2. embed で全マーカーを描く

地図の `div` の中に、点の数だけ `geolonia-marker` を並べます（テンプレートや JS で生成）。

```html
<div class="geolonia" data-lat="35.68" data-lng="139.75" data-zoom="11" data-marker="off">
  <div class="geolonia-marker" data-lat="35.681236" data-lng="139.767125">東京駅</div>
  <div class="geolonia-marker" data-lat="35.690921" data-lng="139.700258">新宿駅</div>
  <!-- 点の数だけ繰り返す -->
</div>
```

下は実際に描画される地図です（このページは Markdown ですが、生 HTML を書けば地図も動きます）。

<div class="map-box"><div class="geolonia" data-lat="35.68" data-lng="139.75" data-zoom="11" data-marker="off"><div class="geolonia-marker" data-lat="35.681236" data-lng="139.767125">東京駅</div><div class="geolonia-marker" data-lat="35.690921" data-lng="139.700258">新宿駅</div><div class="geolonia-marker" data-lat="35.658034" data-lng="139.701636">渋谷駅</div><div class="geolonia-marker" data-lat="35.714765" data-lng="139.796747">浅草寺</div><div class="geolonia-marker" data-lat="35.658581" data-lng="139.745438">東京タワー</div></div></div>

## つまずいたら

- ピンが海に出る → 座標が `[緯度, 経度]` 逆。`[経度, 緯度]` に直す。
- 数百点で重い・団子 → クラスタリング（`data-cluster="on"`）。
- 命令型で1個も出ない → `map.on('load', …)` の中で `addTo` する。

> インタラクティブな編集（コードをいじって即反映）が欲しくなったら、このレシピを `.astro` 化する。
