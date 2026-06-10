#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════════════════
# 🟫 OPS │ scripts/launch/deploy-hosting.sh
# @responsibility Build dist/ and deploy Firebase Hosting (email-first SPA)
# @requires firebase login | @see scripts/launch/README.md
# ═══════════════════════════════════════════════════════════════════════════════
set -euo pipefail
cd "$(dirname "$0")/../.."

echo "==> Building production bundle..."
npm run build

echo "==> Deploying Firebase Hosting (dist/)..."
npx firebase deploy --only hosting
echo "Hosting deployed."

echo ""
echo "Post-deploy smoke (manual):"
echo "  1. Open production URL on mobile (375px)"
echo "  2. Complete intake → verify mailto/Gmail success panel"
echo "  3. Confirm VITE_ENABLE_FIRESTORE_INTAKE=false in hosting env (email-only path)"
