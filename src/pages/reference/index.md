---
layout: ../../layouts/DocLayout.astro
title: リファレンス
page: reference
quadrant: Diátaxis / 仕事 × 認知
---

<!-- OUTLINE（構成=Claude / 本文=人が執筆。書けたら該当行にチェック）
- [ ] 何か：対象の1文定義
- [ ] 構文／シグネチャ／属性一覧
- [ ] パラメータ：型・既定値・必須か任意か
- [ ] 戻り値・発火するイベント
- [ ] 最小の使用例
- [ ] 注意・制約（レンズ差・対応環境など）
- [ ] 関連：API索引・関連ページへのリンク
-->

正確・網羅。教えず、引くための場所です。**このセクションは将来 TypeScript の型や JSDoc から自動生成**する想定で、いまは雛形（手書き抜粋）です。

## embed: data-* 属性（抜粋）

| 属性 | 型 | 既定 | 説明 |
|---|---|---|---|
| `data-lat` / `data-lng` | 数値 | — | 中心座標（緯度 / 経度） |
| `data-zoom` | 数値 | `14` | 初期ズーム |
| `data-style` | 論理名 / URL | `geolonia/basic-v2` | 地図スタイル |
| `data-marker` | `on` / `off` | `on` | 中心マーカー |
| `data-geojson` | URL | — | 重ねる GeoJSON |
| `data-cluster` | `on` / `off` | `on` | `data-geojson` の点をクラスタリング |

## maps-suite API（自動生成）

`@geolonia/maps-suite` の型定義から生成した API リファレンスを取り込み済み（プロトタイプのためコピー）。

- [maps-suite API インデックス](/reference/api/) — Map / Marker / InfoWindow / MarkerClusterer など

> 自動生成の対象なので Markdown 固定。手順は[チュートリアル](/tutorials/)、目的別は[ハウツー](/howto/)へ。
