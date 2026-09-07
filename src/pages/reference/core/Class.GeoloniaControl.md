---
layout: ../../../layouts/ApiLayout.astro
title: 'Class: GeoloniaControl'
page: reference
---

[**@geolonia/maps-core**](/reference/core/)

***

[@geolonia/maps-core](/reference/core/) / GeoloniaControl

# Class: GeoloniaControl

地図上に Geolonia のロゴを表示するコントロールです。

MapLibre の `IControl` を実装しており、`Map.addControl` で地図に追加できます。
表示されるロゴは Geolonia のサイト（`https://geolonia.com/`）へのリンクになっており、
クリックすると同サイトを開きます。

## Example

```ts
map.addControl(new GeoloniaControl(), "bottom-left");
```

## Implements

- `IControl`

## Constructors

### Constructor

> **new GeoloniaControl**(): `GeoloniaControl`

#### Returns

`GeoloniaControl`

## Methods

### getDefaultPosition()

> **getDefaultPosition**(): `ControlPosition`

このコントロールの既定の表示位置を返します。

`Map.addControl` で位置を明示しなかった場合に使用されます。

#### Returns

`ControlPosition`

既定の表示位置 `"bottom-left"`。

#### Implementation of

`IControl.getDefaultPosition`

***

### onAdd()

> **onAdd**(): `HTMLDivElement`

コントロールの DOM 要素を生成して返します。

`IControl` の実装として、`Map.addControl` で地図に追加された際に MapLibre から呼び出されます。
Geolonia のロゴ画像を含み、`https://geolonia.com/` へのリンクが設定された要素を組み立てて返します。

#### Returns

`HTMLDivElement`

このコントロールのコンテナとなる `HTMLDivElement`。

#### Implementation of

`IControl.onAdd`

***

### onRemove()

> **onRemove**(): `void`

コントロールの DOM 要素を地図から除去します。

`IControl` の実装として、`Map.removeControl` で地図から取り除かれた際に MapLibre から呼び出されます。
`onAdd` で生成したコンテナを親ノードから削除します。

#### Returns

`void`

#### Implementation of

`IControl.onRemove`
