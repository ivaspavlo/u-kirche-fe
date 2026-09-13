import { defineConfig } from '@playwright/test';

export default defineConfig({
    outputDir: './tests/output/test-results',
    testDir: './tests/specs',
    webServer: {
        command: 'npm run start -- --port 4307',
        port: 4307,
        timeout: 120 * 1000,
        reuseExistingServer: !process.env['CI']
    },
    use: {
        baseURL: 'http://localhost:4307',
        channel: process.env['CI'] ? undefined : 'chrome',
        headless: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure'
    }
});
