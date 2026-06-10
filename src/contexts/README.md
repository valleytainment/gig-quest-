# `contexts/` — React State Providers

> Layer: 🟪 STATE

| File | Responsibility |
|------|----------------|
| `AuthContext.tsx` | Firebase session, profile, `isAdmin` (UX; rules enforce auth) |

**Rule:** One context per cross-cutting concern; no Firestore business logic beyond auth bootstrap.
