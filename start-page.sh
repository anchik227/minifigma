#!/usr/bin/env sh
# mini-figma — открыть страницу скачивания (desktop-download/).
cd "$(dirname "$0")" || exit 1

if ! command -v node >/dev/null 2>&1; then
  echo "Нужен Node.js 18+: https://nodejs.org/" >&2
  exit 1
fi

exec node ./serve-page.mjs "$@"
