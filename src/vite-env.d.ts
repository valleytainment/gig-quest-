/** 🟦 INFRASTRUCTURE │ vite-env.d.ts — Vite client types + VITE_* env augmentation. */
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENABLE_FIRESTORE_INTAKE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
