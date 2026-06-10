# `pages/` — Route Orchestrators

> Layer: 🟨 ROUTE | Router: [App.tsx](../App.tsx)

| Path | File | Auth |
|------|------|------|
| `/` | `Landing.tsx` | Public — **SAFE MODE CRITICAL** |
| `/login` | `Login.tsx` | Public |
| `/admin/*` | `admin/AdminDashboard.tsx` | Admin |
| `/artist/*` | `artist/ArtistDashboard.tsx` | Artist |
| `/legal/*` | `legal/*` | Public |
| `*` | `NotFound.tsx` | Public |

**Rule:** Route files own state + side effects; UI in `components/`.
