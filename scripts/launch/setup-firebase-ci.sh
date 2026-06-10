#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════════════════
# 🟫 OPS │ scripts/launch/setup-firebase-ci.sh
# @responsibility One-time FIREBASE_TOKEN setup for local deploy + GitHub Actions
# ═══════════════════════════════════════════════════════════════════════════════
set -euo pipefail
cd "$(dirname "$0")/../.."

REPO=$(gh repo view --json nameWithOwner --jq .nameWithOwner 2>/dev/null || echo "valleytainment/gig-quest-")

echo "Firebase CI token setup"
echo "======================="
echo ""
echo "Step 1 — Generate token (opens browser):"
echo "  npx firebase login:ci"
echo ""
echo "Step 2a — Local deploy (.env.local, never commit):"
echo "  echo 'FIREBASE_TOKEN=YOUR_TOKEN' >> .env.local"
echo "  npm run launch:deploy-hosting"
echo ""
echo "Step 2b — GitHub Actions deploy (recommended):"
echo "  gh secret set FIREBASE_TOKEN --repo ${REPO}"
echo "  gh workflow run deploy-firebase.yml --repo ${REPO}"
echo ""
echo "Step 3 — Verify:"
echo "  npx firebase projects:list"
echo ""

if command -v pbcopy >/dev/null 2>&1; then
  cat <<EOF | pbcopy
npx firebase login:ci
gh secret set FIREBASE_TOKEN --repo ${REPO}
gh workflow run deploy-firebase.yml --repo ${REPO}
EOF
  echo "Copied quick commands to clipboard."
fi

if [[ "${1:-}" == "--login" ]]; then
  echo "Starting firebase login:ci..."
  npx firebase login:ci
fi
