# Legacy Safe Mode

Gig Quest's live production surface is the public landing and artist intake flow at `/`. Every platform upgrade must preserve this flow until Firestore-backed intake is fully proven.

## Non-Negotiable Rules

1. **`/` renders `<Landing />`** — The public route must remain the landing page, not an auth gate or dashboard.
2. **Waiver gating** — Artists must open and view the waiver before the acceptance checkbox unlocks.
3. **Legal signature match** — Typed legal signature must match the real name field; submit stays disabled on mismatch.
4. **Email fallback** — Successful intake must still generate `mailto:` and Gmail draft links. Users must be able to send registration manually if their mail client does not open automatically.
5. **No auth on `/`** — Unauthenticated users must reach sign-up without logging in.
6. **Free sign-up policy** — Sign-up is free. Event-specific fees or ticket purchases are communicated in advance only.

## Router vs Live Surface

`App.tsx` wires the full router (`/login`, `/admin`, `/artist`, `/legal/*`). **Legacy Safe Mode applies to behavior, not route count:**

- **`/` always renders `<Landing />`** — never an auth gate or dashboard redirect.
- Other routes may exist but must not break `/` intake behavior.
- Firestore intake remains gated by `VITE_ENABLE_FIRESTORE_INTAKE=false` default.

## Phase 0 Hard Boundary (Historical)

Phase 0 safety harness was limited to tests + docs. Later phases (2+) added the router shell **without** changing landing intake semantics above.

## Manual QA Checklist

Run before merging any PR that touches landing, intake, waiver, or submission:

- [ ] `/` loads without login
- [ ] "Sign Up For Performance Opportunities" opens the form
- [ ] Waiver accept checkbox is disabled until "View Waiver Form" is clicked
- [ ] Signature mismatch disables "Submit Registration"
- [ ] Valid submit shows success state with "Open Email App" and "Open In Gmail"
- [ ] Free sign-up notice is visible on the landing page
- [ ] `npm run typecheck` passes
- [ ] `npm run test` passes
- [ ] `npm run build` passes
- [ ] `npm run test:e2e` passes

## Automated Coverage

| Check | Command / file |
|-------|----------------|
| Landing smoke tests | `npm run test` → `tests/landing.smoke.test.tsx` |
| Mobile intake e2e | `npm run test:e2e` → `e2e/landing.spec.ts` |
| Full CI gate | `npm run ci` |

## Reject Merge If

- `App.tsx` no longer renders `<Landing />` at `/`
- Waiver gating, signature validation, or email fallback is removed or untested
- Public `/` requires authentication
- Tests are skipped instead of fixed
- Mock admin or prototype data is presented as production truth
