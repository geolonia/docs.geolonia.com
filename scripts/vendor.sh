#!/bin/sh
# API リファレンスの生成元パッケージを vendor/ に取ってくる。
#
# 以前はこの3つを git submodule にしていましたが、やめました。理由は2つあります。
#
#   1. ビルドには要らない。サイトのビルド（astro build）が読むのは、生成済みで
#      コミットされた src/pages/reference/ です。生成元が必要になるのは
#      npm run docs:sync:* を回すときだけで、これは日常の作業ではありません。
#   2. チェックアウトのたびに付いてくる。submodule は clone / checkout の段で
#      更新されるので、ビルドに要らないものが常に足を引っ張ります。実際に
#      Cloudflare Pages のビルドは、private な maps-suite の submodule を
#      clone できずに落ちていました（Pages は submodule に認証情報を渡しません）。
#
# 使い方:
#   sh scripts/vendor.sh maps-suite            # 既定ブランチの先頭を取る
#   sh scripts/vendor.sh maps-suite v1.2.0     # タグやブランチを指定する
#   VENDOR_REF=v1.2.0 sh scripts/vendor.sh maps-suite
#
# --depth 1 なので履歴は取りません。既に取得済みなら fetch して差し替えます。
set -eu

name="${1:-}"
ref="${2:-${VENDOR_REF:-}}"

case "$name" in
  maps-suite) repo="geolonia/maps-suite" ;;
  maps-core)  repo="geolonia/maps-core" ;;
  # ディレクトリ名とリポジトリ名が違います（vendor/maps-embed ← geolonia/embed）
  maps-embed) repo="geolonia/embed" ;;
  *)
    echo "usage: sh scripts/vendor.sh {maps-suite|maps-core|maps-embed} [ref]" >&2
    exit 2
    ;;
esac

dir="vendor/$name"
url="https://github.com/$repo.git"

if [ -d "$dir/.git" ]; then
  # 変数を {} で囲むのは、直後の全角括弧が変数名の一部と解釈されるのを避けるためです。
  echo "vendor: ${repo} を更新します（${dir}）"
  git -C "$dir" remote set-url origin "$url"
  git -C "$dir" fetch --depth 1 origin "${ref:-HEAD}"
  git -C "$dir" checkout -q --detach FETCH_HEAD
else
  echo "vendor: ${repo} を取得します（${dir}）"
  # 空ディレクトリが残っていることがあるので消してから clone します。
  rm -rf "$dir"
  mkdir -p vendor
  if [ -n "$ref" ]; then
    git clone --depth 1 --branch "$ref" "$url" "$dir"
  else
    git clone --depth 1 "$url" "$dir"
  fi
fi

echo "vendor: $name = $(git -C "$dir" rev-parse --short HEAD)"
