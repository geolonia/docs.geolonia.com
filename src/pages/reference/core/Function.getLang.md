---
layout: ../../../layouts/ApiLayout.astro
title: 'Function: getLang()'
page: reference
---

[**@geolonia/maps-core**](/reference/core/)

***

[@geolonia/maps-core](/reference/core/) / getLang

# Function: getLang()

> **getLang**(): `"en"` \| `"ja"`

ブラウザの言語設定を検出して `"ja"` または `"en"` を返します。

`navigator.languages[0]`、なければ `navigator.language` を小文字化して判定します。
値が `"ja"` または `"ja-jp"` の場合は `"ja"`、それ以外は `"en"` を返します。
`navigator` が存在しない環境では `"en"` を返します。

## Returns

`"en"` \| `"ja"`

検出された言語。日本語なら `"ja"`、それ以外は `"en"`。
