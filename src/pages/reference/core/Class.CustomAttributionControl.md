---
layout: ../../../layouts/ApiLayout.astro
title: 'Class: CustomAttributionControl'
page: reference
---

[**@geolonia/maps-core**](/reference/core/)

***

[@geolonia/maps-core](/reference/core/) / CustomAttributionControl

# Class: CustomAttributionControl

帰属表示（アトリビューション）を表示する、Geolonia 向けにカスタムしたコントロールです。

MapLibre 標準の `AttributionControl` をもとにしており、`IControl` を実装します。
スタイルの衝突を防ぐためにコンテナを Shadow DOM で分離し、コントロール用の CSS を
その内部に閉じ込めます。地図の表示幅が狭いとき（またはオプション指定時）は "i" アイコンに
折りたたむコンパクト表示に切り替わり、印刷時には自動的に展開表示へ切り替えます。

## Example

```ts
map.addControl(new CustomAttributionControl(), "bottom-right");
```

## Implements

- `IControl`

## Constructors

### Constructor

> **new CustomAttributionControl**(`options?`): `CustomAttributionControl`

コントロールを生成します。

#### Parameters

##### options?

`CustomAttributionControlOptions` = `{}`

帰属表示の挙動を指定するオプションです。省略した場合は空のオブジェクトが使われます。

#### Returns

`CustomAttributionControl`

## Methods

### \_setElementTitle()

> **\_setElementTitle**(`element`, `title`): `void`

#### Parameters

##### element

`HTMLElement`

##### title

`string`

#### Returns

`void`

***

### \_toggleAttribution()

> **\_toggleAttribution**(): `void`

#### Returns

`void`

***

### \_updateAttributions()

> **\_updateAttributions**(): `void`

#### Returns

`void`

***

### \_updateCompact()

> **\_updateCompact**(): `void`

#### Returns

`void`

***

### \_updateCompactMinimize()

> **\_updateCompactMinimize**(): `void`

#### Returns

`void`

***

### \_updateData()

> **\_updateData**(`e`): `void`

#### Parameters

##### e

`StyleDataEvent`

#### Returns

`void`

***

### getDefaultPosition()

> **getDefaultPosition**(): `ControlPosition`

このコントロールの既定の表示位置を返します。

#### Returns

`ControlPosition`

既定の表示位置である `"bottom-right"` を返します。

#### Implementation of

`IControl.getDefaultPosition`

***

### onAdd()

> **onAdd**(`map`): `HTMLDivElement`

コントロールが地図に追加されるときに呼び出されます。

Shadow DOM を持つコンテナ要素を生成し、その内部に帰属表示用の要素と CSS を組み立てます。
あわせて帰属表示の内容を初期化し、地図の各種イベント（`styledata`、`sourcedata`、`terrain`、
`resize`、`drag`）や印刷メディアクエリの変化を監視するリスナーを登録します。

#### Parameters

##### map

`Map$1`

このコントロールを追加する対象の地図です。

#### Returns

`HTMLDivElement`

地図に挿入するコントロールのルート要素を返します。

#### Implementation of

`IControl.onAdd`

***

### onRemove()

> **onRemove**(): `void`

コントロールが地図から取り除かれるときに呼び出されます。

生成したコンテナ要素を DOM から削除し、`onAdd` で登録した地図のイベントリスナーと
印刷メディアクエリのリスナーを解除したうえで、内部で保持している状態を破棄します。

#### Returns

`void`

#### Implementation of

`IControl.onRemove`
