/** 🟫 OPS │ e2e/phase11-smoke.spec.ts — Legal, waiver gate, signature, auth redirect smoke. */
import { test, expect } from '@playwright/test';

test.describe('Phase 11 launch smoke', () => {
  test('public landing loads without login', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.getByRole('heading', { name: /apply once.*get reviewed/i })
    ).toBeVisible();
  });

  test('waiver must be viewed before checkbox unlocks', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /sign up for performance opportunities/i }).click();

    const waiverCheckbox = page
      .locator('label')
      .filter({ hasText: /I have viewed the waiver form/i })
      .getByRole('checkbox');
    await expect(waiverCheckbox).toBeDisabled();

    await page.getByRole('button', { name: /view waiver form/i }).click();
    await expect(page.getByText(/waiver viewed/i)).toBeVisible();
    await page.keyboard.press('Escape');

    await expect(waiverCheckbox).toBeEnabled();
  });

  test('bad signature blocks submit', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /sign up for performance opportunities/i }).click();

    await page.getByLabel('Stage Name').fill('Stage Star');
    await page.getByLabel('Real Name').fill('Jane Artist');
    await page.getByLabel('Email', { exact: true }).fill('jane@example.com');
    await page.getByLabel('Phone Number').fill('555-0100');
    await page.getByLabel('Emergency Contact Name').fill('Contact One');
    await page.getByLabel('Emergency Contact Phone').fill('555-0101');

    await page.getByRole('button', { name: /view waiver form/i }).click();
    await page.keyboard.press('Escape');
    await page
      .locator('label')
      .filter({ hasText: /I have viewed the waiver form/i })
      .getByRole('checkbox')
      .check();
    await page.getByRole('checkbox', { name: /I confirm that I am at least 18 years old/i }).check();
    await page
      .getByRole('checkbox', {
        name: /I agree that typing my legal name below acts as my electronic signature/i,
      })
      .check();

    await page.getByLabel('Type Legal Name as Signature').fill('Wrong Name');
    await page.getByLabel('Initials').fill('JA');

    const submit = page.getByRole('button', { name: /submit registration/i });
    await expect(submit).toBeDisabled();
  });

  test('legal pages load', async ({ page }) => {
    await page.goto('/legal/terms');
    await expect(page.getByRole('heading', { name: /terms of use/i })).toBeVisible();

    await page.goto('/legal/privacy');
    await expect(page.getByRole('heading', { name: /privacy policy/i })).toBeVisible();

    await page.goto('/legal/waiver');
    await expect(page.getByRole('heading', { name: /artist participation agreement/i })).toBeVisible();
  });

  test('login page has back to signup link', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByRole('link', { name: /back to artist registration/i })).toBeVisible();
  });

  test('protected routes redirect to login', async ({ page }) => {
    await page.goto('/admin');
    await expect(page).toHaveURL(/\/login/);

    await page.goto('/artist');
    await expect(page).toHaveURL(/\/login/);
  });
});
