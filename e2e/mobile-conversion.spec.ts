/** Phase 12G — 375px mobile conversion e2e checks. */
import { test, expect, type Page } from '@playwright/test';
import { appPath } from './helpers/nav';

async function expectNoHorizontalScroll(page: Page) {
  const { scrollWidth, clientWidth } = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
}

test.describe('375px mobile conversion', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
  });

  test('landing CTA is visible without horizontal scroll', async ({ page }) => {
    await page.goto(appPath());
    await expectNoHorizontalScroll(page);

    await expect(
      page.getByRole('button', { name: /sign up for performance opportunities/i })
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: /apply once.*get reviewed/i })
    ).toBeVisible();
  });

  test('intake form stays usable at 375px with sticky submit visible', async ({ page }) => {
    await page.goto(appPath());
    await expect(
      page.getByRole('heading', { name: /apply once.*get reviewed/i })
    ).toBeVisible();
    await page.getByRole('button', { name: /sign up for performance opportunities/i }).click();
    await expect(page.locator('#stageName')).toBeVisible();

    await expectNoHorizontalScroll(page);
    const submit = page.getByRole('button', { name: /submit registration/i });
    await expect(submit).toBeVisible();
    await submit.scrollIntoViewIfNeeded();

    await page.getByLabel('Stage Name').fill('Mobile Star');
    await page.getByLabel('Real Name').fill('Jane Artist');
    await page.locator('#email').fill('jane@example.com');

    const submitBox = await submit.boundingBox();
    expect(submitBox?.height ?? 0).toBeGreaterThanOrEqual(44);
  });

  test('success actions stack full-width on mobile', async ({ page }) => {
    await page.goto(appPath());
    await page.getByRole('button', { name: /sign up for performance opportunities/i }).click();

    await page.getByLabel('Stage Name').fill('Stage Star');
    await page.getByLabel('Real Name').fill('Jane Artist');
    await page.locator('#email').fill('jane@example.com');
    await page.getByLabel('Phone Number').fill('555-0100');
    await page.getByLabel('Emergency Contact Name').fill('Contact One');
    await page.getByLabel('Emergency Contact Phone').fill('555-0101');

    await page.getByRole('button', { name: /view waiver form/i }).click();
    await page.keyboard.press('Escape');

    await page.locator('label').filter({ hasText: /I have viewed the waiver form/i }).getByRole('checkbox').check();
    await page.getByRole('checkbox', { name: /I confirm that I am at least 18 years old/i }).check();
    await page
      .getByRole('checkbox', {
        name: /I agree that typing my legal name below acts as my electronic signature/i,
      })
      .check();
    await page.getByLabel('Type Legal Name as Signature').fill('Jane Artist');
    await page.getByLabel('Initials').fill('JA');
    await page.getByRole('button', { name: /submit registration/i }).click();

    await expectNoHorizontalScroll(page);
    await expect(page.getByRole('link', { name: /open email app/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /open in gmail/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /copy email draft/i })).toBeVisible();

    const emailLink = page.getByRole('link', { name: /open email app/i });
    const gmailLink = page.getByRole('link', { name: /open in gmail/i });
    const viewport = page.viewportSize()?.width ?? 375;
    const emailBox = await emailLink.boundingBox();
    const gmailBox = await gmailLink.boundingBox();
    expect(emailBox?.width ?? 0).toBeGreaterThan(viewport * 0.72);
    expect(gmailBox?.width ?? 0).toBeGreaterThan(viewport * 0.72);
  });

  test('legal pages are readable at 375px', async ({ page }) => {
    await page.goto(appPath('legal/waiver'));
    await expectNoHorizontalScroll(page);
    await expect(page.getByText('Gig Quest Legal Center')).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Artist Participation Agreement', exact: true })
    ).toBeVisible();
  });
});
