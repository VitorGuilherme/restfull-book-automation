import { expect, test } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage.js';


//helpers
import { contactInvalidScenarios } from '../../src/helpers/invalidScenarios.js';
import { generateProfile } from '../../src/fixtures/generators/profileGenerator.js';

test.describe('Testes relacionados a tela inicial', () => {
    let home

    test.beforeEach(async ({ page }) => {
        home = new HomePage(page)
        await home.navigate()
    })

    test('should be able to see basic info in home page', async ({ page }) => {
        await expect(home.shadyMeadowsLink).toBeVisible();
        await expect(home.aeneanPorttitorMaurisSit).toBeVisible();
        await expect(home.sendUsAMessageHeading).toBeVisible();
        await expect(home.welcomeToShadyMeadowsInfo).toBeVisible();
    })

    test('should be able to navigate to booking section', async ({ page }) => {
        await home.bookingLink.click();
        await expect(page.url()).toMatch(/#booking/);
    });

    test('should be able to check room availability for today', async ({ page }) => {
        await home.checkAvailabilityBtn.click();
        await expect(page.locator('.card-title:has-text("Single")')).toBeVisible();
        await expect(page.locator('.fw-bold.fs-5').first()).toBeVisible();
    })
    test('should be able to check room availability for future dates', async ({ page }) => {
        await home.selectFutureDate();
        await home.checkAvailabilityBtn.click();

        await expect(page.locator('.card-title:has-text("Suite")')).toBeVisible();
        await expect(page.locator('.fw-bold.fs-5').first()).toBeVisible();
    })


    test('should be able to see contact info', async ({ page }) => {
        await expect(page.locator('#location').getByText('Shady Meadows B&B, Shadows')).toBeVisible();
        await expect(page.locator('#location').getByText('012345678901')).toBeVisible();
        await expect(page.locator('#location').getByText('fake@fakeemail.com')).toBeVisible();
        await expect(page.locator('#location').getByText('Welcome to Shady Meadows, a')).toBeVisible();
    })

    test('should be able to send a message through contact form', async ({ page }) => {
        const profile = generateProfile();
        await home.sendFormMessage(profile);

        await expect(page.getByText(`Thanks for getting in touch ${profile.firstname}!`)).toBeVisible();
        await expect(page.getByText('We\'ll get back to you about')).toBeVisible();
    })

    test('should not be able to send a message through contact form with invalid input and show correct validation messages', async ({ page }) => {

        for (const scenario of contactInvalidScenarios) {
            await home.navigate();
            await home.sendInvalidFormMessage(scenario.field, scenario.value);

            for (const errorText of scenario.errors) {
                await expect(page.getByText(errorText)).toBeVisible();
            }
        }
    })

    test('should be able to see info in footer', async ({ page }) => {
        await expect(page.locator('footer').getByText('Shady Meadows B&B, Shadows')).toBeVisible();
        await expect(page.locator('footer').getByText('012345678901')).toBeVisible();
        await expect(page.locator('footer').getByText('fake@fakeemail.com')).toBeVisible();
        await expect(page.locator('footer').getByText('Welcome to Shady Meadows, a')).toBeVisible();
    })
});