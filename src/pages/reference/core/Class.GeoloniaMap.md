---
layout: ../../../layouts/ApiLayout.astro
title: 'Class: GeoloniaMap'
page: reference
---

[**@geolonia/maps-core**](/reference/core/)

***

[@geolonia/maps-core](/reference/core/) / GeoloniaMap

# Class: GeoloniaMap

MapLibre GL JS の `Map` を拡張し、Geolonia 固有の機能を追加した地図クラスです。

API キーによる認証、Geolonia のスタイルやタイルへの接続、PMTiles プロトコルの登録、
デフォルトマーカーや各種コントロール、SimpleStyle による GeoJSON 表示、
ジェスチャ操作、3D 表示などを、コンストラクタに渡す [GeoloniaMapOptions](/reference/core/TypeAlias.GeoloniaMapOptions)
だけで有効にできます。

コンストラクタには [GeoloniaMapOptions](/reference/core/TypeAlias.GeoloniaMapOptions) オブジェクトを渡します。
ただし旧 embed API との後方互換のため、CSS セレクタ文字列や `HTMLElement`
を直接渡すこともできます。その場合はコンテナ要素の `data-*` 属性が
オプションとして読み込まれます。

同一のコンテナ要素に対して二重にインスタンスを生成しようとした場合は、
新たに生成せず、既存のインスタンスをそのまま返します（シングルトン）。

`Map` を継承しているため、`addLayer`、`addSource`、`on`、`getZoom` など
MapLibre GL JS の API はすべてそのまま利用できます。

## Examples

```typescript
const map = new GeoloniaMap({
  container: "#map",
  apiKey: "YOUR-API-KEY",
  style: "geolonia/basic-v2",
  center: [139.7671, 35.6812],
  zoom: 14,
});

map.on("load", () => {
  console.log("地図の読み込みが完了しました");
});
```

後方互換の書き方として、コンテナのセレクタ文字列だけを渡すこともできます。
この場合は `data-*` 属性から設定を読み込みます。
```typescript
// <div id="map" data-zoom="14" data-center="139.7671, 35.6812"></div>
const map = new GeoloniaMap("#map");
```

## Extends

- `Map$1`

## Constructors

### Constructor

> **new GeoloniaMap**(`arg`): `GeoloniaMap`

地図を生成します。

`apiKey` や `stage` が指定されていればキーリングに設定し、スタイル
（既定は `"geolonia/basic-v2"`）を実際の style.json の URL に解決してから
MapLibre GL JS の `Map` を初期化します。あわせて Geolonia のロゴ、出典表示、
ナビゲーションなどのコントロールを追加し、読み込み完了後にはローディング表示の
除去、デフォルトマーカーの配置、ジェスチャ操作やスタイル拡張の適用を行います。

`arg` にコンテナを直接指定する後方互換の形式では、そのコンテナの `data-*`
属性から設定を読み込みます。指定したコンテナに既に地図が生成済みの場合は、
新規生成せず既存のインスタンスを返します。

#### Parameters

##### arg

`string` \| `HTMLElement` \| [`GeoloniaMapOptions`](/reference/core/TypeAlias.GeoloniaMapOptions)

地図の設定です。[GeoloniaMapOptions](/reference/core/TypeAlias.GeoloniaMapOptions) オブジェクトのほか、
  後方互換としてコンテナを指す CSS セレクタ文字列や `HTMLElement` も指定できます。

#### Returns

`GeoloniaMap`

#### Throws

コンテナ要素が見つからない場合に `Error` を投げます。

#### Throws

Geolonia のスタイルを API キーなしで使おうとした場合に `Error` を投げます。

#### Throws

MapLibre GL JS の `Map` の初期化に失敗した場合、コンテナにエラー表示を
  行ったうえで、その例外を再スローします。

#### Example

```typescript
const map = new GeoloniaMap({
  container: "#map",
  apiKey: "YOUR-API-KEY",
  center: [139.7671, 35.6812],
  zoom: 14,
});
```

#### Overrides

`maplibregl.Map.constructor`

## Methods

### loadImage()

画像を読み込みます。

`callback` を渡した場合は後方互換のコールバック形式で結果を受け取り、戻り値は
`undefined` になります。`callback` を省略した場合は `Promise` を返します。

#### Param

**url**

読み込む画像の URL です。

#### Param

**callback**

省略可能です。指定した場合はコールバック形式で結果を受け取ります。

#### Example

```typescript
const map = new GeoloniaMap({ container: "#map", apiKey: "YOUR-API-KEY" });
map.on("load", async () => {
  const image = await map.loadImage("https://example.com/marker.png");
  map.addImage("custom-marker", image.data);
});
```

#### Call Signature

> **loadImage**(`url`, `callback`): `void`

画像を読み込み、結果をコールバックで受け取ります（後方互換のコールバック形式）。

読み込みに成功すると `callback(null, image, expiry)`、失敗すると
`callback(error)` の形で呼び出されます。

##### Parameters

###### url

`string`

読み込む画像の URL です。

###### callback

`GetImageCallback`

読み込み結果を受け取るコールバックです。

##### Returns

`void`

##### Overrides

`maplibregl.Map.loadImage`

#### Call Signature

> **loadImage**(`url`): `Promise`\<`GetResourceResponse`\<`HTMLImageElement` \| `ImageBitmap`\>\>

画像を読み込み、`Promise` で結果を受け取ります。

##### Parameters

###### url

`string`

読み込む画像の URL です。

##### Returns

`Promise`\<`GetResourceResponse`\<`HTMLImageElement` \| `ImageBitmap`\>\>

読み込んだ画像を含むレスポンスに解決される `Promise` を返します。

##### Overrides

`maplibregl.Map.loadImage`

***

### remove()

> **remove**(): `void`

地図を破棄し、関連するリソースやイベントリスナーを解放します。

MapLibre GL JS の破棄処理に加えて、コンテナ要素に保持している地図インスタンスへの
参照（`geoloniaMap`）も削除します。これにより、同じコンテナで再度
GeoloniaMap を生成した際に、破棄済みのインスタンスが返されることを防ぎます。

#### Returns

`void`

#### Example

```typescript
const map = new GeoloniaMap({ container: "#map", apiKey: "YOUR-API-KEY" });
// 不要になったら破棄します
map.remove();
```

#### Overrides

`maplibregl.Map.remove`

***

### setStyle()

> **setStyle**(`style`, `options?`): `this`

地図のスタイルを差し替えます。

`style` が文字列の場合は、Geolonia のスタイル論理名（`"geolonia/basic-v2"`
など）、style.json の URL、相対パスのいずれかとして解釈し、実際の URL に
解決してから適用します。解決の際の言語はブラウザ言語に従い、API キーは
キーリングに設定済みの値を使います。`StyleSpecification` オブジェクトを
直接渡した場合はそのまま適用します。

#### Parameters

##### style

`string` \| `StyleSpecification`

新しいスタイルです。スタイル論理名や URL などの文字列、または
  `StyleSpecification` オブジェクトを指定します。

##### options?

`StyleSwapOptions` & `StyleOptions` = `{}`

MapLibre GL JS に渡すスタイル差し替えオプションです。
  既定は空のオブジェクトです。

#### Returns

`this`

メソッドチェーンのために自身を返します。

#### Throws

Geolonia のスタイルを API キーなしで使おうとした場合に `Error` を投げます。

#### Example

```typescript
const map = new GeoloniaMap({ container: "#map", apiKey: "YOUR-API-KEY" });
map.setStyle("geolonia/gsi");
```

#### Overrides

`maplibregl.Map.setStyle`
