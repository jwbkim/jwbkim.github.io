import { defineConfig } from '@playwright/test';
import { existsSync } from 'node:fs';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 3,
  use: {
    baseURL: 'http://127.0.0.1:4321',
    viewport: {width: 1280, height: 900},
    launchOptions: {
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || (existsSync('/usr/bin/google-chrome-stable') ? '/usr/bin/google-chrome-stable' : undefined),
      args: ['--no-sandbox'],
    },
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run dev -- --port 4321',
    env: {ASTRO_TELEMETRY_DISABLED: '1'},
    url: 'http://127.0.0.1:4321',
    reuseExistingServer: !process.env.CI,
  },
});
