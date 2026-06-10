#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════════════════
# 🟫 OPS │ scripts/launch/verify-readiness.sh
# @responsibility Pre-intake CI gate + rules probe warning (does NOT enable intake)
# @see docs/INTAKE_ENABLE_RUNBOOK.md
# ═══════════════════════════════════════════════════════════════════════════════
set -euo pipefail
cd "$(dirname "$0")/../.."

echo "==> Checking VITE_ENABLE_FIRESTORE_INTAKE default..."
grep -q 'VITE_ENABLE_FIRESTORE_INTAKE=false' .env.example || {
  echo "FAIL: .env.example must default intake to false"
  exit 1
}

if [[ -f .env.local ]] && grep -q 'VITE_ENABLE_FIRESTORE_INTAKE=true' .env.local; then
  echo "WARN: .env.local has intake enabled (OK for local staging test only)"
else
  echo "OK: intake not enabled in .env.local"
fi

echo "==> Running CI..."
CI=true npm run ci

echo ""
echo "==> Probing deployed Firestore rules (15s max)..."
if npm run launch:test-rules >/dev/null 2>&1; then
  echo "OK: public applications create allowed — rules published"
else
  echo "WARN: rules probe failed — run: npm run launch:open-console"
  echo "      Paste firestore.rules → Publish, then: npm run launch:test-rules"
fi

echo ""
echo "PASS: Code ready. Complete docs/INTAKE_ENABLE_RUNBOOK.md gates before enabling intake."
