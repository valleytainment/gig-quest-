# Gig Quest — Security Plan

## Principles

1. **Defense in depth** — UI checks are UX only; Firestore Security Rules are the source of truth.
2. **Least privilege** — Public users get create-only on intake; no list/read of other artists' data.
3. **No client-grantable admin** — Admin role must not be self-assigned via profile edits.
4. **Audit everything** — Admin actions on applications, events, and messages are logged.
5. **Secrets never in repo** — Service account keys, private API keys, and webhook secrets live in env/secret manager only.

## Current State (Prototype)

| Area | Status | Risk |
|------|--------|------|
| Firestore rules | Present in `firestore.rules` | Medium — hardcoded admin email bypass |
| AuthContext `isAdmin` | Client-side check + email bypass | High if treated as security |
| Public landing writes | Not enabled | Low (email fallback only) |
| Emulator tests | Not yet | High for Phase 3+ |

### Known Issues (to fix in Phase 7)

- Admin bypass via hardcoded email in `AuthContext.tsx` and `firestore.rules`
- `users.role` can be set to `admin` on create if `isAdmin()` passes (circular)
- No `adminRoles/{uid}` collection yet
- Sensitive auth info logged in `handleFirestoreError`

## Target Role Model (Phase 7)

```txt
adminRoles/{uid}
  role: 'admin'
  grantedBy: string
  grantedAt: Timestamp
```

Remove hardcoded email from final authorization path. Bootstrap first admin via Firebase console or one-time script documented in ops runbook.

## Firestore Rules Strategy

### Public (unauthenticated)

- **Allow:** create on `applications/{id}` with strict field validator (Phase 3)
- **Deny:** list, read, update, delete on all collections

### Artist (authenticated)

- Read/write own `users/{uid}` profile (cannot change `role`, `xp`, `level` without admin)
- Read own `applications` where `artistId == uid`
- Read `events` where `status == 'open'`
- Create `applications` for self via artist portal

### Admin

- Full CRUD on `events`, `applications`
- Read all `users`
- Create append-only `auditLogs`
- Create `notifications` for users

### Rules Testing (Phase 7+)

Use Firestore Emulator Suite:

```bash
# Planned in Phase 7/10
firebase emulators:start --only firestore
npm run test:rules
```

Required test cases:

- Public cannot list applications
- Artist cannot read another artist's application
- Artist cannot approve own application
- Admin role cannot be gained from client profile edit
- Public create rejects invalid/missing consent fields

## Environment & Secrets

| Secret | Storage | Never in |
|--------|---------|----------|
| Firebase web API key | `firebase-applet-config.json` (public SDK) | — |
| Firebase service account | Secret manager / CI env | repo, `.env.example` |
| Email provider API key | Secret manager | repo, client bundle |
| `GEMINI_API_KEY` | `.env.local` | repo |

See `.env.example` for allowed local env vars.

## Feature Flag (Phase 3)

```txt
VITE_ENABLE_FIRESTORE_INTAKE=false  # default until emulator + e2e pass
```

When `false`, landing uses mailto/Gmail only (current safe behavior).

## Legal / Consent (Phase 8)

- Every application stores `ConsentSnapshot` with `waiverVersionId` and `waiverBodyHash`
- Waiver text changes require new version in `waiverVersions`
- Admin can export consent packet for legal review

> This document is a technical security plan, not legal advice. Waiver and privacy copy should be reviewed by qualified counsel before public event use.

## Related Docs

- [DATA_MODEL.md](./DATA_MODEL.md)
- [LEGACY_SAFE_MODE.md](./LEGACY_SAFE_MODE.md)
- [LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md)
