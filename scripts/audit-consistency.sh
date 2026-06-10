#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════════════════
# 🟫 OPS │ scripts/audit-consistency.sh
# @responsibility Run elite consistency audit checks from CONSISTENCY_AUDIT.md
# @usage npm run audit:consistency
# ═══════════════════════════════════════════════════════════════════════════════
set -euo pipefail
cd "$(dirname "$0")/.."

PASS=0
FAIL=0
warn() { echo "WARN: $*"; }
ok()   { echo "OK:   $*"; PASS=$((PASS + 1)); }
bad()  { echo "FAIL: $*"; FAIL=$((FAIL + 1)); }

echo "==> Gig Quest Elite Consistency Audit"
echo ""

# Intake default
if grep -q 'VITE_ENABLE_FIRESTORE_INTAKE=false' .env.example; then
  ok "Intake defaults OFF in .env.example"
else
  bad "Intake must default false in .env.example"
fi

# Safe mode doc — no Landing-only App contradiction
if grep -q 'return <Landing />' docs/LAUNCH_CHECKLIST.md 2>/dev/null; then
  bad "LAUNCH_CHECKLIST still claims App.tsx is Landing-only"
else
  ok "No App.tsx Landing-only contradiction in LAUNCH_CHECKLIST"
fi

# Core module headers
for f in src/lib/firebase.ts src/App.tsx src/pages/Landing.tsx src/contexts/AuthContext.tsx; do
  if head -3 "$f" | grep -q 'MODULE │'; then
    ok "Module header: $f"
  else
    bad "Missing module header: $f"
  fi
done

# Hub docs exist
for f in AGENTS.md docs/SYSTEM_MAP.md docs/CONVENTIONS.md docs/CODEBASE_INDEX.md docs/CONSISTENCY_AUDIT.md; do
  if [[ -f "$f" ]]; then ok "Doc exists: $f"; else bad "Missing: $f"; fi
done

# Route in App.tsx
if grep -q 'path="/"' src/App.tsx && grep -q '<Landing' src/App.tsx; then
  ok "Route / maps to Landing in App.tsx"
else
  bad "Route / must render Landing"
fi

echo ""
echo "==> Summary: $PASS passed, $FAIL failed"
if [[ $FAIL -gt 0 ]]; then exit 1; fi
echo "PASS: Elite consistency audit (static checks). Run npm run ci for full gate."
