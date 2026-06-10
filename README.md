# Gig Quest

> **Operator:** Creative Freq · **Intake email:** `creativefreqllc@gmail.com`
> **Mode:** Legacy Safe Mode — public landing live, Firestore intake **OFF** by default
> **Production:** https://valleytainment.github.io/gig-quest-/

Gig Quest is an artist opportunity platform for pop-up performances, showcases, tailgate activations, open mics, and live creator events.

---

## Quick Start

```bash
git clone https://github.com/valleytainment/gig-quest-.git
cd gig-quest-
npm ci
cp .env.example .env.local   # optional
npm run dev                  # http://localhost:3000
```

---

## Documentation Hub

| Doc | Audience | Purpose |
|-----|----------|---------|
| [AGENTS.md](AGENTS.md) | AI / Cursor | Agent onboarding, non-negotiables |
| [docs/SYSTEM_MAP.md](docs/SYSTEM_MAP.md) | All devs | Architecture, routes, data flow |
| [docs/CONVENTIONS.md](docs/CONVENTIONS.md) | All devs | Layer colors, module headers |
| [docs/CODEBASE_INDEX.md](docs/CODEBASE_INDEX.md) | All devs | File-by-file index |
| [docs/LEGACY_SAFE_MODE.md](docs/LEGACY_SAFE_MODE.md) | All devs | Landing non-negotiables |
| [docs/INTAKE_ENABLE_RUNBOOK.md](docs/INTAKE_ENABLE_RUNBOOK.md) | Ops | Firestore intake gates |
| [docs/DATA_MODEL.md](docs/DATA_MODEL.md) | Backend | Firestore schemas |
| [docs/SECURITY_PLAN.md](docs/SECURITY_PLAN.md) | Security | Auth, rules, threats |
| [docs/LAUNCH_CHECKLIST.md](docs/LAUNCH_CHECKLIST.md) | Ops | Phase gates |
| [docs/PRODUCT_BLUEPRINT.md](docs/PRODUCT_BLUEPRINT.md) | Product | Vision & roadmap |
| [docs/CONSISTENCY_AUDIT.md](docs/CONSISTENCY_AUDIT.md) | Review | Pre-merge elite audit |
| [docs/README.md](docs/README.md) | All | Documentation hub index |
| [docs/CONFIG.md](docs/CONFIG.md) | Devs | Root config & env reference |
| [src/README.md](src/README.md) | Devs | Source tree map |

---

## Scripts

| Command | Layer | Purpose |
|---------|-------|---------|
| `npm run dev` | 🟦 | Vite dev server (port 3000) |
| `npm run build` | 🟦 | Production build → `dist/` |
| `npm run typecheck` | 🟫 | TypeScript check |
| `npm run test` | 🟫 | Vitest smoke tests |
| `npm run test:e2e` | 🟫 | Playwright e2e |
| `npm run ci` | 🟫 | Full gate: typecheck + test + build + e2e |
| `npm run launch:verify` | 🟫 | Pre-intake readiness |
| `npm run launch:deploy-hosting` | 🟫 | Build + Firebase Hosting deploy |
| `npm run launch:deploy-github-pages` | 🟫 | Build + GitHub Pages deploy (uses `gh` auth) |
| `npm run launch:diagnose` | 🟫 | Firestore API probe |
| `npm run launch:open-console` | 🟫 | Operator Console tabs |
| `npm run audit:consistency` | 🟫 | Elite static consistency audit |

Full ops reference: [scripts/launch/README.md](scripts/launch/README.md)

---

## Routes (Live)

| Route | Status | Notes |
|-------|--------|-------|
| `/` | **LIVE** | Public landing + intake + email fallback |
| `/login` | Wired | Google sign-in |
| `/legal/*` | Wired | Terms, privacy, waiver |
| `/admin/*` | Wired | Requires `adminRoles/{uid}` |
| `/artist/*` | Wired | Authenticated artist |

Source of truth: `src/App.tsx`

---

## Environment

Copy `.env.example` → `.env.local`. **Never commit secrets.**

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_ENABLE_FIRESTORE_INTAKE` | `false` | Enable Firestore submit (staging/prod only after ops gates) |
| `GEMINI_API_KEY` | — | Optional legacy scaffold |
| `DISABLE_HMR` | — | Disable Vite HMR |

Firebase web config: `firebase-applet-config.json` (public SDK keys only).

---

## Project Structure

```txt
src/
  App.tsx                 Router shell
  pages/Landing.tsx       Public intake orchestrator
  pages/admin/            Admin mission control
  pages/artist/           Artist dashboard
  lib/                    Domain + Firebase IO
  components/landing/     Landing UI (split components)
docs/                     Architecture & ops docs
scripts/launch/           Operator launch scripts
tests/ + e2e/             CI test suites
firestore.rules           Security rules (publish via Console or CLI)
```

See [src/README.md](src/README.md) for the full source tree.

---

## Prerequisites

- Node.js 20.x
- npm only (`package-lock.json` — no yarn/pnpm)

---

## Contributing

1. Branch from `main`: `phase/XX-description`, `feat/*`, `fix/*`, `chore/*`
2. Run `npm run ci` before PR
3. Follow [docs/CONVENTIONS.md](docs/CONVENTIONS.md) — module headers on new lib/pages/contexts/types
4. Do not break landing — [docs/LEGACY_SAFE_MODE.md](docs/LEGACY_SAFE_MODE.md)

---

## Phase Status

| Phase | Status |
|-------|--------|
| 0–10 Platform (router, applications, admin, artist, rules) | ✅ Merged |
| 11 Launch ops | ✅ Merged |
| 12A Visual foundation | ✅ Merged |
| 12B–12G Visual experience | ✅ Merged (`f80131b`) |
| 12B Firestore intake enable | 🔲 Ops blocked — `CONSUMER_INVALID` (enable Firestore API + billing) |
| 14+ Kanban, EPK, server XP | 🔲 Planned |
