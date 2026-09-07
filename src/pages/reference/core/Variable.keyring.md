---
layout: ../../../layouts/ApiLayout.astro
title: 'Variable: keyring'
page: reference
---

[**@geolonia/maps-core**](/reference/core/)

***

[@geolonia/maps-core](/reference/core/) / keyring

# Variable: keyring

> `const` **keyring**: `Keyring`

Keyring のシングルトンインスタンスです。

SDK 全体で共有される API キー、ステージ、Geolonia スタイル判定を保持します。
通常は `GeoloniaMap` の生成時に自動設定されますが、手動で設定することもできます。

## Example

```typescript
keyring.setApiKey("YOUR-API-KEY");
```
