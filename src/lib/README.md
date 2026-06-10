# `lib/` — Domain & Infrastructure

> Layer: 🟩 DOMAIN + 🟦 INFRA | Parent: [src/README.md](../README.md)

| File | Layer | Responsibility |
|------|-------|----------------|
| `firebase.ts` | 🟦 | Firebase init, auth, `handleFirestoreError` |
| `submissions.ts` | 🟩 | Intake flag, email draft, `createPublicApplication` |
| `waiver.ts` | 🟩 | Waiver version + hash constants |
| `audit.ts` | 🟩 | `auditLogs` append helper |
| `messageTemplates.ts` | 🟩 | Admin email templates |
| `xp.ts` | 🟩 | XP constants (client writes blocked) |
| `utils.ts` | 🟧 | `cn()` classname helper |

**Import rule:** Pages import from `lib/`; `lib/` must not import from `pages/` or `components/`.
