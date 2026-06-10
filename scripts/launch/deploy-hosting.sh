#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════════════════
# 🟫 OPS │ scripts/launch/deploy-hosting.sh
# @responsibility Build dist/ and deploy Firebase Hosting (email-first SPA)
# @requires firebase login | @see scripts/launch/README.md
# ═══════════════════════════════════════════════════════════════════════════════
set -euo pipefail
cd "$(dirname "$0")/../.."

if ! npx firebase projects:list >/dev/null 2>&1; then
  echo "FAIL: Firebase CLI not authenticated."
  echo ""
  echo "Run in your terminal (interactive — complete browser auth):"
  echo "  npx firebase login --no-localhost"
  echo ""
  echo "Then re-run:"
  echo "  npm run launch:deploy-hosting"
  echo ""
  echo "Or open Console deploy: npm run launch:open-hosting-console"
  exit 1
fi

echo "==> Pre-deploy smoke (production build)..."
npm run launch:smoke-preview

echo "==> Deploying Firebase Hosting (dist/)..."
npx firebase deploy --only hosting
echo "Hosting deployed."

echo ""
echo "Post-deploy smoke (manual):"
echo "  1. Open production URL on mobile (375px)"
echo "  2. Complete intake → verify mailto/Gmail success panel"
echo "  3. Confirm VITE_ENABLE_FIRESTORE_INTAKE=false in hosting env (email-only path)"
