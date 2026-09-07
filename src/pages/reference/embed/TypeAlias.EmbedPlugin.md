---
layout: ../../../layouts/ApiLayout.astro
title: 'Type Alias: EmbedPlugin<PluginAttributes>'
page: reference
---

[**@geolonia/embed**](/reference/embed/)

***

[@geolonia/embed](/reference/embed/) / EmbedPlugin

# Type Alias: EmbedPlugin\<PluginAttributes\>

> **EmbedPlugin**\<`PluginAttributes`\> = (`map`, `target`, `atts`) => `void`

埋め込みプラグインの型。地図インスタンス、対象のコンテナ要素、正規化済みの
[EmbedAttributes](/reference/embed/TypeAlias.EmbedAttributes) を受け取って呼び出される。

呼び出しのタイミングは地図の生成時点で異なる。`DOMContentLoaded` 後に生成された
地図では生成直後に呼び出される。それ以前に生成された地図では `DOMContentLoaded`
まで保留され、そのイベント時にまとめて呼び出される。呼び出し前に削除された地図に
対しては呼び出されない。

## Type Parameters

### PluginAttributes

`PluginAttributes` *extends* `object` = \{\[`otherKey`: `string`\]: `string`; \}

## Parameters

### map

`GeoloniaMap`

### target

`HTMLElement`

### atts

[`EmbedAttributes`](/reference/embed/TypeAlias.EmbedAttributes) & `PluginAttributes`

## Returns

`void`
