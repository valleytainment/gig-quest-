#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════════════════
# 🟫 OPS │ scripts/launch/smoke-production.sh
# @responsibility Post-deploy Playwright smoke against GitHub Pages (375px mobile)
# ═══════════════════════════════════════════════════════════════════════════════
set -euo pipefail
cd "$(dirname "$0")/../.."

PRODUCTION_URL="${PRODUCTION_URL:-https://valleytainment.github.io/gig-quest-/}"

echo "==> Production smoke (${PRODUCTION_URL})..."
PRODUCTION_URL="${PRODUCTION_URL}" npx playwright test \
  e2e/phase11-smoke.spec.ts \
  e2e/landing.spec.ts \
  e2e/mobile-conversion.spec.ts \
  -c playwright.production.config.ts

echo "Production smoke passed."
