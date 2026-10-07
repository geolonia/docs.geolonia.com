# docs.geolonia.com

Geolonia Maps のドキュメントサイト（リニューアル版）のリポジトリです。公開先は <https://docs.geolonia.com/> です。

サイトは [Astro](https://astro.build/) による静的サイトです。ページは Markdown と MDX で書きます。

## セットアップ

Node.js 22.12.0 以上が必要です。

```bash
npm install
npm run dev
```

開発サーバーは <http://localhost:4321> で起動します。

## よく使うコマンド

リポジトリのルートで実行します。

| コマンド | 内容 |
| :-- | :-- |
| `npm run dev` | 開発サーバーを起動する |
| `npm run build` | `./dist/` に静的サイトを書き出し、Pagefind の検索インデックスも作る |
| `npm run preview` | ビルド結果をローカルで確認する |
| `npm test` | `tests/` の単体テストを実行する |
| `npm run lint:text` | 手書きページの文章を textlint で検査する |
| `npm run check:links` | ビルド結果のリンク切れを検査する |
| `npm run check:emphasis` | 強調記法の崩れを検査する |

CI は `npm test`、`npm run lint:text`、`npm run build`、`npm run check:links`、`npm run check:emphasis` の順に実行します。PR を出す前に、手元で同じ順に流すと CI と同じ範囲を確認できます。

## ディレクトリ構成

| パス | 内容 |
| :-- | :-- |
| `src/pages/` | ページ本体。`tutorials/`、`howto/`、`reference/`、`explanation/` の 4 つに分けている |
| `src/components/` | ページから使うコンポーネント |
| `src/layouts/` | ページのレイアウト |
| `integrations/` | 載せたコードをそのまま動かす LiveCode の仕組み |
| `scripts/` | リファレンスの取り込みやリンク検査のスクリプト |
| `tests/` | 単体テスト |
| `public/` | そのまま配信する静的ファイル |

`src/pages/reference/` は各ライブラリの API ドキュメントから自動生成したページです。手で直さず、上流のソースを直して再生成します。

## ドキュメントを書く、直す

ページの書き方、ブランチ運用、文章の書き方は [CONTRIBUTING.md](./CONTRIBUTING.md) にまとめています。書き始める前に一度目を通してください。

`main` は保護されているため、作業ブランチを切って PR を出します。
