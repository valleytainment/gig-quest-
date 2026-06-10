/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🟦 CONFIG │ gig-quest/vite.config.ts
 * @responsibility Vite dev/build, Vitest (jsdom), Tailwind plugin, @ alias
 * @see docs/CONFIG.md
 * ═══════════════════════════════════════════════════════════════════════════════
 */
/// <reference types="vitest/config" />
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  const githubPages = process.env.GITHUB_PAGES === 'true';
  return {
    base: githubPages ? '/gig-quest-/' : '/',
    plugins: [react(), tailwindcss()],
    test: {
      environment: 'jsdom',
      setupFiles: ['./tests/setup.ts'],
      globals: true,
      exclude: ['**/node_modules/**', '**/e2e/**'],
    },
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify — file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
