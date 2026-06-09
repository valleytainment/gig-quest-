# Gig Quest

Gig Quest is an artist opportunity platform for pop-up performances, showcases, tailgate activations, open mics, and live creator events. The live public surface is the landing page and artist intake flow at `/`.

**Operator:** Creative Freq

## Prerequisites

- Node.js 20.x (recommended)
- npm (this repo uses **npm only** — see `package-lock.json`)

## Quick Start

```bash
git clone https://github.com/valleytainment/gig-quest-.git
cd gig-quest-
npm ci
cp .env.example .env.local   # optional — see Environment
npm run dev
```

Open http://localhost:3000/

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start Vite dev server (port 3000) |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |
| `npm run typecheck` | TypeScript check without emit |
| `npm run test` | Vitest landing smoke tests |
| `npm run test:watch` | Vitest in watch mode |
| `npm run test:e2e` | Playwright mobile intake happy path |
| `npm run ci` | Full gate: typecheck + test + build + e2e |

## Environment

Copy `.env.example` to `.env.local` and fill in values as needed. **Never commit secrets.**

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | No | Optional Gemini API key (legacy scaffold) |
| `VITE_ENABLE_FIRESTORE_INTAKE` | No | `false` by default; enables Firestore submit in Phase 3+ |
| `DISABLE_HMR` | No | Set to `true` to disable Vite HMR |

Firebase client config is loaded from `firebase-applet-config.json` (public web SDK keys). Do not put Firebase service account keys in env files.

## Package Manager

This repo uses **npm only**. Install with `npm ci` or `npm install`. Do not use `pnpm` or `yarn` — `pnpm-lock.yaml` is intentionally absent.

## Project Structure

```txt
src/
  App.tsx              # Entry — renders Landing only (Legacy Safe Mode)
  pages/Landing.tsx    # Public landing + artist intake
  pages/admin/         # Admin dashboard (not wired to live routes yet)
  pages/artist/        # Artist dashboard (not wired to live routes yet)
  contexts/            # Auth context (dormant until router phase)
docs/                  # Product, data, security, launch docs
tests/                 # Vitest smoke tests
e2e/                   # Playwright e2e tests
```

## Documentation

| Doc | Purpose |
|-----|---------|
| [docs/LEGACY_SAFE_MODE.md](docs/LEGACY_SAFE_MODE.md) | No-break rules for landing/intake |
| [docs/PRODUCT_BLUEPRINT.md](docs/PRODUCT_BLUEPRINT.md) | Product vision and phase roadmap |
| [docs/DATA_MODEL.md](docs/DATA_MODEL.md) | Firestore collections and types |
| [docs/SECURITY_PLAN.md](docs/SECURITY_PLAN.md) | Auth, roles, and rules strategy |
| [docs/LAUNCH_CHECKLIST.md](docs/LAUNCH_CHECKLIST.md) | Pre-launch verification |

## Roadmap Status

| Phase | Status |
|-------|--------|
| 0 — Safety Harness | Merged |
| 1 — Repo Truth | In progress |
| 2–10 | Planned |

See [docs/PRODUCT_BLUEPRINT.md](docs/PRODUCT_BLUEPRINT.md) for the full roadmap.

## Contributing

1. Branch from `main` using `phase/XX-description` naming.
2. Run `npm run ci` before opening a PR.
3. Do not break the landing/intake flow — see [docs/LEGACY_SAFE_MODE.md](docs/LEGACY_SAFE_MODE.md).
