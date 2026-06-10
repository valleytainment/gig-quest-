#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════════════════
# 🟫 OPS │ scripts/launch/deploy-rules.sh
# @responsibility Deploy firestore.rules via Firebase CLI
# @requires firebase login | @see scripts/launch/README.md
# ═══════════════════════════════════════════════════════════════════════════════
set -euo pipefail
cd "$(dirname "$0")/../.."

echo "Deploying Firestore rules to project in .firebaserc..."
npx firebase deploy --only firestore:rules
echo "Rules deployed."
