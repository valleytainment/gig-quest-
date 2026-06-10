# Gig Quest — Codebase Index

> Machine- and human-readable inventory. Update when adding/moving files.
> Legend: [CONVENTIONS.md](./CONVENTIONS.md)

---

## Root

| File | Layer | Responsibility |
|------|-------|----------------|
| `README.md` | ⚪ | Human entry point, quick start |
| `AGENTS.md` | ⚪ | AI / Cursor entry point |
| `package.json` | 🟫 OPS | Scripts, dependencies |
| `vite.config.ts` | 🟦 | Vite + Vitest config |
| `playwright.config.ts` | 🟫 OPS | E2E config (mobile Chrome) |
| `tsconfig.json` | 🟦 | TypeScript strict config |
| `firebase.json` | 🟫 OPS | Firestore rules deploy target |
| `.firebaserc` | 🟫 OPS | Firebase project alias |
| `firestore.rules` | 🔴 | Firestore security rules |
| `firebase-applet-config.json` | 🟦 | Public Firebase web config |
| `firebase-blueprint.json` | ⚪ | Legacy scaffold metadata |
| `metadata.json` | ⚪ | App display metadata |
| `.env.example` | 🟦 | Env template (intake OFF) |
| `docs/CONFIG.md` | 🟦 | Root config reference |
| `scripts/audit-consistency.sh` | 🟫 | `npm run audit:consistency` |
| `components.json` | 🟧 | shadcn/ui config |

---

## `src/` — Application Source

| File | Layer | Responsibility |
|------|-------|----------------|
| `main.tsx` | 🟦 | React DOM mount |
| `App.tsx` | 🟨 | Router shell, providers, route table |
| `index.css` | ⚪ | Global styles import |
| `vite-env.d.ts` | 🟦 | Vite env type augmentation |

### `src/contexts/`

| File | Layer | Responsibility |
|------|-------|----------------|
| `AuthContext.tsx` | 🟪 | Google auth session, profile, `isAdmin` via `adminRoles` |

### `src/lib/`

| File | Layer | Responsibility |
|------|-------|----------------|
| `firebase.ts` | 🟦 | Firebase init, auth helpers, `handleFirestoreError` |
| `submissions.ts` | 🟩 | Intake flag, email draft, `createPublicApplication` |
| `waiver.ts` | 🟩 | Waiver version id + body hash constants |
| `audit.ts` | 🟩 | `auditLogs` write helper |
| `messageTemplates.ts` | 🟩 | Admin message templates (approve/reject/waitlist) |
| `xp.ts` | 🟩 | XP level helpers (server-side awards planned) |
| `utils.ts` | 🟧 | `cn()` classname merge |

### `src/types/`

| File | Layer | Responsibility |
|------|-------|----------------|
| `applications.ts` | 🟩 | Application, consent, landing form types |

### `src/pages/`

| File | Layer | Responsibility |
|------|-------|----------------|
| `Landing.tsx` | 🟨 | Public intake orchestrator (form state, submit) |
| `Login.tsx` | 🟨 | Google sign-in panel |
| `NotFound.tsx` | 🟨 | 404 page |
| `admin/AdminDashboard.tsx` | 🟨 | Events, applications review, legacy submissions |
| `artist/ArtistDashboard.tsx` | 🟨 | Artist events, apply, profile stub |
| `legal/LegalLayout.tsx` | 🟨 | Legal pages layout shell |
| `legal/Terms.tsx` | 🟨 | Terms of service |
| `legal/Privacy.tsx` | 🟨 | Privacy policy |
| `legal/Waiver.tsx` | 🟨 | Liability waiver text |

### `src/components/landing/`

| File | Layer | Responsibility |
|------|-------|----------------|
| `LandingHero.tsx` | 🟧 | Hero headline + CTA |
| `TrustStrip.tsx` | 🟧 | Social proof strip |
| `HowItWorks.tsx` | 🟧 | Steps section |
| `FaqBlock.tsx` | 🟧 | FAQ accordion |
| `ArtistIntakeCard.tsx` | 🟧 | Intake card wrapper |
| `LandingIntakeForm.tsx` | 🟧 | Form fields + validation UI |
| `WaiverBlock.tsx` | 🟧 | Waiver view gate + checkboxes |
| `WaiverDialogContent.tsx` | 🟧 | Full waiver modal content |
| `ConsentBlock.tsx` | 🟧 | Age + e-sign consent |
| `SuccessPanel.tsx` | 🟧 | Post-submit success UI |
| `EmailFallbackActions.tsx` | 🟧 | mailto / Gmail / copy buttons |

### `src/components/feedback/`

| File | Layer | Responsibility |
|------|-------|----------------|
| `EliteLoader.tsx` | 🟧 | Branded loading spinner |
| `EmptyState.tsx` | 🟧 | Empty list placeholder |
| `ErrorState.tsx` | 🟧 | Error placeholder |
| `PageSkeleton.tsx` | 🟧 | Route loading skeleton |

### `src/components/`

| File | Layer | Responsibility |
|------|-------|----------------|
| `Layout.tsx` | 🟧 | Authenticated shell (nav for admin/artist) |
| `ui/*` | 🟧 | shadcn primitives — see shadcn docs |

### `src/styles/`

| File | Layer | Responsibility |
|------|-------|----------------|
| `tokens.css` | ⚪ | CSS variables / design tokens |
| `effects.css` | ⚪ | Gradients, glass, shadows |
| `motion.css` | ⚪ | Animation utilities |
| `forms.css` | ⚪ | Form-specific styles |

---

## `scripts/launch/`

| File | Layer | Responsibility |
|------|-------|----------------|
| `deploy-rules.sh` | 🟫 | `firebase deploy --only firestore:rules` |
| `bootstrap-admin.mjs` | 🟫 | Create `adminRoles/{ADMIN_UID}` |
| `launch-all.sh` | 🟫 | CI + deploy + bootstrap chain |
| `verify-readiness.sh` | 🟫 | Pre-intake CI + rules probe warn |
| `open-console.sh` | 🟫 | Open GCP/Firebase tabs, copy rules |
| `open-new-project.sh` | 🟫 | New Firebase project wizard |
| `apply-firebase-config.mjs` | 🟫 | Write config files from JSON |
| `diagnose-firestore.mjs` | 🟫 | CONSUMER_INVALID / API probe |
| `test-public-create.mjs` | 🟫 | Public `applications` create probe |

---

## `tests/` & `e2e/`

| File | Layer | Responsibility |
|------|-------|----------------|
| `tests/README.md` | ⚪ | Vitest index |
| `tests/landing.smoke.test.tsx` | 🟫 | Vitest landing component smoke |
| `tests/setup.ts` | 🟫 | Vitest DOM setup |
| `e2e/README.md` | ⚪ | Playwright index |
| `e2e/landing.spec.ts` | 🟫 | Mobile intake happy path |
| `e2e/phase11-smoke.spec.ts` | 🟫 | Legal, waiver gate, auth redirect |

---

## `docs/`

| File | Purpose |
|------|---------|
| `CONVENTIONS.md` | Labels, headers, module block spec |
| `SYSTEM_MAP.md` | Architecture, routes, flows |
| `CODEBASE_INDEX.md` | This file |
| `CONSISTENCY_AUDIT.md` | Pre-merge elite consistency checklist |
| `README.md` | Documentation hub index |
| `LEGACY_SAFE_MODE.md` | Landing non-negotiables |
| `INTAKE_ENABLE_RUNBOOK.md` | Firestore intake enable gates |
| `DATA_MODEL.md` | Collection schemas |
| `SECURITY_PLAN.md` | Threat model, rules strategy |
| `LAUNCH_CHECKLIST.md` | Phase verification gates |
| `PRODUCT_BLUEPRINT.md` | Vision and roadmap |
