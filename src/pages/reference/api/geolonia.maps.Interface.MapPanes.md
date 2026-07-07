---
layout: ../../../layouts/ApiLayout.astro
title: 'Interface: MapPanes'
page: reference
---

[**@geolonia/maps-suite**](/reference/api/)

***

[@geolonia/maps-suite](/reference/api/) / [geolonia](/reference/api/Namespace.geolonia) / [maps](/reference/api/geolonia.Namespace.maps) / MapPanes

# Interface: MapPanes

オーバーレイが要素を追加できる DOM コンテナで、
[OverlayView.getPanes](/reference/api/geolonia.maps.Class.OverlayView#getpanes) から返されます。

## Remarks

この実装では 4 つのペインはすべて同じコンテナ要素を参照します。
別々の名前は利便性のために用意されています。

## Properties

### floatPane

> **floatPane**: `HTMLDivElement`

最上層のペインで、情報ウィンドウなどの要素用です。

***

### mapPane

> **mapPane**: `HTMLDivElement`

最下層のペインで、ベースとなる地図タイルの上に位置します。

***

### overlayLayer

> **overlayLayer**: `HTMLDivElement`

オーバーレイのグラフィック用のペイン。

***

### overlayMouseTarget

> **overlayMouseTarget**: `HTMLDivElement`

ポインターイベントを受け取るべき要素用のペイン。
