# Gig Quest — Root Configuration Reference

> Layer: 🟦 INFRASTRUCTURE | Index: [CODEBASE_INDEX.md](./CODEBASE_INDEX.md)

| File | Responsibility | Notes |
|------|----------------|-------|
| `package.json` | npm scripts, dependencies | **npm only** — no yarn/pnpm |
| `vite.config.ts` | Vite dev/build + Vitest inline config | Port 3000; `@/` alias |
| `tsconfig.json` | TypeScript strict mode | `npm run typecheck` |
| `playwright.config.ts` | E2E — mobile Chrome, port 3000 | `reuseExistingServer` when not CI |
| `components.json` | shadcn/ui generator config | Do not hand-edit paths casually |
| `firebase.json` | Firestore rules deploy target | Database id from applet config |
| `.firebaserc` | Firebase project alias | `gen-lang-client-0705859710` |
| `firebase-applet-config.json` | Public web SDK config | Not a secret; no service accounts |
| `firebase-blueprint.json` | Legacy AI Studio scaffold metadata | Reference only |
| `metadata.json` | App display + doc entry points | Safe-mode flags |
| `.env.example` | Env template | Copy → `.env.local`; never commit secrets |
| `firestore.rules` | 🔴 Security authorization | Publish before intake enable |

## Environment Variables

| Variable | Required | Default | Purpose |
|----------|----------|---------|---------|
| `VITE_ENABLE_FIRESTORE_INTAKE` | No | `false` | Firestore landing submit gate |
| `GEMINI_API_KEY` | No | — | Legacy scaffold |
| `DISABLE_HMR` | No | — | Disable Vite HMR |
| `ADMIN_UID` | Ops only | — | `launch:bootstrap-admin` |
| `CI` | CI only | — | Playwright retries, strict mode |

## CI Pipeline (`npm run ci`)

```txt
typecheck → vitest (6) → vite build → playwright (7)
```
