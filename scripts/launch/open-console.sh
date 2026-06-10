#!/usr/bin/env bash
# Opens Firebase Console tabs and copies firestore.rules to clipboard (macOS).
set -euo pipefail
cd "$(dirname "$0")/../.."

if command -v pbcopy >/dev/null 2>&1; then
  pbcopy < firestore.rules
  echo "Copied firestore.rules to clipboard — paste into Rules editor and Publish."
else
  echo "pbcopy not found; open firestore.rules manually."
fi

open "https://console.cloud.google.com/apis/library/firestore.googleapis.com?project=gen-lang-client-0705859710"
open "https://console.cloud.google.com/billing/linkedaccount?project=gen-lang-client-0705859710"
open "https://console.firebase.google.com/project/gen-lang-client-0705859710/settings/general"
open "https://console.firebase.google.com/project/gen-lang-client-0705859710/firestore/databases/ai-studio-05fc7137-135e-48c8-a892-207e99d4e60a/rules"
open "https://console.firebase.google.com/project/gen-lang-client-0705859710/authentication/users"
open "https://console.firebase.google.com/project/gen-lang-client-0705859710/firestore/databases/ai-studio-05fc7137-135e-48c8-a892-207e99d4e60a/data"

echo "Opened: Firestore API, Billing, Project settings, Rules, Auth, Firestore Data"
