# Gig Quest — Documentation Index

> **Start here** if you are new. Pick your path:

| You are… | Read first |
|----------|------------|
| Human developer | [../README.md](../README.md) → [SYSTEM_MAP.md](./SYSTEM_MAP.md) |
| AI / Cursor agent | [../AGENTS.md](../AGENTS.md) |
| Operator / launch | [INTAKE_ENABLE_RUNBOOK.md](./INTAKE_ENABLE_RUNBOOK.md) |
| Security reviewer | [SECURITY_PLAN.md](./SECURITY_PLAN.md) |

---

## Core (100+ clarity)

| Doc | Layer | Purpose |
|-----|-------|---------|
| [CONVENTIONS.md](./CONVENTIONS.md) | ⚪ | Color legend, module header spec |
| [SYSTEM_MAP.md](./SYSTEM_MAP.md) | ⚪ | Architecture, routes, flows |
| [CODEBASE_INDEX.md](./CODEBASE_INDEX.md) | ⚪ | File-by-file inventory |
| [CONSISTENCY_AUDIT.md](./CONSISTENCY_AUDIT.md) | ⚪ | Pre-merge audit checklist |
| [CONFIG.md](./CONFIG.md) | 🟦 | Root config & env reference |

## Product & Data

| Doc | Purpose |
|-----|---------|
| [PRODUCT_BLUEPRINT.md](./PRODUCT_BLUEPRINT.md) | Vision, roadmap, phase status |
| [DATA_MODEL.md](./DATA_MODEL.md) | Firestore collections & types |
| [LEGACY_SAFE_MODE.md](./LEGACY_SAFE_MODE.md) | Landing non-negotiables |

## Security & Launch

| Doc | Purpose |
|-----|---------|
| [SECURITY_PLAN.md](./SECURITY_PLAN.md) | Auth, rules, threat model |
| [LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md) | Phase gates |
| [INTAKE_ENABLE_RUNBOOK.md](./INTAKE_ENABLE_RUNBOOK.md) | Firestore intake enablement |

## Doc Precedence

On conflict: `LEGACY_SAFE_MODE.md` > `SYSTEM_MAP.md` > `PRODUCT_BLUEPRINT.md` > inline comments.
