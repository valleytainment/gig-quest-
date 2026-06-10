# Gig Quest — Documentation & Code Conventions

> **Purpose:** Single source of truth for how this repo is labeled, documented, and read by humans and AI.
> **Score target:** 100+ clarity — no contradictions between docs and code.

---

## Color / Layer Legend

| Marker | Layer | Meaning | Example paths |
|--------|-------|---------|---------------|
| 🟦 | `INFRASTRUCTURE` | External IO, SDK init, env gates | `src/lib/firebase.ts`, `scripts/launch/*` |
| 🟩 | `DOMAIN` | Business rules, pure logic, types | `src/lib/submissions.ts`, `src/types/*` |
| 🟨 | `ROUTE` | Page-level orchestration | `src/pages/*` |
| 🟧 | `UI` | Presentational components | `src/components/landing/*`, `src/components/feedback/*` |
| 🟪 | `STATE` | React context, auth session | `src/contexts/*` |
| 🔴 | `SECURITY` | Rules, auth gates, PII handling | `firestore.rules`, `handleFirestoreError` |
| ⚪ | `STYLE` | Design tokens, motion, forms | `src/styles/*` |
| 🟫 | `OPS` | Launch scripts, CI, e2e | `scripts/launch/*`, `e2e/*` |

---

## Module Header Block (TypeScript / TSX)

Every **non-trivial** source file under `src/lib/`, `src/pages/`, `src/contexts/`, and `src/types/` MUST begin with this block:

```typescript
/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🟦 MODULE │ gig-quest/src/lib/example.ts
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * @layer          INFRASTRUCTURE | DOMAIN | ROUTE | UI | STATE | SECURITY
 * @responsibility One sentence: what this file owns
 * @depends-on     Comma-separated imports / external deps
 * @consumers      Who imports this file
 * @safe-mode      How Legacy Safe Mode affects this file (or N/A)
 *
 * STRUCTURAL INTENT
 * 2–4 lines: architecture role, invariants, non-obvious constraints.
 *
 * @see docs/SYSTEM_MAP.md
 * @see docs/CODEBASE_INDEX.md
 * ═══════════════════════════════════════════════════════════════════════════════
 */
```

### Rules

1. **Path in header** must match the real file path from repo root.
2. **@layer** must be exactly one value from the legend table.
3. **STRUCTURAL INTENT** states *why* the file exists — not what each function does.
4. Do **not** duplicate JSDoc on every export; the block documents the file.
5. UI primitives (`src/components/ui/*`) are shadcn — document in `src/components/ui/README.md` only.

---

## Shell Script Header

```bash
#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════════════════
# 🟫 OPS │ scripts/launch/example.sh
# @layer OPS | @responsibility ... | @see scripts/launch/README.md
# ═══════════════════════════════════════════════════════════════════════════════
```

---

## Documentation Hierarchy

```txt
README.md                 ← Entry point (humans)
AGENTS.md                 ← Entry point (AI / Cursor)
docs/
  CONVENTIONS.md          ← This file (labels, headers, legend)
  SYSTEM_MAP.md           ← Architecture, routes, data flow
  CODEBASE_INDEX.md       ← Every file indexed
  LEGACY_SAFE_MODE.md     ← Non-negotiable landing rules
  INTAKE_ENABLE_RUNBOOK.md← Firestore intake gates (ops)
  DATA_MODEL.md           ← Firestore collections
  SECURITY_PLAN.md        ← Auth, rules, threat model
  LAUNCH_CHECKLIST.md     ← Phase gates
  PRODUCT_BLUEPRINT.md    ← Product vision & roadmap
src/README.md             ← Source tree map
scripts/launch/README.md  ← Operator scripts
```

**Precedence on conflict:** `LEGACY_SAFE_MODE.md` > `SYSTEM_MAP.md` > `PRODUCT_BLUEPRINT.md` > inline comments.

---

## Naming & Branch Conventions

| Item | Convention |
|------|------------|
| Branches | `phase/XX-short-description`, `fix/*`, `chore/*`, `feat/*` |
| Env flags | `VITE_*` prefix; intake flag defaults `false` |
| Firestore collections | camelCase plural (`applications`, `adminRoles`) |
| Types | `src/types/*.ts`; domain types co-located with feature when tiny |

---

## Safe Mode Invariants (Quick Reference)

| Invariant | Enforced by |
|-----------|-------------|
| `/` = public landing | `App.tsx` route |
| Intake OFF by default | `.env.example`, `isFirestoreIntakeEnabled()` |
| Email fallback always on success | `Landing.tsx`, `buildEmailDraft()` |
| No PII in error logs | `handleFirestoreError()` |
| Admin = `adminRoles/{uid}` | `AuthContext`, `firestore.rules` |

---

## Consistency Audit Checklist

Before merge, verify:

- [ ] README route table matches `App.tsx`
- [ ] `CODEBASE_INDEX.md` lists new/moved files
- [ ] Module headers present on new `lib/`, `pages/`, `contexts/`, `types/` files
- [ ] `PRODUCT_BLUEPRINT` phase status matches reality
- [ ] No doc claims `App.tsx` is Landing-only (router is wired; `/` is Landing)
- [ ] `npm run ci` passes
