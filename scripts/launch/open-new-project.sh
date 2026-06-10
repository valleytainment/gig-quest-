#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════════════════
# 🟫 OPS │ scripts/launch/open-new-project.sh
# @responsibility New Firebase project wizard (escape hatch for CONSUMER_INVALID)
# ═══════════════════════════════════════════════════════════════════════════════
set -euo pipefail

open "https://console.firebase.google.com/"
open "https://console.firebase.google.com/project/_/overview"

cat <<'EOF'

NEW FIREBASE PROJECT — operator steps
=====================================
1. Firebase Console → Add project (or use existing with billing)
2. Build → Firestore Database → Create database → Production mode → region
3. Build → Authentication → Sign-in method → Enable Google
4. Project settings → Your apps → Web (</>) → Register app → copy config

5. Save web config JSON to a file, e.g. ~/gig-quest-firebase-config.json:
   {
     "projectId": "...",
     "appId": "...",
     "apiKey": "...",
     "authDomain": "...",
     "storageBucket": "...",
     "messagingSenderId": "...",
     "firestoreDatabaseId": "(default)"
   }

6. Apply to repo:
   npm run launch:apply-config -- ~/gig-quest-firebase-config.json

7. Publish rules + bootstrap admin:
   npm run launch:open-console
   # paste rules → Publish; create adminRoles/{uid}

8. Verify:
   npm run launch:diagnose
   npm run launch:test-rules

EOF
