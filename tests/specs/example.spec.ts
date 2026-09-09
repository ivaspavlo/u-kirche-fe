import { test, expect } from '@playwright/test';

test.describe('language initialization', () => {
    test('renders Ukrainian in the initial server response', async ({ request }) => {
        const response = await request.get('/', {
            headers: { cookie: 'lang=de' }
        });

        expect(response.ok()).toBeTruthy();
        expect(await response.text()).toContain('Українська Православна Парафія Святих');
    });

    test('keeps Ukrainian after hydration despite a stored German language', async ({ page }) => {
        await page.addInitScript(() => localStorage.setItem('lang', 'de'));
        await page.goto('/');

        await expect(page.locator('html')).toHaveAttribute('lang', 'ua');
        await expect(page.locator('h1')).toContainText('Українська Православна Парафія Святих');
        await expect(page.getByText('Новини', { exact: true }).first()).toBeVisible();
    });
});
