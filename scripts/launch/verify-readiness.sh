#!/usr/bin/env bash
# Pre-intake-enable verification. Does NOT enable intake.
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
echo "PASS: Code ready. Complete docs/INTAKE_ENABLE_RUNBOOK.md gates before enabling intake."
