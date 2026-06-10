# `e2e/` — Playwright End-to-End Tests

> Layer: 🟫 OPS | Run: `npm run test:e2e` | Config: `playwright.config.ts` (mobile Chrome)

| Spec | Responsibility |
|------|----------------|
| `landing.spec.ts` | Full mobile intake happy path + email fallback |
| `phase11-smoke.spec.ts` | Legal pages, waiver gate, bad signature, login redirect |

**CI:** `npm run ci` runs all e2e after build. Port 3000 must be free.
