# Phase 12B — Firestore Intake Enable Runbook

**Do not enable intake until all gates below are checked.**

Safe default remains: `VITE_ENABLE_FIRESTORE_INTAKE=false` (email fallback only).

## Gate checklist

```txt
[ ] 1. Firestore rules published (Console or CLI)
[ ] 2. adminRoles/{your-uid} created
[ ] 3. Manual smoke 6–13 pass (login, admin, artist, review)
[ ] 4. Staging test with flag ON + one real submit
[ ] 5. Production flag ON only after staging pass
```

## Option A — Firebase Console (recommended if CLI login fails)

### Publish rules

1. Open: https://console.firebase.google.com/project/gen-lang-client-0705859710/firestore/databases/ai-studio-05fc7137-135e-48c8-a892-207e99d4e60a/rules
2. Copy entire contents of `firestore.rules` from repo
3. Paste into editor → **Publish**

### Bootstrap admin

1. Authentication → Users → copy your **User UID**
2. Firestore → same database → collection `adminRoles` → document ID = your UID
3. Fields:

| Field | Type | Value |
|-------|------|-------|
| `role` | string | `owner` |
| `createdBy` | string | `manual-bootstrap` |
| `createdAt` | timestamp | now |

## Option B — Firebase CLI

```bash
npx firebase logout
npx firebase login --reauth --no-localhost   # use if attest fails, try phone hotspot
npm run launch:deploy-rules
ADMIN_UID=your-uid npm run launch:bootstrap-admin
```

## Manual smoke (items 6–13)

```txt
6.  /login → Google sign-in works
7.  /admin loads for bootstrapped admin UID
8.  /artist loads for non-admin account
9.  /legal/terms, /privacy, /waiver load
10. Admin creates open event with capacity
11. Artist applies to event
12. Admin review queue shows application
13. Approve / waitlist / reject persists
```

## Enable intake (staging first)

```bash
# .env.local (never commit)
VITE_ENABLE_FIRESTORE_INTAKE=true
```

```bash
npm run dev
# Submit on / → verify applications doc + email fallback still shown on success
```

## Enable intake (production)

Set in Netlify/hosting env:

```txt
VITE_ENABLE_FIRESTORE_INTAKE=true
```

Redeploy → smoke test public landing submit → verify Firestore `applications` doc + mailto fallback.

## Rollback

1. Set `VITE_ENABLE_FIRESTORE_INTAKE=false` in hosting env → redeploy
2. Landing reverts to email-only path immediately (no rules change needed)
