#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/../.."

echo "Deploying Firestore rules to project in .firebaserc..."
npx firebase deploy --only firestore:rules
echo "Rules deployed."
