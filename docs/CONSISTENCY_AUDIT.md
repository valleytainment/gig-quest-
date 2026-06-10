# Gig Quest — Elite Consistency Audit

> Run before merge and after major documentation changes. Target: **100+ clarity score**.

---

## 1. Documentation Cross-Check

| Check | Pass criteria |
|-------|---------------|
| Route table | `README.md`, `SYSTEM_MAP.md`, `App.tsx` agree on all routes |
| Safe mode | `LEGACY_SAFE_MODE.md` does not claim `App.tsx` is Landing-only |
| Intake default | `.env.example` = `false`; `submissions.ts` uses `=== 'true'` |
| Phase status | `PRODUCT_BLUEPRINT.md` matches `LAUNCH_CHECKLIST.md` merged phases |
| File index | `CODEBASE_INDEX.md` lists every `src/lib`, `src/pages`, `scripts/launch` file |
| AI onboarding | `AGENTS.md` links to `SYSTEM_MAP` and `CONVENTIONS` |

---

## 2. Module Header Audit

| Path pattern | Header required |
|--------------|-----------------|
| `src/lib/*.ts` | ✅ Elite block per CONVENTIONS.md |
| `src/pages/**/*.tsx` | ✅ Elite block |
| `src/contexts/*.tsx` | ✅ Elite block |
| `src/types/*.ts` | ✅ Elite block |
| `src/App.tsx`, `src/main.tsx` | ✅ Elite block |
| `src/components/ui/*` | ❌ shadcn — index only |
| `src/components/landing/*` | README index; optional one-line `@file` |

---

## 3. Security Consistency

| Check | Pass criteria |
|-------|---------------|
| Error sanitization | `handleFirestoreError` — no PII in user-facing errors |
| Admin source | `AuthContext` uses `adminRoles`; no hardcoded email bypass in rules |
| Client XP | No `awardXp()` in artist submit flows |
| Rules header | `firestore.rules` documents SECURITY layer |
| Secrets | No `.env` or service accounts in git |

---

## 4. Behavioral Consistency (Safe Mode)

| Check | Pass criteria |
|-------|---------------|
| `/` public | No auth redirect on landing |
| Waiver gate | Checkbox disabled until waiver viewed (e2e passes) |
| Signature | Mismatch blocks submit (e2e passes) |
| Email fallback | Success shows mailto/Gmail/copy (e2e passes) |
| Firestore intake | OFF unless `VITE_ENABLE_FIRESTORE_INTAKE=true` |

---

## 5. CI Gate

```bash
npm run ci
```

Must pass: typecheck, 6 unit tests, build, 7 e2e tests.

---

## 6. Ops Consistency

| Check | Pass criteria |
|-------|---------------|
| `launch:diagnose` | Documented in SYSTEM_MAP + scripts/launch/README |
| Intake runbook | Gates 1–5 in INTAKE_ENABLE_RUNBOOK.md match verify script |
| Firebase config | `firebase.json` database matches `firebase-applet-config.json` |

---

## Sign-Off Template

```txt
Date:
Auditor:
Docs cross-check:     [ ] PASS
Module headers:       [ ] PASS
Security:             [ ] PASS
Safe mode behavior:   [ ] PASS
npm run ci:           [ ] PASS
Ops docs:             [ ] PASS / N/A (ops pending)
```
