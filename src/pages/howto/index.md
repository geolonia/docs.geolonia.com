---
layout: ../../layouts/DocLayout.astro
title: ハウツー
description: 「〜するには」から引ける、具体的な目的別の逆引きレシピ集です。
page: howto
quadrant: Diátaxis / 仕事 × 行動
---

<!-- OUTLINE（構成=Claude / 本文=人が執筆。書けた項目は行ごと消す）
- [ ] ハウツーの位置づけを1〜2文で（目的別に最短で解決するレシピ集）
- [ ] レシピ一覧をリンクで並べる（各1行説明。現在: マーカーを複数置く。今後: スタイル変更・外部データ読み込み 等）
- [ ] 目的のレシピの探し方／無いときの導線（チュートリアルで基礎、リファレンスで仕様）
-->

「〜するには」を最短で解決するレシピ集です。「これがしたい」といった目的ベースで読み進めることができます。なお、各レシピでは、特定のライブラリで対応していないものもあります。

## レシピ

- [マーカーを複数置くには](/howto/multiple-markers/)
- [地図の見た目（スタイル）を切り替えるには](/howto/change-style/)
- [クリックでポップアップを出すには](/howto/popup-on-click/)
- [外部データ（GeoJSON）を地図に読み込むには](/howto/geojson-data/)
- [現在地を表示するには](/howto/current-location/)
- [全地点が画面に収まるように表示するには](/howto/fit-bounds/)
- [地図のコントロールの表示を切り替えるには](/howto/map-controls/)
- [地図の表示言語を切り替えるには](/howto/switch-language/)
- [ドラッグできるマーカーで座標を取得するには](/howto/draggable-marker/)
- [住所で検索してその場所の地図を表示するには](/howto/address-search/)

## 応用（難しめ）

- [地図インスタンス（maps-core）に直接アクセスし、MapLibre GL JS の機能を利用するには](/howto/maps-core-access/)
- [大量の点をクラスタリングするには](/howto/clustering/)
- [値に応じてエリアを色分けするには（コロプレス）](/howto/choropleth/)
- [ヒートマップで密度を可視化するには](/howto/heatmap/)
- [建物や地形を3Dで表示するには](/howto/3d/)
- [独自のデータソース（ベクトルタイル等）を追加するには](/howto/custom-source/)
- [地図を地球儀（グローブ）で表示するには](/howto/globe/)
- [HTML のタグだけで地図を置くには（maps-suite）](/howto/web-component/)

## CLI（コマンドライン）

地図を描くコードではなく、その手前の準備をコマンドラインから行うレシピです。詳しくは [Geolonia CLI とは](/explanation/cli/) を参照してください。

- [API キーを YAML でまとめて管理するには](/howto/cli-map-keys/)
