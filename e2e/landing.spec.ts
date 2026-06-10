/** 🟫 OPS │ e2e/landing.spec.ts — Mobile intake happy path + email fallback. @see e2e/README.md */
import { test, expect } from '@playwright/test';

test.describe('Landing intake happy path', () => {
  test('mobile user can complete registration and see email fallback links', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByRole('heading', { name: /apply once.*get reviewed/i })
    ).toBeVisible();

    await page.getByRole('button', { name: /sign up for performance opportunities/i }).click();

    await page.getByLabel('Stage Name').fill('Stage Star');
    await page.getByLabel('Real Name').fill('Jane Artist');
    await page.locator('#email').fill('jane@example.com');
    await page.getByLabel('Phone Number').fill('555-0100');
    await page.getByLabel('Emergency Contact Name').fill('Contact One');
    await page.getByLabel('Emergency Contact Phone').fill('555-0101');

    await page.getByRole('button', { name: /view waiver form/i }).click();
    await expect(page.getByText(/waiver viewed/i)).toBeVisible();
    await page.keyboard.press('Escape');

    const waiverLabel = page.locator('label').filter({ hasText: /I have viewed the waiver form/i });
    await waiverLabel.getByRole('checkbox').check();

    await page
      .getByRole('checkbox', { name: /I confirm that I am at least 18 years old/i })
      .check();
    await page
      .getByRole('checkbox', {
        name: /I agree that typing my legal name below acts as my electronic signature/i,
      })
      .check();

    await page.getByLabel('Type Legal Name as Signature').fill('Jane Artist');
    await page.getByLabel('Initials').fill('JA');

    await page.getByRole('button', { name: /submit registration/i }).click();

    await expect(page.getByRole('heading', { name: /we will reach out soon/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /copy creative freq email/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /open email app/i })).toHaveAttribute(
      'href',
      /^mailto:creativefreqllc@gmail\.com/
    );
    await expect(page.getByRole('link', { name: /open in gmail/i })).toHaveAttribute(
      'href',
      /^https:\/\/mail\.google\.com\/mail/
    );
  });
});
