# Gig Quest — Product Blueprint

## North Star

Gig Quest is an artist/event operating system for pop-up performances, showcases, tailgates, open mics, and live creator activations.

```txt
Artists:
Apply → Build profile → Discover quests → Get approved → Check in → Perform → Earn XP → Get future priority

Admins:
Create event → Review artists → Approve lineup → Message performers → Track check-ins → Run show → Export recap
```

## Current Live Surface

| Route | Component | Status |
|-------|-----------|--------|
| `/` | `Landing` | **LIVE** — public intake + waiver + email fallback |
| `/login` | `Login` | Wired — Google auth |
| `/legal/*` | Legal pages | Wired — static legal |
| `/admin/*` | `AdminDashboard` | Wired — requires `adminRoles/{uid}` |
| `/artist/*` | `ArtistDashboard` | Wired — authenticated artist |

**Safe mode:** Firestore intake OFF by default. See [LEGACY_SAFE_MODE.md](./LEGACY_SAFE_MODE.md).

## Core Rules

1. Do not delete or break `Landing.tsx` intake behavior.
2. Do not remove mailto/Gmail fallback until Firestore submit is proven.
3. Do not replace `/` with an auth-only app.
4. Do not ship mock admin data as production truth.
5. Do not trust client-only admin checks for security.

## Target Route Map

```txt
/                         Public landing + intake
/login                    Google login
/artist                   Artist dashboard
/artist/profile           Artist profile / EPK
/artist/applications      My applications
/artist/quests            Discover quests
/artist/check-in          Approved event check-in

/admin                    Admin mission control
/admin/events             Event manager
/admin/applications       Application review board
/admin/lineup             Lineup builder
/admin/messages           Email/message center
/admin/check-in           Event check-in console
/admin/settings           Role/settings/legal configs
```

## Phase Roadmap

| Phase | Branch | Goal | Status |
|-------|--------|------|--------|
| 0 | `phase/00-safety-harness` | Safety harness + tests | ✅ **Merged** |
| 1 | `phase/01-repo-truth` | Package/docs hygiene | ✅ **Merged** |
| 2 | `phase/02-router-shell` | Router without breaking `/` | ✅ **Merged** |
| 3 | `phase/03-submission-v2` | Firestore applications + email fallback | ✅ **Merged** (intake OFF by default) |
| 4–10 | `phase/04`–`10` | Admin, artist, rules, legal, CI | ✅ **Merged** |
| 11 | `phase/11-launch-ops` | Firebase config, launch scripts | ✅ **Merged** |
| 12A | visual wow | Landing split, design tokens | ✅ **Merged** |
| 12B | intake runbook | `launch:verify`, ops docs | ✅ **Merged** — ops blocked |
| 14+ | — | Kanban, EPK, server XP, emulator tests | 🔲 Planned |

## Sequence

```txt
Protect → Wire → Persist → Wow → Admin → Artist → Secure → Legal → Notify → Launch
```

## Definition Of 10+ Done

- [ ] `/` landing converts and does not regress
- [ ] Submissions persist to Firestore (`applications`) with consent snapshot
- [ ] Admin can manage real events and applications end-to-end
- [ ] Artists can track application status and build profile/XP from real data
- [ ] Firestore security rules pass emulator tests
- [ ] Waiver and privacy are versioned and exportable
- [ ] Notifications work with audit logs; Gmail fallback remains
- [ ] CI blocks broken builds on PR and push to `main`
- [ ] Launch checklist is complete and signed off

## Related Docs

- [SYSTEM_MAP.md](./SYSTEM_MAP.md) — architecture source of truth
- [CONVENTIONS.md](./CONVENTIONS.md) — layer colors, module headers
- [CODEBASE_INDEX.md](./CODEBASE_INDEX.md) — file inventory
- [CONSISTENCY_AUDIT.md](./CONSISTENCY_AUDIT.md) — pre-merge audit
- [DATA_MODEL.md](./DATA_MODEL.md)
- [SECURITY_PLAN.md](./SECURITY_PLAN.md)
- [LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md)
- [LEGACY_SAFE_MODE.md](./LEGACY_SAFE_MODE.md)
- [AGENTS.md](../AGENTS.md) — AI onboarding
