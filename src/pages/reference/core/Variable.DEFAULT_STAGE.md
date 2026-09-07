---
layout: ../../../layouts/ApiLayout.astro
title: 'Variable: DEFAULT\_STAGE'
page: reference
---

[**@geolonia/maps-core**](/reference/core/)

***

[@geolonia/maps-core](/reference/core/) / DEFAULT\_STAGE

# Variable: DEFAULT\_STAGE

> `const` **DEFAULT\_STAGE**: `"v1"` = `"v1"`

ステージの既定値です。本番環境を表す `"v1"` です。

ステージは、SDK がタイルや API をどの環境から取得するかを決める値です。
`stage` を指定しなかった場合は、この値が使われます。

- `"v1"`（既定）: 本番環境。`tileserver.geolonia.com` と `https://api.geolonia.com/v1` を使用します。
- `"dev"`: 開発環境。`tileserver-dev.geolonia.com` と `https://api.geolonia.com/dev` を使用します。

通常は指定する必要がありません。開発環境を使う場合のみ、`GeoloniaMap` の
`stage` オプションか Keyring.setStage で明示的に切り替えてください。

`@geolonia/maps-react` や `@geolonia/maps-suite` のようなラッパーが、
自身の既定として参照することを想定して公開しています。値をハードコードせず
この定数を使うことで、SDK 全体で既定のステージが揃います。

## Example

```typescript
import { DEFAULT_STAGE, GeoloniaMap } from "@geolonia/maps-core";

new GeoloniaMap({
  container: "#map",
  apiKey: "YOUR-API-KEY",
  stage: DEFAULT_STAGE,
});
```
