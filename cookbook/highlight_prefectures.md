---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: カスタムコントロールのセレクトボックスで選択した都道府県をハイライト表示する
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
page_nav:
    prev:
        content: ドラッグしたマーカーの緯度・経度を取得する
        url: '/cookbook/draggable_marker/'

breadcrumbs:
    - title: クックブック
      url: /cookbook/
    - title: カスタムコントロールのセレクトボックスで選択した都道府県をハイライト表示する
      url: /cookbook/highlight_prefectures/
---

## 都道府県のポリゴンデータを取得する

```html
<div id="map"></div>
```

で用意した div タグ内に地図を表示するため、ID である `map` を指定し geolonia.Map のインスタンスを生成します。

地図が読み込まれたら、[geolonia / prefecture-tiles](https://github.com/geolonia/prefecture-tiles) で公開している prefectures.geojson を取得し、レスポンスの json データを `geojson` に格納します。


```javascript
const map = new geolonia.Map('#map')
map.on('load', async () => {
  const resp = await fetch('https://raw.githubusercontent.com/geolonia/prefecture-tiles/master/prefectures.geojson')
  const geojson = await resp.json()
  //...
```

## 都道府県のレイヤーを地図に追加する

続いて、`addLayer` で取得した geojson データを地図に追加します。

geojson データは、全都道府県のポリゴンデータがまとめて入った FeatureCollection タイプのデータなのですが、個別に指定して表示/非表示が切り替えられるように、それぞれの都道府県(Featureタイプのデータ)に都道府県コード(すでに properties の一つにセットされている)を ID として割り当てる処理を addLayer の前におこなっています。

```javascript
const prefectures = geojson.features.map(pref => { return {...pref, ...{id: pref.properties.code}}})
map.addLayer({
  id: 'prefectures',
  type: 'fill',
  source: {
    type: 'geojson',
    data: {
      "type": "FeatureCollection",
      "features": prefectures
    }
  },
  layout: {},
  paint: {
    'fill-color': '#ff0000',
    'fill-opacity': [
      'case', ['boolean', ['feature-state', 'active'], false], 1, 0
    ]
  }
})
```

paint プロパティでは、`'fill-color': '#ff0000'` で赤色に塗りつぶすように指定し、`'fill-opacity'` で透明度を指定しているのですが、その値には

```javascript
[
  'case', ['boolean', ['feature-state', 'active'], false], 1, 0
]
```

という、[MapLibre GL JS の StyleSpecification](https://maplibre.org/maplibre-gl-js-docs/style-spec/expressions/#case) で定義されている Expressions のひとつである case 文を使っています。

この値は、各都道府県の `feature-state` の `active` が true のときには1(不透明)が、false のときには0(透明)がセットされるということを意味しています。つまり、`active` を true にセットするとその都道府県がハイライトされます。デフォルトは false なので、最初はどの都道府県もハイライトされていない状態になります。

## 都道府県セレクトボックス(カスタムコントロール)を追加

後述する PrefectureSelectBox クラスに geojson データを引数として渡して初期化したあと、カスタムコントロールとして地図に追加します。

```javascript
const prefectureSelectBox = new PrefectureSelectBox(prefectures)
map.addControl(prefectureSelectBox)
```

## カスタムコントロール用のクラスを定義

カスタムコントロール用のクラス `PrefectureSelectBox` を定義します。

```javascript
class PrefectureSelectBox {
  constructor(prefectures) {
    this._prefectures = prefectures
    this._selectedPrefectureCode = undefined
  }
  //...
```

コンストラクタで、引数と渡ってくる prefectures をインスタンス変数の _prefectures にセットし、選択された都道府県コードを格納するための _selectedPrefectureCode も用意します。

カスタムコントロール用のクラスには、そのコントロールが地図上に追加されたときに呼ばれる `onAdd` 関数を定義しなければなりません。ここでは `this._prefecture` に格納された都道府県データを利用して、都道府県名を選択できるセレクトボックスを作っています。

```javascript
onAdd(map) {
  this._map = map
  
  // 都道府県を選ぶセレクトボックスを作る
  this._container = document.createElement('div')
  this._container.className = 'maplibregl-ctrl'
  this._container.innerHTML = '<select name="prefecture">'
    + this._prefectures.map(pref => { return `<option value="${pref.properties.code}">${pref.properties.name}</option>` })
    + '</select>';
  //...
```

都道府県のどれかが選択されたときの処理を、セレクトボックスの `change` イベントに割り当てます。

前回選択した都道府県がある場合には、`this._selectedPrefectureCode` に格納された都道府県コードを ID とする Feature の `feature-state` の `active` の値を false に変えています。これによって前述した fill-opacity の値が 0 になって透明に、つまりハイライト表示が無効になります。

次に、セレクトボックスで選択された都道府県にひもづく都道府県コードを `this._selectedPrefectureCode` に格納し直し、同じ要領で `feature-state` の `active` の値を true に変えることで、選ばれた都道府県のハイライト表示を有効にします。

```javascript
// 都道府県が選択されたときに呼ばれる
this._container.addEventListener("change", (e) => {      
  
  // 前回選択した都道府県があれば、ハイライト表示を無効にする
  if (this._selectedPrefectureCode) {
    this._map.setFeatureState(
      { source: 'prefectures', id: this._selectedPrefectureCode },
      { active: false }
    );
  }
  
  // 選択した都道府県のハイライト表示を有効にする
  this._selectedPrefectureCode = e.target.value
  this._map.setFeatureState(
    { source: 'prefectures', id: this._selectedPrefectureCode },
    { active: true }
  );

  // 選択された都道府県をフォーカスする
  const selectedPrefecture = this._prefectures.find(prefecture => prefecture.properties.code === this._selectedPrefectureCode)
  const prefectureGeojson = {
    type: 'FeatureCollection',
    features: [selectedPrefecture]
  }
  this._map.fitBounds(geojsonExtent(prefectureGeojson))
})
```

後半では、[mapbox / geojson-extent](https://github.com/mapbox/geojson-extent) というライブラリを使い、選択された都道府県の geojson データから、バウンディングボックス情報(その都道府県をふちどる枠をかたどる緯度経度の配列)を抽出し、`fitBounds` に渡すことで、選択した都道府県にフォーカスするように移動できるようにしています。

onAdd の最後では、このようにして作成した this._container を返り値として返しています。

```javascript
return this._container
```

カスタムコントロールが削除されるときに呼ばれる `onRemove` も定義します。

```javascript
onRemove() {
  this._container.parentNode.removeChild(this.container)
  this._map = undefined
}
```

コード全体を見るには、以下の CodePen のサンプルコードを参照してください。

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="xxzLwGx" data-user="geolonia" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/geolonia/pen/xxzLwGx">
  カスタムコントロールのセレクトボックスで選択した都道府県をハイライト表示する</a> by Geolonia (<a href="https://codepen.io/geolonia">@geolonia</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

<a class="codepen" href="https://codepen.io/geolonia/pen/xxzLwGx" target="codepen"><i class="icon icon--codepen"></i> CodePen でサンプルコードを編集</a>
