#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════════════════
# 🟫 OPS │ scripts/launch/status.sh
# @responsibility Print launch gate status (Pages, Firebase, Firestore intake)
# ═══════════════════════════════════════════════════════════════════════════════
set -euo pipefail
cd "$(dirname "$0")/../.."

PAGES_URL="https://valleytainment.github.io/gig-quest-/"
FIREBASE_WEB="https://gen-lang-client-0705859710.web.app/"
REPO=$(gh repo view --json nameWithOwner --jq .nameWithOwner 2>/dev/null || echo "valleytainment/gig-quest-")

pass() { echo "  ✓ $1"; }
fail() { echo "  ✗ $1"; }
warn() { echo "  ! $1"; }

echo "Gig Quest Launch Status"
echo "======================="
echo ""

echo "GitHub Pages (${PAGES_URL})"
if curl -sfI "${PAGES_URL}" | head -1 | grep -q "200"; then
  pass "HTTP 200"
else
  fail "Not reachable"
fi

if gh api "repos/${REPO}/pages" --jq .status 2>/dev/null | grep -q built; then
  pass "Pages build: built"
else
  status=$(gh api "repos/${REPO}/pages" --jq .status 2>/dev/null || echo "unknown")
  warn "Pages build: ${status}"
fi

latest_ci=$(gh run list --repo "${REPO}" --workflow CI --limit 1 --json conclusion --jq '.[0].conclusion' 2>/dev/null || echo "unknown")
if [[ "${latest_ci}" == "success" ]]; then
  pass "Latest CI: success"
else
  warn "Latest CI: ${latest_ci}"
fi

echo ""
echo "Firebase Hosting (${FIREBASE_WEB})"
if curl -sfI "${FIREBASE_WEB}" | head -1 | grep -q "200"; then
  pass "HTTP 200 — deployed"
else
  warn "Not deployed (404 expected until first deploy)"
fi

auth_ok=false
if [[ -f .env.local ]] && grep -q '^FIREBASE_TOKEN=' .env.local 2>/dev/null; then
  auth_ok=true
  pass "FIREBASE_TOKEN in .env.local"
elif gh secret list --repo "${REPO}" 2>/dev/null | grep -q '^FIREBASE_TOKEN'; then
  auth_ok=true
  pass "FIREBASE_TOKEN GitHub secret set"
elif npx firebase projects:list >/dev/null 2>&1; then
  auth_ok=true
  pass "Firebase CLI logged in"
else
  fail "No Firebase auth — run: npm run launch:setup-firebase-ci"
fi

if [[ "${auth_ok}" == true ]]; then
  warn "Deploy: gh workflow run deploy-firebase.yml --repo ${REPO}"
fi

echo ""
echo "Firestore intake (Phase 12B — optional)"
if npm run launch:diagnose >/tmp/gq-diagnose.txt 2>&1; then
  pass "Firestore API reachable"
else
  if grep -q CONSUMER_INVALID /tmp/gq-diagnose.txt; then
    fail "CONSUMER_INVALID — enable Firestore API + billing"
    echo "       Fix: npm run launch:open-console"
  else
    fail "Diagnose failed — see: npm run launch:diagnose"
  fi
fi

grep -q 'VITE_ENABLE_FIRESTORE_INTAKE=false' .env.example && pass "Intake flag default: false (email-first)"

echo ""
echo "Production smoke: npm run launch:smoke-production"
echo "Live URL:         ${PAGES_URL}"
