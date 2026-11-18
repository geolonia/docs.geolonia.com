---
layout: ../../../layouts/ApiLayout.astro
title: 'Type Alias: EmbedPluginAttributes'
page: reference
---

[**@geolonia/embed**](/reference/embed/)

***

[@geolonia/embed](/reference/embed/) / EmbedPluginAttributes

# Type Alias: EmbedPluginAttributes

> **EmbedPluginAttributes** = `object`

プラグインが独自に読む `data-*` 属性の型。

[EmbedAttributes](/reference/embed/TypeAlias.EmbedAttributes) のインデックスシグネチャが `number` も許すのは、
`maxZoom: 20` のように既定値が数値の組み込み属性があるため。一方こちらは
プラグイン固有の `data-*` だけを指し、`parseAtts` が `container.dataset`
(`DOMStringMap`) をそのまま広げて渡すので、実行時には必ず文字列か未定義になる。

## Index Signature

\[`otherKey`: `string`\]: `string` \| `undefined`
