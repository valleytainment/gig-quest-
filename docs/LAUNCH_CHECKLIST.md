# Gig Quest — Launch Checklist

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
- [x] `App.tsx` renders `<Landing />` only

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

- [ ] `.github/workflows/ci.yml` runs on PR + push to `main`
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

## Phase 12A Gate (Visual Wow — Merged)

- [x] Design token system (`src/styles/*`)
- [x] Landing component split
- [x] Success panel with copy-email actions
- [x] Login/legal polish
- [x] Admin/artist empty states
- [x] Email fallback + waiver behavior preserved
- [x] `npm run ci` passes locally

## Phase 12B Gate (Intake Enable — BLOCKED on ops)

- [x] `docs/INTAKE_ENABLE_RUNBOOK.md` exists
- [x] `npm run launch:verify` passes
- [ ] Rules published via Console or CLI
- [ ] `adminRoles/{uid}` bootstrapped
- [ ] Manual smoke 6–13 pass
- [ ] Staging test with `VITE_ENABLE_FIRESTORE_INTAKE=true`
- [ ] Production flag enabled only after staging pass

## Production Deploy Checklist

- [ ] `npm run build` succeeds
- [ ] Environment variables set in hosting provider
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
