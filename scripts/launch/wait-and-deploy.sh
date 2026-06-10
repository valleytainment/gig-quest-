#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════════════════
# 🟫 OPS │ scripts/launch/wait-and-deploy.sh
# @responsibility Poll for Firebase auth, then run launch:deploy-hosting
# @usage Run this, then complete `npx firebase login --no-localhost` in another terminal
# ═══════════════════════════════════════════════════════════════════════════════
set -euo pipefail
cd "$(dirname "$0")/../.."

CONFIG="${HOME}/.config/configstore/firebase-tools.json"
ENV_FILE=".env.local"

has_auth() {
  if [[ -f "${ENV_FILE}" ]] && grep -q '^FIREBASE_TOKEN=' "${ENV_FILE}"; then
    return 0
  fi
  if [[ -f "${CONFIG}" ]] && node -e "const f=require('${CONFIG}'); process.exit(f.tokens?0:1)" 2>/dev/null; then
    return 0
  fi
  if npx firebase projects:list >/dev/null 2>&1; then
    return 0
  fi
  return 1
}

echo "Waiting for Firebase authentication (up to 5 minutes)..."
echo ""
echo ">>> In another terminal, run NOW:"
echo "    cd \"$(pwd)\""
echo "    npx firebase login --no-localhost"
echo ""
echo "Or add FIREBASE_TOKEN to .env.local (from: npx firebase login:ci)"
echo ""

for i in $(seq 1 60); do
  if has_auth; then
    echo ""
    echo "Auth detected — starting deploy..."
    npm run launch:deploy-hosting
    exit 0
  fi
  printf "\r[%ss] waiting for firebase login..." "$((i * 5))"
  sleep 5
done

echo ""
echo "FAIL: Timed out waiting for Firebase auth."
exit 1
