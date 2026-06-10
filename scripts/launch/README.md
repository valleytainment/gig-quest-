# Launch Scripts — Operator Reference

> Layer: 🟫 OPS | Parent: [docs/SYSTEM_MAP.md](../../docs/SYSTEM_MAP.md)

## Quick Reference

| npm script | Script file | When to run |
|------------|-------------|-------------|
| `launch:diagnose` | `diagnose-firestore.mjs` | First — checks Firestore API |
| `launch:test-rules` | `test-public-create.mjs` | After rules published |
| `launch:open-console` | `open-console.sh` | Manual Console ops |
| `launch:open-new-project` | `open-new-project.sh` | AI Studio project broken |
| `launch:apply-config` | `apply-firebase-config.mjs` | After new Firebase web config |
| `launch:verify` | `verify-readiness.sh` | Pre-intake CI gate |
| `launch:deploy-rules` | `deploy-rules.sh` | Needs `firebase login` |
| `launch:deploy-hosting` | `deploy-hosting.sh` | Build + Firebase Hosting (SPA) |
| `launch:smoke-preview` | `smoke-preview.sh` | E2E against production `dist/` |
| `launch:deploy-github-pages` | `deploy-github-pages.sh` | Build + GitHub Pages (uses `gh` auth) |
| `launch:bootstrap-admin` | `bootstrap-admin.mjs` | Needs `ADMIN_UID` + ADC |
| `launch:all` | `launch-all.sh` | Full chain (CI+deploy+bootstrap) |

## Production Deploy (Email-First)

```bash
npm run ci                    # local gate (GitHub Actions may be billing-blocked)
npm run launch:smoke-preview  # e2e against production build (dist/)
firebase login --no-localhost # once per machine
npm run launch:deploy-hosting # build dist/ + firebase deploy --only hosting
```

Ensure hosting env keeps `VITE_ENABLE_FIRESTORE_INTAKE=false` until ops gates pass.

## Enablement Order

```txt
1. launch:diagnose          → must pass (not CONSUMER_INVALID)
2. Publish firestore.rules  → launch:open-console or launch:deploy-rules
3. launch:test-rules        → must PASS
4. adminRoles/{uid}         → Console or launch:bootstrap-admin
5. Manual smoke 6–13        → see INTAKE_ENABLE_RUNBOOK.md
6. VITE_ENABLE_FIRESTORE_INTAKE=true (staging only)
```

## Error Codes

| Symptom | Meaning | Fix |
|---------|---------|-----|
| `CONSUMER_INVALID` | Firestore API not enabled | GCP Console → Enable API + billing |
| `PERMISSION_DENIED` (test-rules) | Rules not published or validation fail | Publish rules |
| `No authorized accounts` | Firebase CLI not logged in | `firebase login --no-localhost` |

See [docs/INTAKE_ENABLE_RUNBOOK.md](../../docs/INTAKE_ENABLE_RUNBOOK.md).
