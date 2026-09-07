---
layout: ../../../layouts/ApiLayout.astro
title: 'Class: Map'
page: reference
---

[**@geolonia/maps-suite**](/reference/suite/)

***

[@geolonia/maps-suite](/reference/suite/) / [geolonia](/reference/suite/Namespace.geolonia) / [maps](/reference/suite/geolonia.Namespace.maps) / Map

# Class: Map

メインの地図クラスです。コンテナ要素にインタラクティブな地図を描画し、
カメラの制御や変更の監視を行うための命令的な API を提供します。

カメラの変更（[setCenter](#setcenter)、[setZoom](#setzoom)、
[fitBounds](#fitbounds) など）は、構築直後に呼び出しても
安全です。地図の読み込みが完了し次第、反映されます。変更を監視するには
[addListener](/reference/suite/geolonia.maps.Class.MVCObject#addlistener) で登録します。地図は
`center_changed`、`zoom_changed`、`bounds_changed`、`idle`、`click` のイベントを発火します。

## Example

```typescript
const map = new geolonia.maps.Map(document.getElementById("map"), {
  center: { lat: 35.6812, lng: 139.7671 },
  zoom: 14,
  style: "geolonia/basic-v2",
  apiKey: "YOUR-API-KEY",
});

map.addListener("click", (e) => {
  console.log("クリック位置:", e.latLng);
});
```

## Extends

- [`MVCObject`](/reference/suite/geolonia.maps.Class.MVCObject)

## Constructors

### Constructor

> **new Map**(`mapDiv`, `options?`): `Map`

指定したコンテナ要素の中に地図を作成します。

#### Parameters

##### mapDiv

`HTMLElement`

地図を描画する要素です。`HTMLElement` である必要があり、
  文字列の id を渡すと例外が発生します。

##### options?

[`MapOptions`](/reference/suite/geolonia.maps.Interface.MapOptions) = `{}`

初期のカメラ位置、スタイル、API キーです。

#### Returns

`Map`

#### Overrides

[`MVCObject`](/reference/suite/geolonia.maps.Class.MVCObject).[`constructor`](/reference/suite/geolonia.maps.Class.MVCObject#constructor)

## Accessors

### data

#### Get Signature

> **get** **data**(): [`Data`](/reference/suite/geolonia.maps.Class.Data)

この地図に紐づく [Data](/reference/suite/geolonia.maps.Class.Data) レイヤーです。

GeoJSON の地物をまとめて描画するために使用します。初回アクセス時に生成され、
以降は同じインスタンスを返します。生成された時点でこの地図に追加されます。

##### Example

```typescript
map.data.addGeoJson(featureCollection);
map.data.setStyle({ fillColor: "#ff0000", strokeWeight: 2 });
```

##### Returns

[`Data`](/reference/suite/geolonia.maps.Class.Data)

## Methods

### addListener()

> **addListener**(`eventName`, `handler`): [`MapsEventListener`](/reference/suite/geolonia.maps.TypeAlias.MapsEventListener)

指定した名前のイベントが発火するたびに実行されるハンドラを登録します。

#### Parameters

##### eventName

`string`

監視するイベント。`"click"` や `"{property}_changed"`
  イベントなどです。

##### handler

[`EventHandler`](/reference/suite/geolonia.maps.TypeAlias.EventHandler)

イベントが発火するたびに、そのイベントの引数とともに呼び出されます。

#### Returns

[`MapsEventListener`](/reference/suite/geolonia.maps.TypeAlias.MapsEventListener)

[MapsEventListener](/reference/suite/geolonia.maps.TypeAlias.MapsEventListener) ハンドル。登録を解除するには `remove()` を
  呼び出します。

#### Inherited from

[`MVCObject`](/reference/suite/geolonia.maps.Class.MVCObject).[`addListener`](/reference/suite/geolonia.maps.Class.MVCObject#addlistener)

***

### bindTo()

> **bindTo**(`key`, `target`, `targetKey`, `noNotify?`): `void`

このオブジェクトの `key` プロパティを、別のオブジェクトの `targetKey`
プロパティにバインドします。これにより、`key` を読み取ると常にターゲットの値が
反映され、ターゲットが変化するたびに `{key}_changed` イベントが発火します。

#### Parameters

##### key

`string`

このオブジェクト上のプロパティ名。

##### target

[`MVCObject`](/reference/suite/geolonia.maps.Class.MVCObject)

バインド先のオブジェクト。

##### targetKey

`string`

ターゲット上のプロパティ名。

##### noNotify?

`boolean` = `false`

`true` の場合、初回およびそれ以降の `{key}_changed`
  通知を抑制します。

#### Returns

`void`

#### Inherited from

[`MVCObject`](/reference/suite/geolonia.maps.Class.MVCObject).[`bindTo`](/reference/suite/geolonia.maps.Class.MVCObject#bindto)

***

### fitBounds()

> **fitBounds**(`bounds`, `padding?`): `void`

指定した領域が表示領域に収まるように、地図を移動・ズームします。

#### Parameters

##### bounds

[`LatLngBoundsLiteralOrLatLngBounds`](/reference/suite/geolonia.maps.TypeAlias.LatLngBoundsLiteralOrLatLngBounds)

表示する領域です。

##### padding?

`number` \| [`Padding`](/reference/suite/geolonia.maps.Interface.Padding)

矩形領域（地理的な範囲）の周囲に確保する余白（ピクセル単位）です。
  すべての辺に適用される単一の値、または辺ごとに制御する [Padding](/reference/suite/geolonia.maps.Interface.Padding)
  オブジェクトのいずれかを指定します。

#### Returns

`void`

#### Example

```typescript
map.fitBounds(
  { north: 35.7, south: 35.6, east: 139.8, west: 139.7 },
  40,
);
```

***

### get()

> **get**(`key`): `any`

名前付きプロパティの値を返します。一度も設定されていない場合は `undefined`
を返します。

#### Parameters

##### key

`string`

プロパティ名。

#### Returns

`any`

#### Inherited from

[`MVCObject`](/reference/suite/geolonia.maps.Class.MVCObject).[`get`](/reference/suite/geolonia.maps.Class.MVCObject#get)

***

### getBounds()

> **getBounds**(): [`LatLngBounds`](/reference/suite/geolonia.maps.Class.LatLngBounds) \| `null`

現在表示領域に表示されている領域の矩形領域（地理的な範囲）を返します。
まだ判定できない場合は `null` を返します。

#### Returns

[`LatLngBounds`](/reference/suite/geolonia.maps.Class.LatLngBounds) \| `null`

***

### getCenter()

> **getCenter**(): [`LatLng`](/reference/suite/geolonia.maps.Class.LatLng) \| `null`

現在地図の中心に表示されている地理的な地点を返します。

#### Returns

[`LatLng`](/reference/suite/geolonia.maps.Class.LatLng) \| `null`

***

### getGeoloniaMap()

> **getGeoloniaMap**(): `GeoloniaMap`

基盤となる `GeoloniaMap`（`@geolonia/maps-core`）インスタンスを返します。

SDK がカバーしていない機能に直接アクセスする場合に使用します。
SDK が管理するプロパティ（center / zoom / tilt / heading 等）を
このインスタンス経由で直接変更した場合の動作は保証しません。

#### Returns

`GeoloniaMap`

***

### getHeading()

> **getHeading**(): `number`

現在の方位角（北からの時計回りの度数）を返します。
`0` は北向きです。

#### Returns

`number`

***

### getProjection()

> **getProjection**(): [`MapCanvasProjection`](/reference/suite/geolonia.maps.Class.MapCanvasProjection) \| `null`

地理座標と画面上のピクセルとを相互に変換するための
[MapCanvasProjection](/reference/suite/geolonia.maps.Class.MapCanvasProjection) を返します。地図の準備ができていない場合は
`null` を返します。

#### Returns

[`MapCanvasProjection`](/reference/suite/geolonia.maps.Class.MapCanvasProjection) \| `null`

***

### getTilt()

> **getTilt**(): `number`

現在のチルト角度（度単位）を返します。
`0` は真上から見下ろす状態です。

#### Returns

`number`

***

### getZoom()

> **getZoom**(): `number`

現在のズームレベルを返します。

#### Returns

`number`

***

### moveCamera()

> **moveCamera**(`options`): `void`

指定したカメラ設定を一括で即座に適用します。指定されたプロパティだけが
反映され、省略されたものは現在の値のまま保持されます。

内部的には MapLibre の `jumpTo` を用いた即時反映で、進行中のアニメーションが
あれば中断されます。互換対象の地図 SDK の `moveCamera` に相当します。

#### Parameters

##### options

[`CameraOptions`](/reference/suite/geolonia.maps.Interface.CameraOptions)

適用するカメラのオプションです。

#### Returns

`void`

#### Example

```typescript
map.moveCamera({
  center: { lat: 35.6812, lng: 139.7671 },
  zoom: 17,
  tilt: 60,
  heading: 90,
});
```

***

### notify()

> **notify**(`key`): `void`

プロパティの `{key}_changed` イベントを手動で発火し、そのすべてのリスナーに
通知します。値が [set](/reference/suite/geolonia.maps.Class.MVCObject#set) で再代入されるのではなく、その場で
変更された場合に役立ちます。

#### Parameters

##### key

`string`

プロパティ名。

#### Returns

`void`

#### Inherited from

[`MVCObject`](/reference/suite/geolonia.maps.Class.MVCObject).[`notify`](/reference/suite/geolonia.maps.Class.MVCObject#notify)

***

### panTo()

> **panTo**(`latLng`): `void`

地図の中心を指定した地点に移動します。新しい中心が現在の表示領域内にある場合は
なめらかに移動し、そうでない場合は即座に移動します。

#### Parameters

##### latLng

[`LatLngLiteralOrLatLng`](/reference/suite/geolonia.maps.TypeAlias.LatLngLiteralOrLatLng)

新しい中心です。

#### Returns

`void`

#### See

即座に移動する場合は [Map.setCenter](#setcenter) を参照してください。

***

### set()

> **set**(`key`, `value`): `void`

名前付きプロパティを設定し、その `{key}_changed` イベントを発火します。
[bindTo](/reference/suite/geolonia.maps.Class.MVCObject#bindto) でバインドされた値を置き換える場合は、
先にバインディングを削除します。

#### Parameters

##### key

`string`

プロパティ名。

##### value

`any`

新しい値。

#### Returns

`void`

#### Inherited from

[`MVCObject`](/reference/suite/geolonia.maps.Class.MVCObject).[`set`](/reference/suite/geolonia.maps.Class.MVCObject#set)

***

### setCenter()

> **setCenter**(`latLng`): `void`

地図の中心を指定した地点に、アニメーションなしで即座に移動します。

#### Parameters

##### latLng

[`LatLngLiteralOrLatLng`](/reference/suite/geolonia.maps.TypeAlias.LatLngLiteralOrLatLng)

新しい中心です。

#### Returns

`void`

#### See

アニメーション付きの移動については [Map.panTo](#panto) を参照してください。

***

### setHeading()

> **setHeading**(`heading`): `void`

地図の方位角（北からの時計回りの度数）を設定します。

内部的には MapLibre の bearing にマッピングされます。

#### Parameters

##### heading

`number`

新しい方位角（度単位）です。

#### Returns

`void`

***

### setTilt()

> **setTilt**(`tilt`): `void`

地図のチルト角度（度単位）を設定します。

#### Parameters

##### tilt

`number`

新しいチルト角度（度単位）です。

#### Returns

`void`

#### Remarks

現状は任意の値を受け付けます。互換対象の地図 SDK ではラスタタイルの場合
`0` または `45` に制限されますが、この互換性は未実装です。

***

### setValues()

> **setValues**(`values`): `void`

複数の名前付きプロパティを一度に設定し、それぞれについて `{key}_changed`
イベントを発火します。

#### Parameters

##### values

`Record`\<`string`, `any`\>

キーがプロパティ名であるオブジェクト。

#### Returns

`void`

#### Inherited from

[`MVCObject`](/reference/suite/geolonia.maps.Class.MVCObject).[`setValues`](/reference/suite/geolonia.maps.Class.MVCObject#setvalues)

***

### setZoom()

> **setZoom**(`zoom`): `void`

地図のズームレベルを設定します。数値が大きいほどより拡大します。

#### Parameters

##### zoom

`number`

新しいズームレベルです。

#### Returns

`void`

***

### unbind()

> **unbind**(`key`): `void`

`key` のバインディングを削除し、最後に同期された値を通常のプロパティとして
保持します。

#### Parameters

##### key

`string`

解放するバインド済みのプロパティ名。

#### Returns

`void`

#### Inherited from

[`MVCObject`](/reference/suite/geolonia.maps.Class.MVCObject).[`unbind`](/reference/suite/geolonia.maps.Class.MVCObject#unbind)

***

### unbindAll()

> **unbindAll**(): `void`

このオブジェクト上のすべてのバインディングを削除します。

#### Returns

`void`

#### Inherited from

[`MVCObject`](/reference/suite/geolonia.maps.Class.MVCObject).[`unbindAll`](/reference/suite/geolonia.maps.Class.MVCObject#unbindall)

***

### whenReady()

> **whenReady**(): `Promise`\<`void`\>

地図の初期化完了を待つ `Promise` を返します。

地図のスタイル読み込みやレイヤー追加など、初期化完了後に行いたい処理を
安全に実行するために使用します。

#### Returns

`Promise`\<`void`\>
