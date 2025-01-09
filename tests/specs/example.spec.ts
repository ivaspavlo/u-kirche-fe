import { test, expect } from '@playwright/test';

test.describe('Example E2E Test', () => {
  test('should navigate to the homepage and check the title', async ({ page }) => {
    // Navigate to the application URL
    await page.goto('http://localhost:4200');

    // Interact with the page (e.g., clicking a button, filling a form)
    const h1 = page.locator('h1#title');
    await expect(h1).toHaveText('u-kirche');
  });
});
