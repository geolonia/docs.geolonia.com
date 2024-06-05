---
layout: default
keywords:
comments: false

title: 複数のレイヤーをトグルで表示・非表示する
description: 複数のレイヤーをトグルで表示・非表示する方法を紹介します。

micro_nav: true

breadcrumbs:
    - title: クックブック
      url: /cookbook/
    - title: 複数のレイヤーをトグルで表示・非表示する
      url: /cookbook/switch-marker/
---

## 概要

複数のレイヤーを表示・非表示する方法を[Geolonia のJavaScript API](https://docs.geolonia.com/embed-api/javascript/)を使用して実装する方法を紹介します。

## 地図の初期化

以下のように地図を初期化します。

```css
/* CSS */
html,
body,
#map {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
```

```html
<!--HTML-->
<div id="map"></div>
```

```js
// JavaScript
const map = new geolonia.Map({
  container: "#map",
  center: [139.691087, 35.688775],
  zoom: 14
});
```

## マーカーを表示するための GeoJSON データを読み込む

以下のように GeoJSON データを読み込み、カテゴリーAとカテゴリーBのレイヤーを追加します。

```js
// GeoJSONソースのデータ
const geojsonData = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [139.6917, 35.6895]
      },
      properties: {
        category: "A"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [139.68871, 35.69005]
      },
      properties: {
        category: "A"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [139.69202, 35.68774]
      },
      properties: {
        category: "B"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [139.68968, 35.6876]
      },
      properties: {
        category: "B"
      }
    }
  ]
};

// 地図が読み込まれたときの処理
map.on("load", () => {

  // GeoJSONソースを追加
  map.addSource("source", {
    type: "geojson",
    data: geojsonData
  });

  // Category A （赤）のレイヤーを追加
  map.addLayer({
    id: "markerA",
    type: "circle",
    source: "source",
    paint: {
      "circle-radius": 10,
      "circle-color": "#FF0000",
      "circle-stroke-width": 3,
      "circle-stroke-color": "#ffffff"
    },
    filter: ["==", ["get", "category"], "A"]
  });

  // Category B （青）のレイヤーを追加
  map.addLayer({
    id: "markerB",
    type: "circle",
    source: "source",
    paint: {
      "circle-radius": 10,
      "circle-color": "#0000FF",
      "circle-stroke-width": 3,
      "circle-stroke-color": "#ffffff"
    },
    filter: ["==", ["get", "category"], "B"]
  });
});
```


## トグルを用意する

トグルボタンを用意します。デモでは Bootstrap を Pen Settings から読み込んでいます。

```html
  <div class="form-check form-switch">
    <input class="form-check-input" type="checkbox" role="switch" id="type-a" checked>
    <label class="form-check-label" for="type-a">タイプA</label>
  </div>
  <div class="form-check form-switch">
    <input class="form-check-input" type="checkbox" role="switch" id="type-b" checked>
    <label class="form-check-label" for="type-b">タイプB</label>
  </div>
```


## マーカーの表示・非表示を切り替える

[setLayoutProperty](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/#setlayoutproperty) を使用して、トグルをクリックした時にマーカーの表示・非表示を切り替えます。

```js
map.on("load", () => {

  // ... 省略 ...

  // トグルのクリックイベントでレイヤーの表示・非表示を切り替える
  const toggleA = document.getElementById("type-a");
  toggleA.addEventListener("click", (e) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      // チェックがされていれば Aのマーカーを表示
      map.setLayoutProperty("markerA", "visibility", "visible");
    } else {
      // チェックが外れていれば Aのマーカーを非表示
      map.setLayoutProperty("markerA", "visibility", "none");
    }
  });

  // ... トグルBの処理も同様に追加 ...
});
```

## サンプルコード

サンプルコードの全体は以下の CodePen よりご確認いただけます。

<p class="codepen" data-height="300" data-default-tab="js,result" data-slug-hash="XWwNwvB" data-pen-title="トグルボタンでマーカーの表示・非表示" data-user="geolonia" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/geolonia/pen/XWwNwvB">
  トグルボタンでマーカーの表示・非表示</a> by Geolonia (<a href="https://codepen.io/geolonia">@geolonia</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
