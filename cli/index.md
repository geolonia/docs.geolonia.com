---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: Geolonia CLI
description: Geolonia CLI はコマンドラインから Geolonia のサービスを連携したりアップロードしたりできます。

# Author box
# author:
#     title: About Author
#     title_url: '#'
#     external_url: true
#     description: Author description

# Micro navigation
micro_nav: true

# Page navigation
page_nav:
    # prev:
    #     content: Previous page
    #     url: '#'
    next:
        content: カスタムスプライト
        url: '/cli/custom-sprites/'

breadcrumbs:
    - title: Geolonia CLI
      url: /cli/
    # - title: "hello"
    #   URL: "./"
---

## はじめに

### インストール

Geolonia CLI は NodeJS の環境が必要です。 NodeJS 16.x 以上が推奨となっております。

```
$ node --version
v16.xx.x
```

まずは、 NPM からインストールします。

```
$ npm install --global @geolonia/cli
```

そうしたら、 `geolonia` が使えるようになります。

```
$ geolonia --version
x.x.x
```

### 認証

Geolonia CLI を利用する前にログインと、チームの選択が必要です。

```
$ geolonia login
username: [あなたのユーザー名]
password: [パスワード（表示されません）]
Successfully logged in and got user sub and tokens.
```

```
$ geolonia teams select
  [1] Geolonia
  [2] Test Team A
  [3] Test Team B
Please select the team [1 - 3]: [使うチームの番号を入力]
Successfully selected Geolonia
```

この状態で Geolonia CLI のすべての機能が使えるようになりました。それぞれの機能について、下記の資料をご確認ください。

## CLI で使える機能

* [カスタムスプライト](/cli/custom-sprites/)
