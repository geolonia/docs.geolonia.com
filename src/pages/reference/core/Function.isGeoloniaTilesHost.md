---
layout: ../../../layouts/ApiLayout.astro
title: 'Function: isGeoloniaTilesHost()'
page: reference
---

[**@geolonia/maps-core**](/reference/core/)

***

[@geolonia/maps-core](/reference/core/) / isGeoloniaTilesHost

# Function: isGeoloniaTilesHost()

> **isGeoloniaTilesHost**(`url`): `boolean`

与えられた URL が Geolonia のタイルホストかどうかを判定します。

ホスト名が `tileserver.geolonia.com` に完全一致するか、または
`.tiles.geolonia.com` で終わる場合に Geolonia のタイルホストとみなします。
URL の解釈に失敗した場合は `false` を返します。

## Parameters

### url

`string` \| `URL`

判定対象の URL 文字列または `URL` オブジェクト。

## Returns

`boolean`

Geolonia のタイルホストであれば `true`、それ以外や解釈に失敗した場合は `false`。
