---
layout: ../../layouts/DocLayout.astro
title: Geolonia Agent Skills とは
description: Geolonia Maps を使った開発を AI コーディングエージェントに手伝わせるための、Claude Code 用プラグインです。
page: explanation
badge: explanation
---

**Geolonia Agent Skills** は、Geolonia Maps を使った地図アプリの開発を [Claude Code](https://code.claude.com/) に手伝わせるためのプラグインです。地図を描くライブラリでも、アカウントを操作するツールでもありません。**エージェントに Geolonia Maps の書き方を教えておくためのもの**です。

このドキュメントは人が読むために書かれています。同じ内容をエージェントが読んで使える形にまとめ直したのが、このプラグインだと考えてください。

| 何を使うか | 役割 |
| --- | --- |
| embed / maps-suite / maps-react | 地図を描く |
| [Geolonia CLI](/explanation/cli/) | API キーの管理、プランと利用量の確認 |
| Geolonia Agent Skills | 地図を書くコードを、エージェントに書かせる |

配布は [`geolonia/geolonia-agent-skills`](https://github.com/geolonia/geolonia-agent-skills)（MIT ライセンス）で行っています。

## なぜ要るのか

エージェントは Geolonia Maps を知らないわけではありませんが、学習した時点の知識で書きます。そのため、次のようなずれが起きます。

- 非推奨になったスタイル名や、古い CDN のパスを書く
- MapLibre GL JS の書き方をそのまま当てて、Geolonia 側の作法を外す
- `maps-suite` に**もう存在する**機能を「無いもの」として、遠回りな回避策を書く

スキルは、こうした前提をその場でエージェントに渡します。あらかじめプロンプトに毎回貼り付ける代わりに、必要なときだけ読み込ませる、という仕組みです。

## 含まれるスキル

### maps

Geolonia Maps を使った地図アプリの開発を支援します。

- **Embed API** … HTML の `data-*` 属性による宣言的な地図埋め込み
- **JavaScript API** … `geolonia.Map` / `Marker` / `Popup` / `SimpleStyle` の操作
- **ジオコーディング** … 住所から座標、座標から住所、日本語住所の正規化
- **マップスタイル** … 組み込みスタイルの一覧とカスタマイズ

セットアップは CDN 埋め込みに統一されています。

### geolonia-google-maps-migration

Google Maps JavaScript API から `@geolonia/maps-suite` への移行を支援します。棚卸しから、インストール、API キーの取得、地図の初期化、マーカーや InfoWindow の移し替え、ビルドと動作確認までを手順として持っています。

`google.maps.*` と `geolonia.maps.*` の対応表と、細部が異なる API、まだ埋まっていない差分とその回避策が、参照ファイルに分かれて入っています。

## 要件とインストール

Claude Code の **v1.0.33 以降**が必要です。

マーケットプレイスを追加してからインストールします。

```text
/plugin marketplace add geolonia/geolonia-agent-skills
/plugin install geolonia@geolonia
```

## 使い方

地図に関する依頼をすると、エージェントが自分で必要なスキルを読み込みます。

```text
「Geolonia Maps で東京タワーにマーカーを置いた地図を作って」
```

明示的に呼びたいときはスラッシュコマンドを使います。

```text
/geolonia:maps
```

## 中身の構成

スキルは1つのファイルではなく、入口となる `SKILL.md` と、必要になったときだけ読まれる参照ファイルに分かれています。エージェントが最初から全部を読まずに済むようにするための構成です。

```text
skills/
├── maps/
│   ├── SKILL.md               # 入口。いつ使うか、基本の方針
│   ├── embed-api.md           # data-* 属性の一覧
│   ├── javascript-api.md      # JavaScript API
│   ├── geocoding.md           # 住所と座標の変換、住所正規化
│   ├── styles.md              # スタイル一覧とカスタマイズ
│   └── examples.md            # よくあるパターンのコード例
└── geolonia-google-maps-migration/
    ├── SKILL.md               # 入口。移行手順
    ├── AGENTS.md              # 凝縮版のクイックリファレンス
    └── references/
        ├── known-gaps.md      # まだ無い機能と回避策
        ├── api-differences.md # 細部が異なる API
        ├── marker-icons.md    # マーカーアイコン
        └── shapes.md          # 図形の移行
```

## ライブラリの版に追随します

このプラグインで最も注意が要るのはここです。

スキルの内容、とくに移行スキルの「まだ無い機能と回避策」は、**特定のバージョンの `@geolonia/maps-suite` を前提に書かれています**。ライブラリ側で機能が追加されると、回避策はただの遠回りになります。実際、初期の版に無かった `Polyline` や `Polygon`、`Circle` は、その後の版で追加されています。

古い回避策を書かせないために、次を守ってください。

- 参照ファイルの冒頭にある**対象バージョンの記載**を確認する
- 使っている `@geolonia/maps-suite` の版と食い違うときは、リポジトリの最新を取り直す
- 生成されたコードが `_getImpl()` を使った回避策になっていたら、いまの版に公式の API が無いか確かめる

正は常にリポジトリ側です。このページは位置づけを説明するもので、スキルの内容そのものは [`geolonia/geolonia-agent-skills`](https://github.com/geolonia/geolonia-agent-skills) を見てください。

## 手元で試す・直す

リポジトリを取得して、`--plugin-dir` で直接読み込めます。

```bash
git clone https://github.com/geolonia/geolonia-agent-skills.git
cd /path/to/your-project
claude --plugin-dir /path/to/geolonia-agent-skills
```

スキルのファイルを編集したら、Claude Code を再起動すると反映されます。構成が正しいかは次で検証できます。

```bash
claude plugin validate /path/to/geolonia-agent-skills
```

## 関連

- [Geolonia CLI とは](/explanation/cli/) … API キーの管理をコマンドラインから行うツール
- [Geolonia Maps のスタイル一覧](/explanation/styles/) … スキルが参照しているスタイルの正
- [デモキーで無料で試せる環境](/explanation/free-referers/) … 生成されたコードの `YOUR-API-KEY` が動く範囲
