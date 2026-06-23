import { expect, test } from '@playwright/test';

test('smoke test checks application home page', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Home|Welcome/);
});
