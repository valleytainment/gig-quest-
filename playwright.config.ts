/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🟫 CONFIG │ gig-quest/playwright.config.ts
 * @responsibility E2E config — mobile Chrome, localhost:3000, webServer
 * @see e2e/README.md | docs/CONFIG.md
 * ═══════════════════════════════════════════════════════════════════════════════
 */
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
