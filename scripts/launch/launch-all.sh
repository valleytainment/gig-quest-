#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════════════════
# 🟫 OPS │ scripts/launch/launch-all.sh
# @responsibility Full launch chain: ci + deploy-rules + bootstrap-admin
# @requires firebase login, ADMIN_UID
# ═══════════════════════════════════════════════════════════════════════════════
set -euo pipefail
cd "$(dirname "$0")/../.."

echo "==> 1/4  npm ci"
npm ci

echo "==> 2/4  npm run ci"
CI=true npm run ci

echo "==> 3/4  Deploy Firestore rules"
bash scripts/launch/deploy-rules.sh

if [[ -z "${ADMIN_UID:-}" ]]; then
  echo ""
  echo "SKIP admin bootstrap: set ADMIN_UID and re-run:"
  echo "  ADMIN_UID=your-firebase-uid npm run launch:bootstrap-admin"
  exit 0
fi

echo "==> 4/4  Bootstrap adminRoles/${ADMIN_UID}"
npm run launch:bootstrap-admin

echo ""
echo "Done. Manual smoke (login, admin queue, artist apply) still required."
echo "Do NOT set VITE_ENABLE_FIRESTORE_INTAKE=true until smoke passes."
