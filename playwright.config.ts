import { defineConfig } from '@playwright/test';

export default defineConfig({
  outputDir: './tests/output/test-results',
  testDir: './tests/specs',
  webServer: {
    command: 'npm run start',
    port: 4200,
    timeout: 120 * 1000,
    reuseExistingServer: false
  },
  use: {
    baseURL: 'http://localhost:4200',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
});
