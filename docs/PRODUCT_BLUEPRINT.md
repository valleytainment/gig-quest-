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
| `/` | `Landing` | **Live** — public intake + waiver + email fallback |

Dashboard, auth, and router pieces exist in the repo but are **not wired** to the live app shell. See [LEGACY_SAFE_MODE.md](./LEGACY_SAFE_MODE.md).

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
| 0 | `phase/00-safety-harness` | Safety harness + tests | **Merged** |
| 1 | `phase/01-repo-truth` | Package/docs hygiene | In progress |
| 2 | `phase/02-router-shell` | Router without breaking `/` | Planned |
| 3 | `phase/03-submission-v2` | Firestore applications + email fallback | Planned |
| 4 | `phase/04-landing-wow` | Premium landing conversion | Planned |
| 5 | `phase/05-admin-mission-control` | Real admin ops | Planned |
| 6 | `phase/06-artist-portal` | Artist profiles/quests/XP | Planned |
| 7 | `phase/07-security-hardening` | Firestore rules + admin roles | Planned |
| 8 | `phase/08-legal-privacy-system` | Versioned waiver/privacy | Planned |
| 9 | `phase/09-notifications` | Email/message system | Planned |
| 10 | `phase/10-launch-hardening` | CI/e2e/docs/launch | Planned |

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

- [DATA_MODEL.md](./DATA_MODEL.md)
- [SECURITY_PLAN.md](./SECURITY_PLAN.md)
- [LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md)
- [LEGACY_SAFE_MODE.md](./LEGACY_SAFE_MODE.md)
