# Gig Quest — AI Agent Guide

> **For:** Cursor, Copilot, Claude, and other coding agents.
> **Goal:** Zero-confusion onboarding — read this before editing any file.

---

## 🚨 Non-Negotiables (Read First)

1. **Legacy Safe Mode** — [docs/LEGACY_SAFE_MODE.md](docs/LEGACY_SAFE_MODE.md)
   - `/` must stay public `Landing` with waiver + email fallback
   - `VITE_ENABLE_FIRESTORE_INTAKE` defaults **`false`**
   - Never remove mailto/Gmail success path

2. **Security** — [docs/SECURITY_PLAN.md](docs/SECURITY_PLAN.md)
   - Admin = `adminRoles/{uid}` in Firestore (not client-only email checks)
   - `handleFirestoreError()` — log `{ operationType, path, message }` only; generic user error
   - Never commit secrets (`.env`, service account JSON)

3. **Firebase ops blocked** — Run `npm run launch:diagnose` before enabling intake.
   - `CONSUMER_INVALID` = enable Firestore API in GCP Console first

---

## 📚 Documentation Map

| Read order | File | Why |
|------------|------|-----|
| 1 | [docs/SYSTEM_MAP.md](docs/SYSTEM_MAP.md) | Architecture, routes, data flow |
| 2 | [docs/CONVENTIONS.md](docs/CONVENTIONS.md) | Layer colors, module header format |
| 3 | [docs/CODEBASE_INDEX.md](docs/CODEBASE_INDEX.md) | Every file indexed |
| 4 | [docs/DATA_MODEL.md](docs/DATA_MODEL.md) | Firestore schemas |
| 5 | [docs/INTAKE_ENABLE_RUNBOOK.md](docs/INTAKE_ENABLE_RUNBOOK.md) | Intake enable gates |
| 6 | [docs/CONSISTENCY_AUDIT.md](docs/CONSISTENCY_AUDIT.md) | Pre-merge elite audit |

---

## 🎨 Layer Color Key

| Color | Layer | Edit when… |
|-------|-------|------------|
| 🟦 | INFRASTRUCTURE | Firebase, env, build config |
| 🟩 | DOMAIN | Business logic, types, submissions |
| 🟨 | ROUTE | Pages, routing, orchestration |
| 🟧 | UI | Components (presentational) |
| 🟪 | STATE | Context, session |
| 🔴 | SECURITY | Rules, auth, PII |
| 🟫 | OPS | Scripts, CI, e2e |

---

## 🗂️ Key Entry Points

```txt
src/App.tsx              Route table (source of truth for URLs)
src/pages/Landing.tsx    Public intake orchestrator
src/lib/submissions.ts   Intake flag + email + Firestore create
src/lib/firebase.ts      Firebase init + error sanitizer
src/contexts/AuthContext.tsx   Auth + isAdmin
firestore.rules          Authorization (must match client assumptions)
```

---

## ✅ Before Every PR

```bash
npm run ci
```

Update [docs/CODEBASE_INDEX.md](docs/CODEBASE_INDEX.md) if files added/moved.
Add module header block to new `lib/`, `pages/`, `contexts/`, `types/` files per [CONVENTIONS.md](docs/CONVENTIONS.md).

---

## 🚫 Common Mistakes

| Mistake | Correct approach |
|---------|------------------|
| Doc says `App.tsx` is Landing-only | Router is wired; only `/` must be public landing |
| Enable intake without rules deploy | Follow [INTAKE_ENABLE_RUNBOOK.md](docs/INTAKE_ENABLE_RUNBOOK.md) |
| Client-side `awardXp()` | Deferred — rules block client XP writes |
| Log full Firestore errors to user | Use `handleFirestoreError()` |
| Commit `firebase-applet-config` secrets | Web API key is public; service accounts are not |

---

## 🔧 Useful Commands

```bash
npm run dev                    # localhost:3000
npm run ci                     # typecheck + test + build + e2e
npm run audit:consistency      # static doc/header audit
npm run launch:verify          # pre-intake readiness
npm run launch:diagnose        # Firestore API probe
npm run launch:open-console    # operator Console tabs
```

---

## Phase Context

Phases 0–12B are **merged**. Firestore production enablement is **operator-blocked**.
Future work: Phase 14+ (admin kanban, EPK, server XP) — see [docs/PRODUCT_BLUEPRINT.md](docs/PRODUCT_BLUEPRINT.md).
