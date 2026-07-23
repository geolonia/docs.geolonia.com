---
layout: ../../../layouts/ApiLayout.astro
title: 'Function: getStyle()'
page: reference
---

[**@geolonia/maps-core**](/reference/core/)

***

[@geolonia/maps-core](/reference/core/) / getStyle

# Function: getStyle()

> **getStyle**(`style`, `options`): `string`

スタイル名または URL を完全なスタイル URL に解決します。

解決のルールは次のとおりです。

- `style` が空文字の場合は、`basic-v2` のデフォルトスタイル URL を返します。
- `style` が絶対 URL または相対 URL の場合は、そのまま解決した URL を返します。
- `style` が `.json` で終わる場合は、`.json` ファイルへの URL として解決します。
- 上記以外は Geolonia の論理名とみなし、
  `https://cdn.geolonia.com/style/<name>/<ja|en>.json` を返します。

`lang` が `"ja"` または `"ja-jp"` の場合は `ja` 版、それ以外は `en` 版のスタイルを返します。

`style` が Geolonia のスタイルであるにもかかわらず API キーが指定されていない場合は
エラーを投げます。API キーは `options.apiKey`、指定がなければ `keyring.apiKey` を使用します。

## Parameters

### style

`string`

スタイル名または URL。空文字の場合はデフォルトスタイルを返します。

### options

解決時のオプション。

#### apiKey?

`string`

Geolonia スタイルの利用に必要な API キー。省略時は `keyring.apiKey` を使用します。

#### lang?

`string`

言語コード。`"ja"` または `"ja-jp"` で日本語版、省略時は `"en"`。

## Returns

`string`

解決された完全なスタイル URL。

## Throws

Geolonia のスタイルであるのに API キーが指定されていない場合。

## Example

```typescript
// 論理名を日本語版のスタイル URL に解決する
getStyle("geolonia/basic-v2", { lang: "ja", apiKey: "YOUR-API-KEY" });
// => "https://cdn.geolonia.com/style/geolonia/basic-v2/ja.json"

// 空文字を渡すとデフォルトスタイルを返す
getStyle("", { apiKey: "YOUR-API-KEY" });
// => "https://cdn.geolonia.com/style/geolonia/basic-v2/en.json"

// URL はそのまま解決する
getStyle("https://example.com/style.json", {});
// => "https://example.com/style.json"
```
