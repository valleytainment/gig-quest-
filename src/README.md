# `src/` — Application Source Tree

> Parent: [docs/SYSTEM_MAP.md](../docs/SYSTEM_MAP.md) | Index: [docs/CODEBASE_INDEX.md](../docs/CODEBASE_INDEX.md)

```txt
src/
├── main.tsx              🟦 Bootstrap
├── App.tsx               🟨 Router + providers
├── contexts/             🟪 React context — see contexts/README.md
├── lib/                  🟩 Domain + 🟦 infrastructure — see lib/README.md
├── types/                🟩 Shared TypeScript types
├── pages/                🟨 Route pages — see pages/README.md
├── components/
│   ├── landing/          🟧 Public landing UI (split from Landing.tsx)
│   ├── feedback/         🟧 Loaders, empty, error states
│   ├── ui/               🟧 shadcn primitives (do not over-document)
│   └── Layout.tsx        🟧 Authenticated layout shell
└── styles/               ⚪ Design tokens + effects
```

## Data Flow (Landing)

```txt
Landing.tsx
  → components/landing/*     (presentation)
  → lib/submissions.ts       (email + optional Firestore)
  → lib/waiver.ts            (version constants)
  → types/applications.ts    (form + application types)
  → lib/firebase.ts          (Firestore IO)
```

## Adding Files

1. Pick layer from [CONVENTIONS.md](../docs/CONVENTIONS.md)
2. Add module header to `lib/`, `pages/`, `contexts/`, `types/`
3. Register route in `App.tsx` if new page
4. Update [CODEBASE_INDEX.md](../docs/CODEBASE_INDEX.md)
