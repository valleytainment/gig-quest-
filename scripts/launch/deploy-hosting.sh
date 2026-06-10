#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════════════════
# 🟫 OPS │ scripts/launch/deploy-hosting.sh
# @responsibility Build dist/ and deploy Firebase Hosting (email-first SPA)
# @requires firebase login | @see scripts/launch/README.md
# ═══════════════════════════════════════════════════════════════════════════════
set -euo pipefail
cd "$(dirname "$0")/../.."

if [[ -f .env.local ]] && grep -q '^FIREBASE_TOKEN=' .env.local; then
  # shellcheck disable=SC1091
  set -a && source .env.local && set +a
fi

auth_ok=false
if [[ -n "${FIREBASE_TOKEN:-}" ]]; then
  auth_ok=true
elif npx firebase projects:list >/dev/null 2>&1; then
  auth_ok=true
fi

if [[ "${auth_ok}" != true ]]; then
  echo "FAIL: Firebase CLI not authenticated."
  echo ""
  echo "Option A — interactive login (your terminal):"
  echo "  npx firebase login --no-localhost"
  echo "  npm run launch:deploy-hosting"
  echo ""
  echo "Option B — CI token (works for Cursor/agent deploy):"
  echo "  npx firebase login:ci"
  echo "  echo 'FIREBASE_TOKEN=your-token' >> .env.local   # never commit"
  echo "  npm run launch:deploy-hosting"
  echo ""
  echo "Option C — Console: npm run launch:open-hosting-console"
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
