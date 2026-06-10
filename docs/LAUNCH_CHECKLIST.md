# Gig Quest — Launch Checklist

> Hub: [docs/README.md](./README.md) | Audit: [CONSISTENCY_AUDIT.md](./CONSISTENCY_AUDIT.md) | Run: `npm run audit:consistency`

Use this checklist before each production deploy and before declaring 10+ done.

## Pre-Merge (Every PR)

- [ ] `npm run ci` passes locally or in GitHub Actions
- [ ] Phase 0 landing smoke tests pass (`npm run test`)
- [ ] Mobile e2e passes (`npm run test:e2e`)
- [ ] [LEGACY_SAFE_MODE.md](./LEGACY_SAFE_MODE.md) rules verified if landing touched
- [ ] No secrets in diff (`.env.local`, service account JSON, API keys)
- [ ] PR scope matches phase (no drive-by refactors)

## Phase 0 Gate (Merged)

- [x] Vitest + Testing Library configured
- [x] Landing smoke tests (6 tests)
- [x] Playwright mobile e2e
- [x] `docs/LEGACY_SAFE_MODE.md`
- [x] `npm run ci` includes typecheck + test + build + e2e
- [x] `App.tsx` routes `/` to `<Landing />` (router wired; safe mode on `/` behavior)

## Phase 1 Gate (Repo Truth)

- [x] Package name is `gig-quest`
- [x] README describes Gig Quest (not AI Studio starter)
- [x] `docs/PRODUCT_BLUEPRINT.md` exists
- [x] `docs/DATA_MODEL.md` exists
- [x] `docs/SECURITY_PLAN.md` exists
- [x] `docs/LAUNCH_CHECKLIST.md` exists
- [x] `.env.example` exists with no secrets
- [x] npm-only documented; `pnpm-lock.yaml` removed
- [x] No app behavior changes

## Platform Readiness (Phases 2–10)

### Router & Auth (Phase 2)

- [ ] `/` still public `<Landing />`
- [ ] `/login`, `/artist`, `/admin` routes work
- [ ] Unauthenticated users redirected from protected routes

### Submissions (Phase 3)

- [ ] `applications` collection with consent snapshot
- [ ] `VITE_ENABLE_FIRESTORE_INTAKE=false` default
- [ ] Email fallback on Firestore failure
- [ ] Emulator test for public create

### Admin Ops (Phase 5)

- [ ] Real `event.capacity` (no mock slot counts)
- [ ] Application review kanban
- [ ] Audit logs on admin actions
- [ ] CSV/roster export

### Artist Portal (Phase 6)

- [ ] Profile/EPK save
- [ ] Apply once per event
- [ ] Real status visibility
- [ ] XP from persisted events

### Security (Phase 7)

- [ ] `adminRoles/{uid}` replaces email bypass
- [ ] Emulator rules tests pass
- [ ] No sensitive console dumps

### Legal (Phase 8)

- [ ] `waiverVersions` collection
- [ ] `/legal/terms`, `/legal/privacy`, `/legal/waiver` pages
- [ ] Consent export for admin
- [ ] Legal counsel review scheduled

### Notifications (Phase 9)

- [ ] Confirmation email on submit
- [ ] Admin approval/waitlist/rejection templates
- [ ] Message audit logs
- [ ] Gmail manual fallback remains

### Launch Hardening (Phase 10)

- [ ] `.github/workflows/ci.yml` runs on PR + push to `main` — passing on GitHub (Jun 2026)
- [ ] `.github/workflows/deploy-pages.yml` auto-deploys gh-pages after CI on `main`
- [ ] Full test matrix documented below passes in CI
- [ ] Production deploy runbook documented
- [ ] Rollback plan documented

## Test Matrix (Target — Phase 10)

```txt
Landing:
  Loads
  Form opens
  Waiver opens
  Acceptance locked until viewed
  Signature mismatch blocks submit
  Legacy fallback links generate

Submission:
  Firestore success (flag on)
  Firestore failure fallback
  Duplicate prevention
  Confirmation ID shown

Auth:
  Login works
  Artist route protected
  Admin route protected

Admin:
  Event create
  Application approve/reject
  Slots left calculation

Artist:
  Profile save
  Apply once
  Status visibility
  XP update

Security:
  Emulator deny-list tests pass
  Emulator allow-list tests pass
```

## Phase 11 Gate (Launch Ops)

- [x] `firebase.json` and `.firebaserc` committed
- [x] `scripts/launch/` deploy + bootstrap scripts present
- [x] `e2e/phase11-smoke.spec.ts` passes
- [x] `npm run launch:deploy-rules` documented and runnable after `firebase login`
- [x] `ADMIN_UID` bootstrap script documented
- [x] `VITE_ENABLE_FIRESTORE_INTAKE` remains `false` by default
- [ ] Firestore rules deployed to production (operator step)
- [ ] `adminRoles/{uid}` bootstrapped (operator step)
- [ ] Manual smoke items 6–13 pass before Phase 12B

## Phase 12A Gate (Visual Foundation — Merged)

- [x] Design token system (`src/styles/*`)
- [x] UI primitives + feedback components
- [x] `actions.css` / `motion.css` with reduced-motion support
- [x] Email fallback + waiver behavior preserved
- [x] `npm run ci` passes locally

## Phase 12B–12G Gate (Visual Experience — Branch `phase/12-visual-complete`)

- [x] **12B** Landing wow — hero, trust strip, floating cards, CTA-first mobile layout
- [x] **12C** Intake form — 7 guided sections, waiver gate, sticky submit
- [x] **12D** Email success — checklist, mailto/Gmail/copy recovery + tests
- [x] **12E** Portal polish — login, admin, artist, legal surfaces
- [x] **12F** Motion pass — stagger, tap-scale, loaders, status pills
- [x] **12G** Mobile conversion — 375px e2e, safe-area submit, touch targets
- [x] `npm run ci` — vitest 27/27, playwright 11/11
- [x] Merged to `main` (`f80131b`)
- [x] Production smoke after deploy — GitHub Pages live, 11/11 @ 375px

## Phase 12B Gate (Firestore Intake Enable — BLOCKED on ops)

- [x] `docs/INTAKE_ENABLE_RUNBOOK.md` exists
- [x] `npm run launch:verify` passes
- [ ] Rules published via Console or CLI
- [ ] `adminRoles/{uid}` bootstrapped
- [ ] Manual smoke 6–13 pass
- [ ] Staging test with `VITE_ENABLE_FIRESTORE_INTAKE=true`
- [ ] Production flag enabled only after staging pass

## Production Deploy Checklist

- [x] `npm run build` succeeds
- [x] GitHub Pages deployed — https://valleytainment.github.io/gig-quest-/
- [x] `npm run launch:smoke-production` — 11/11 pass (375px mobile)
- [ ] `npm run launch:deploy-hosting` (Firebase) after `firebase login`
- [ ] Environment variables set in hosting provider (`VITE_ENABLE_FIRESTORE_INTAKE=false`)
- [ ] Firestore rules deployed (`firebase deploy --only firestore:rules`)
- [ ] Smoke test `/` on production URL
- [ ] Submit test registration (staging first)
- [ ] Admin can see test application (when Phase 3+ live)
- [ ] Monitor for errors in first 24 hours

## Rollback

1. Revert to previous deploy in hosting dashboard.
2. If Firestore rules changed, redeploy previous rules version.
3. Verify `/` landing and intake still work.
4. Document incident in ops log.

## Sign-Off

| Role | Name | Date | Phase |
|------|------|------|-------|
| Dev | | | |
| Review (Agent B) | | | |
| Product | | | |
