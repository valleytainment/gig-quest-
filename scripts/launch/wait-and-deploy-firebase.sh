#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════════════════
# 🟫 OPS │ scripts/launch/wait-and-deploy-firebase.sh
# @responsibility Poll for FIREBASE_TOKEN secret, then trigger GHA Firebase deploy
# @usage Run this, then complete `npx firebase login:ci` + `gh secret set FIREBASE_TOKEN`
# ═══════════════════════════════════════════════════════════════════════════════
set -euo pipefail
cd "$(dirname "$0")/../.."

REPO=$(gh repo view --json nameWithOwner --jq .nameWithOwner 2>/dev/null || echo "valleytainment/gig-quest-")

has_token() {
  if [[ -f .env.local ]] && grep -q '^FIREBASE_TOKEN=' .env.local 2>/dev/null; then
    return 0
  fi
  if gh secret list --repo "${REPO}" 2>/dev/null | grep -q '^FIREBASE_TOKEN'; then
    return 0
  fi
  if npx firebase projects:list >/dev/null 2>&1; then
    return 0
  fi
  return 1
}

echo "Waiting for Firebase auth (up to 5 minutes)..."
echo ""
echo ">>> In another terminal, run NOW:"
echo "    npx firebase login:ci"
echo "    gh secret set FIREBASE_TOKEN --repo ${REPO}"
echo ""
echo "Or local deploy:"
echo "    echo 'FIREBASE_TOKEN=your-token' >> .env.local"
echo "    npm run launch:deploy-hosting"
echo ""

for i in $(seq 1 60); do
  if has_token; then
    echo ""
    if gh secret list --repo "${REPO}" 2>/dev/null | grep -q '^FIREBASE_TOKEN'; then
      echo "GitHub secret detected — triggering Deploy Firebase Hosting workflow..."
      gh workflow run deploy-firebase.yml --repo "${REPO}"
      sleep 5
      run_id=$(gh run list --repo "${REPO}" --workflow "Deploy Firebase Hosting" --limit 1 --json databaseId --jq '.[0].databaseId')
      echo "Watching run ${run_id}..."
      gh run watch "${run_id}" --repo "${REPO}" --exit-status
      echo ""
      echo "Firebase deploy complete. Verify: https://gen-lang-client-0705859710.web.app/"
      exit 0
    fi

    echo "Local auth detected — running launch:deploy-hosting..."
    npm run launch:deploy-hosting
    exit 0
  fi
  printf "\r[%ss] waiting for FIREBASE_TOKEN..." "$((i * 5))"
  sleep 5
done

echo ""
echo "FAIL: Timed out waiting for Firebase auth."
echo "Run: npm run launch:setup-firebase-ci"
exit 1
