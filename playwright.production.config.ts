/** Production smoke — run against GitHub Pages (no local webServer). */
import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.PRODUCTION_URL ?? 'https://valleytainment.github.io/gig-quest-';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  retries: 1,
  reporter: 'list',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
});
