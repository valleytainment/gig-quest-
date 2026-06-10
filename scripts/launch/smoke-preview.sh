#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════════════════
# 🟫 OPS │ scripts/launch/smoke-preview.sh
# @responsibility Pre-deploy smoke against production build (vite preview :4173)
# ═══════════════════════════════════════════════════════════════════════════════
set -euo pipefail
cd "$(dirname "$0")/../.."

npm run build

PREVIEW_PID=""
cleanup() {
  if [[ -n "${PREVIEW_PID}" ]] && kill -0 "${PREVIEW_PID}" 2>/dev/null; then
    kill "${PREVIEW_PID}" 2>/dev/null || true
  fi
}
trap cleanup EXIT

npm run preview -- --host 127.0.0.1 --port 4173 >/tmp/gig-quest-preview.log 2>&1 &
PREVIEW_PID=$!

echo "==> Waiting for preview server..."
for _ in $(seq 1 30); do
  if curl -sf "http://127.0.0.1:4173/" >/dev/null 2>&1; then
    break
  fi
  sleep 1
done

if ! curl -sf "http://127.0.0.1:4173/" >/dev/null 2>&1; then
  echo "FAIL: preview server did not start (see /tmp/gig-quest-preview.log)"
  exit 1
fi

echo "==> Running e2e against production build..."
npx playwright test -c playwright.preview.config.ts

echo ""
echo "PASS: Production build smoke tests passed."
