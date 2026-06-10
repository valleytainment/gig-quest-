#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════════════════
# 🟫 OPS │ scripts/launch/deploy-github-pages.sh
# @responsibility Deploy dist/ to GitHub Pages (no Firebase CLI required)
# @requires gh auth login
# ═══════════════════════════════════════════════════════════════════════════════
set -euo pipefail
cd "$(dirname "$0")/../.."

if ! gh auth status >/dev/null 2>&1; then
  echo "FAIL: GitHub CLI not authenticated. Run: gh auth login"
  exit 1
fi

REPO=$(gh repo view --json nameWithOwner --jq .nameWithOwner)
SITE_URL="https://${REPO%%/*}.github.io/${REPO##*/}/"

echo "==> Building for GitHub Pages (${SITE_URL})..."
GITHUB_PAGES=true npm run build

echo "==> SPA fallback (404.html)..."
cp dist/index.html dist/404.html

echo "==> Publishing gh-pages branch..."
npx gh-pages -d dist --nojekyll -m "Deploy Gig Quest $(date -u +%Y-%m-%dT%H:%M:%SZ)"

echo "==> Ensuring GitHub Pages is enabled..."
if gh api "repos/${REPO}/pages" >/dev/null 2>&1; then
  gh api --method PUT "repos/${REPO}/pages" \
    -f build_type=legacy \
    -f 'source[branch]=gh-pages' \
    -f 'source[path]=/' >/dev/null 2>&1 || true
else
  gh api --method POST "repos/${REPO}/pages" \
    -f build_type=legacy \
    -f 'source[branch]=gh-pages' \
    -f 'source[path]=/' >/dev/null 2>&1 || true
fi

PAGES_STATUS=$(gh api "repos/${REPO}/pages" --jq .status 2>/dev/null || echo "unknown")

echo ""
echo "Hosting deployed (GitHub Pages status: ${PAGES_STATUS})."
echo "URL: ${SITE_URL}"
echo ""
echo "Post-deploy smoke (manual, mobile 375px):"
echo "  1. Open ${SITE_URL}"
echo "  2. Complete intake → verify mailto/Gmail success panel"
echo "  3. Confirm email-first path (Firestore intake remains off in static build)"
