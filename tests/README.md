# `tests/` — Vitest Unit Tests

> Layer: 🟫 OPS | Run: `npm run test`

| File | Responsibility |
|------|----------------|
| `landing.smoke.test.tsx` | Landing intake — hero, waiver gate, signature, email fallback |
| `setup.ts` | Vitest DOM environment setup |

**Safe mode coverage:** waiver viewed before checkbox; signature mismatch blocks submit; mailto/Gmail on success.
