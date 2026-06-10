#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════════════════
# 🟫 OPS │ scripts/launch/open-hosting-console.sh
# @responsibility Open Firebase Hosting console for manual deploy / first-time setup
# ═══════════════════════════════════════════════════════════════════════════════
set -euo pipefail

open "https://console.firebase.google.com/project/gen-lang-client-0705859710/hosting"
open "https://console.firebase.google.com/project/gen-lang-client-0705859710/settings/general"

echo "Opened Firebase Hosting + project settings."
echo "CLI deploy: firebase login --no-localhost && npm run launch:deploy-hosting"
