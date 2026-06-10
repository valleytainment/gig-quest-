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
| `launch:bootstrap-admin` | `bootstrap-admin.mjs` | Needs `ADMIN_UID` + ADC |
| `launch:all` | `launch-all.sh` | Full chain (CI+deploy+bootstrap) |

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
