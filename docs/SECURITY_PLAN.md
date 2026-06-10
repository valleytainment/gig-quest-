# Gig Quest — Security Plan

> Layer: 🔴 SECURITY | See also: [SYSTEM_MAP.md](./SYSTEM_MAP.md), [firestore.rules](../firestore.rules)

## Principles

1. **Defense in depth** — UI checks are UX only; Firestore Security Rules are the source of truth.
2. **Least privilege** — Public users get create-only on `applications` with field validation; no list/read of others' data.
3. **No client-grantable admin** — `adminRoles/{uid}` bootstrap only; artists cannot self-promote via profile edits.
4. **Audit everything** — Admin application actions logged via `auditLogs`.
5. **Secrets never in repo** — Service account keys live in env/secret manager only.
6. **Sanitized errors** — `handleFirestoreError()` logs `{ operationType, path, message }` only.

---

## Current State (Production-Ready Code, Ops Pending)

| Area | Status | Notes |
|------|--------|-------|
| Firestore rules | ✅ In repo | `adminRoles` + field validators; **must be published** to Firebase |
| AuthContext `isAdmin` | ✅ UX hint | `adminRoles/{uid}` OR legacy `users.role === 'admin'` |
| Public landing writes | 🔒 Gated | `VITE_ENABLE_FIRESTORE_INTAKE=false` default |
| PII in error logs | ✅ Fixed | Generic user message; sanitized console log |
| Emulator rule tests | 🔲 Phase 17 | Planned |

### Authorization Path

```txt
isAdmin() in firestore.rules:
  1. adminRoles/{request.auth.uid} exists
  2. OR users/{uid}.role == 'admin' (legacy fallback)

AuthContext.isAdmin (client UX only):
  1. hasAdminRole from adminRoles doc
  2. OR profile.role === 'admin'
```

**Bootstrap:** Create `adminRoles/{uid}` via Console or `npm run launch:bootstrap-admin`.

---

## Firestore Rules Strategy

### Public (unauthenticated)

- **Allow:** create on `applications` when `source == 'public_landing'` and `isValidApplicationCreate()`
- **Deny:** list, read, update, delete

### Artist (authenticated)

- Read/write own `users/{uid}` (cannot change `role`, `xp`, `level` without admin rules)
- Read own `applications` where `artistId == uid`
- Create `applications` via artist portal (`source == 'artist_portal'`)

### Admin

- CRUD on `events`, `applications` (updates via `isValidApplicationAdminUpdate`)
- Read `users`, `auditLogs`
- Create `notifications`, `auditLogs`

### Rules Testing (Phase 17 — Planned)

```bash
firebase emulators:start --only firestore
npm run test:rules   # planned
```

Required cases: public cannot list applications; artist cannot read others; admin cannot be self-granted via profile edit.

---

## Environment & Secrets

| Secret | Storage | Never in |
|--------|---------|----------|
| Firebase web API key | `firebase-applet-config.json` (public SDK) | — |
| Firebase service account | Secret manager / ADC | repo |
| `VITE_ENABLE_FIRESTORE_INTAKE` | Hosting env / `.env.local` | committed `.env` |
| `GEMINI_API_KEY` | `.env.local` | repo |

---

## Feature Flag

```txt
VITE_ENABLE_FIRESTORE_INTAKE=false   # default — email fallback only
```

Enable only after [INTAKE_ENABLE_RUNBOOK.md](./INTAKE_ENABLE_RUNBOOK.md) gates pass.

---

## Legal / Consent

- Applications store `ConsentSnapshot` with `waiverVersionId` + `waiverBodyHash`
- Constants in `src/lib/waiver.ts` until `waiverVersions` collection (Phase 8)
- Rules validate consent via `isValidConsent()`

> Technical plan only — not legal advice.

---

## Related Docs

- [DATA_MODEL.md](./DATA_MODEL.md)
- [LEGACY_SAFE_MODE.md](./LEGACY_SAFE_MODE.md)
- [INTAKE_ENABLE_RUNBOOK.md](./INTAKE_ENABLE_RUNBOOK.md)
- [CONSISTENCY_AUDIT.md](./CONSISTENCY_AUDIT.md)
