import { expect, test } from "@playwright/test";
import { BookingPage } from "../../src/pages/BookingPage";

import { dateTime, dateTimeTomorrow } from '../../src/helpers/dateTime.js';
import { bookingInvalidScenarios } from '../../src/helpers/invalidScenarios.js';

test.describe('Booking page tests', () => {
    test.describe.configure({ retries: 2 });
    let booking;
    const expectedDateRange = dateTime();
    const expectedDateRangeTomorrow = dateTimeTomorrow();

    test.beforeEach(async ({ page }) => {
        booking = new BookingPage(page);
        await booking.navigate();
    })

    test('should be able to check room reservation date for today', async ({ page }) => {
        await booking.bookRoom();

        await expect(page.getByText('Booking Confirmed')).toBeVisible();
        await expect(page.getByText('Your booking has been confirmed for the following dates:')).toBeVisible();
        await expect(page.getByText(expectedDateRange)).toBeVisible();
    })

    test('should be able to check room reservation date for tomorrow', async ({ page }) => {
        await booking.selectDateTomorrow();
        await booking.bookRoom();

        await expect(page.getByText('Booking Confirmed')).toBeVisible();
        await expect(page.getByText('Your booking has been confirmed for the following dates:')).toBeVisible();
        await expect(page.getByText(expectedDateRangeTomorrow)).toBeVisible();
    });

    test('should not be able to book a room with invalid input and show correct validation messages', async ({ page }) => {
        for (const scenario of bookingInvalidScenarios) {
            await booking.navigate();
            await booking.sendInvalidBookingForm(scenario.field, scenario.value);

            for (const errorText of scenario.errors) {
                await expect(page.getByText(errorText)).toBeVisible();
            }
        }
    })
})