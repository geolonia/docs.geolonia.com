---
layout: ../../../layouts/ApiLayout.astro
title: 'Class: MapElement'
page: reference
---

[**@geolonia/maps-suite**](/reference/suite/)

***

[@geolonia/maps-suite](/reference/suite/) / [geolonia](/reference/suite/Namespace.geolonia) / [maps](/reference/suite/geolonia.Namespace.maps) / MapElement

# Class: MapElement

`<geolonia-map>` カスタム要素は、プレーンな HTML で地図をページに配置する
宣言的な方法です。内部で [Map](/reference/suite/geolonia.maps.Class.Map) を生成・管理しており、
[innerMap](#innermap) プロパティを通じてアクセスできます。

この要素はモジュールの読み込み時に `geolonia-map` として自身を登録するため、
マークアップ内でそのままタグを使用できます。

### 属性

| 属性 | 説明 |
| --------- | ----------- |
| `center` | `"lat,lng"` 形式の初期中心 |
| `zoom` | 初期ズームレベル |
| `map-id` | 地図インスタンスの識別子 |
| `map-style` | 地図のスタイル識別子または URL |
| `api-key` | Geolonia の API キー |
| `tilt-interaction-disabled` | 真偽値属性。指定するとチルト（傾き）操作を無効化します |
| `heading-interaction-disabled` | 真偽値属性。指定すると回転操作を無効化します |

### イベント

- `geolonia-zoomchange` — ズームレベルが変化したときに発行されます。

## Example

```html
<geolonia-map
  center="35.6812,139.7671"
  zoom="14"
  map-style="geolonia/basic-v2"
  api-key="YOUR-API-KEY"
  style="display:block; width:100%; height:400px;"
></geolonia-map>

<script>
  const el = document.querySelector("geolonia-map");
  el.addEventListener("geolonia-zoomchange", () => {
    console.log("zoom is now", el.innerMap.getZoom());
  });
</script>
```

## Extends

- `HTMLElement`

## Constructors

### Constructor

> **new MapElement**(): `MapElement`

#### Returns

`MapElement`

#### Inherited from

`HTMLElement.constructor`

## Accessors

### apiKey

#### Get Signature

> **get** **apiKey**(): `string` \| `undefined`

Geolonia の API キーです。

##### Returns

`string` \| `undefined`

#### Set Signature

> **set** **apiKey**(`value`): `void`

##### Parameters

###### value

`string` \| `undefined`

##### Returns

`void`

***

### center

#### Get Signature

> **get** **center**(): [`LatLngLiteral`](/reference/suite/geolonia.maps.Interface.LatLngLiteral) \| [`LatLng`](/reference/suite/geolonia.maps.Class.LatLng) \| `undefined`

地図の中心です。接続後に読み取ると現在の地図の値を反映し、書き込むと
地図の中心を移動します。

##### Returns

[`LatLngLiteral`](/reference/suite/geolonia.maps.Interface.LatLngLiteral) \| [`LatLng`](/reference/suite/geolonia.maps.Class.LatLng) \| `undefined`

#### Set Signature

> **set** **center**(`value`): `void`

##### Parameters

###### value

`string` \| [`LatLngLiteralOrLatLng`](/reference/suite/geolonia.maps.TypeAlias.LatLngLiteralOrLatLng) \| `undefined`

`{ lat, lng }` / [LatLng](/reference/suite/geolonia.maps.Class.LatLng) のほか、属性と同じ
  `"lat,lng"` 形式の文字列も受け付けます。React のようにカスタム要素へ
  属性ではなくプロパティで値を渡すフレームワークからも同じ記述で動くように
  するためです。解釈できない文字列は無視され、現在の値を保ちます。

##### Returns

`void`

***

### headingInteractionDisabled

#### Get Signature

> **get** **headingInteractionDisabled**(): `boolean`

回転操作が無効化されているかどうかを示します。

##### Returns

`boolean`

#### Set Signature

> **set** **headingInteractionDisabled**(`value`): `void`

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### innerMap

#### Get Signature

> **get** **innerMap**(): [`Map`](/reference/suite/geolonia.maps.Class.Map) \| `null`

この要素が管理する [Map](/reference/suite/geolonia.maps.Class.Map) インスタンスです。要素が DOM に接続される前は
`null` になります。命令的な API のすべてを利用するために使用します。

##### Returns

[`Map`](/reference/suite/geolonia.maps.Class.Map) \| `null`

***

### mapId

#### Get Signature

> **get** **mapId**(): `string`

地図インスタンスの識別子です。

##### Returns

`string`

#### Set Signature

> **set** **mapId**(`value`): `void`

##### Parameters

###### value

`string`

##### Returns

`void`

***

### mapStyle

#### Get Signature

> **get** **mapStyle**(): `string` \| `undefined`

地図のスタイル識別子または URL です。

##### Returns

`string` \| `undefined`

#### Set Signature

> **set** **mapStyle**(`value`): `void`

##### Parameters

###### value

`string` \| `undefined`

##### Returns

`void`

***

### tiltInteractionDisabled

#### Get Signature

> **get** **tiltInteractionDisabled**(): `boolean`

チルト（傾き）操作が無効化されているかどうかを示します。

##### Returns

`boolean`

#### Set Signature

> **set** **tiltInteractionDisabled**(`value`): `void`

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### zoom

#### Get Signature

> **get** **zoom**(): `number` \| `undefined`

地図のズームレベルです。接続後に読み取ると現在の地図の値を反映し、
書き込むとズームレベルを変更します。

##### Returns

`number` \| `undefined`

#### Set Signature

> **set** **zoom**(`value`): `void`

##### Parameters

###### value

`string` \| `number` \| `undefined`

数値のほか、属性と同じ数値形式の文字列も受け付けます。
  数値として解釈できない文字列は無視され、現在の値を保ちます。

##### Returns

`void`

***

### observedAttributes

#### Get Signature

> **get** `static` **observedAttributes**(): `string`[]

##### Returns

`string`[]

## Methods

### attributeChangedCallback()

> **attributeChangedCallback**(`name`, `_oldValue`, `newValue`): `void`

#### Parameters

##### name

`string`

##### \_oldValue

`string` \| `null`

##### newValue

`string` \| `null`

#### Returns

`void`

***

### connectedCallback()

> **connectedCallback**(): `void`

#### Returns

`void`

***

### disconnectedCallback()

> **disconnectedCallback**(): `void`

#### Returns

`void`
