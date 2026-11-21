# Gig Quest admin role hardening — 2026-11-20

Existing Firestore rules already block owner promotion via `users/{uid}.role`: profile create forces `artist`, and ordinary updates preserve `role`, `xp`, `level`, and `createdAt`. Therefore this review did **not** reproduce the Crypto Gods self-escalation exploit.

However, `isAdmin()` still trusted the legacy profile `role == admin` value. The patch removes this fallback and accepts only signed Firebase admin claims or the existing server-provisioned `adminRoles/{uid}` record. `adminRoles` writes themselves require admin authority; initial bootstrap must be performed using trusted operator credentials.

Before applying the rules, enumerate legitimate admins relying only on legacy profile roles and provision `adminRoles` or custom claims. Run `npm test`, `npm run typecheck`, `npm run build`, and Firebase emulator tests covering ordinary profile create/update, adminRoles self-create denial, admin claim access and cross-user read denial. Check UI `AuthContext.isAdmin` for legacy role presentation; server authorization must remain authoritative. Deploy rules to an explicitly verified project only after compatibility tests.

No production Firebase deployment is performed by this GitHub PR.
