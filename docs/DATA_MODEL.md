# Gig Quest — Data Model

## Overview

Gig Quest uses Cloud Firestore. The schema is evolving from a prototype (`submissions`) toward a production model (`applications`).

## Current Collections (Live in Code)

| Collection | Used by | Notes |
|------------|---------|-------|
| `applications` | Landing (gated), AdminDashboard | Canonical intake; `source: public_landing \| artist_portal` |
| `users` | AuthContext, dashboards | Profile with `role`, `xp`, `level` |
| `adminRoles` | AuthContext, rules | Admin bootstrap; doc id = uid |
| `events` | Admin/Artist dashboards | `title`, `description`, `date`, `location`, `status` |
| `submissions` | Admin/Artist dashboards | **Legacy** — auth-required; migrate to `applications` |
| `auditLogs` | Admin actions | `logAuditAction()` |
| `notifications` | Planned | User notifications |
| `waiverVersions` | Planned (Phase 8) | Public read; constants in `lib/waiver.ts` today |

Public landing intake writes to Firestore **only when** `VITE_ENABLE_FIRESTORE_INTAKE=true`. Default path is mailto/Gmail fallback.

## `applications` (Canonical Intake)

Canonical intake for public landing and artist portal.

```ts
type Application = {
  id: string;
  eventId?: string;
  artistId?: string;
  source: 'public_landing' | 'artist_portal';
  status: 'new' | 'reviewing' | 'approved' | 'waitlisted' | 'rejected' | 'checked_in' | 'completed' | 'no_show';
  artistSnapshot: {
    stageName: string;
    legalName?: string;
    email: string;
    phone?: string;
    city?: string;
    socialUrl?: string;
    performanceType?: string;
  };
  emergencyContact?: { name: string; phone: string };
  portfolioUrl?: string;
  message?: string;
  internalNotes?: string;
  consent: ConsentSnapshot;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
```

### `ConsentSnapshot`

```ts
type ConsentSnapshot = {
  waiverVersionId: string;
  waiverBodyHash: string;
  waiverViewed: boolean;
  waiverAccepted: boolean;
  ageConfirmed: boolean;
  eSignConsent: boolean;
  legalSignature: string;
  initials: string;
  guardianName?: string;
  guardianPhone?: string;
  acceptedAt: Timestamp;
  userAgentHash?: string;
};
```

### `ArtistProfile` (Phase 6+)

Extended profile beyond basic `users` document.

```ts
type ArtistProfile = {
  uid: string;
  email: string;
  displayName: string;
  legalName?: string;
  stageName: string;
  city?: string;
  genres: string[];
  performanceTypes: string[];
  bio?: string;
  socialLinks: { instagram?: string; tiktok?: string; youtube?: string; website?: string };
  demoLinks: string[];
  photoURL?: string;
  xp: number;
  level: number;
  badges: string[];
  reliabilityScore?: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
```

### `Event` (target shape, Phase 5+)

```ts
type Event = {
  id: string;
  title: string;
  description: string;
  location: string;
  addressPrivate?: boolean;
  startsAt: Timestamp;
  endsAt?: Timestamp;
  capacity: number;
  status: 'draft' | 'open' | 'closed' | 'completed' | 'cancelled';
  requirements: string[];
  feeNote?: string;
  createdBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
```

### `auditLogs` (Phase 5/7+)

Append-only admin action log.

```ts
type AuditLog = {
  id: string;
  actorId: string;
  action: string;
  entityType: 'event' | 'application' | 'artist' | 'message' | 'waiver';
  entityId: string;
  before?: unknown;
  after?: unknown;
  createdAt: Timestamp;
};
```

### `waiverVersions` (Phase 8+)

Versioned waiver text with body hash for consent records.

## Migration Plan

| Step | When | Action |
|------|------|--------|
| 1 | Phase 3 | Create `applications`; public create-only rules |
| 2 | Phase 5 | Admin reads `applications`; replace mock slot counts |
| 3 | Post Phase 5 | Deprecate `submissions` after migration verified |
| 4 | Phase 8 | Add `waiverVersions`; link every application to version |

## Collection Access Summary (Target)

| Actor | applications | events | users | adminRoles |
|-------|-------------|--------|-------|------------|
| Public | create only | — | — | — |
| Artist | read own | read open | read/write own | — |
| Admin | full | full | read | read |

See [SECURITY_PLAN.md](./SECURITY_PLAN.md) for enforcement details.
