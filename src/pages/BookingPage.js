import { faker } from '@faker-js/faker/locale/pt_BR';

export class BookingPage {
    constructor(page) {
        this.page = page;
        this.firstReserveButton = page.getByRole('button', { name: 'Reserve Now' }).first();
        this.firstnameField = page.getByRole('textbox', { name: 'Firstname' });
        this.lastnameField = page.getByRole('textbox', { name: 'Lastname' });
        this.emailField = page.getByRole('textbox', { name: 'Email' });
        this.phoneField = page.getByRole('textbox', { name: 'Phone' });
        this.finalReserveButton = page.getByRole('button', { name: 'Reserve Now' }).last()
    }

    async navigate() {
        await this.page.goto('/reservation/1?checkin=2026-06-23&checkout=2026-06-24');
    }

    async bookRoom() {
        const firstname = faker.person.firstName();
        const lastname = faker.person.lastName();
        const email = faker.internet.email();
        const phone = faker.phone.number('###########');

        await this.firstReserveButton.click();
        await this.firstnameField.fill(firstname);
        await this.lastnameField.fill(lastname);
        await this.emailField.type(email, { delay: 50 });
        await this.phoneField.type(phone, { delay: 50 });
        await this.finalReserveButton.click();
    }

    async selectDateTomorrow() {
        const tomorrow = new Date(Date.now() + 86400000);
        const dayPlus3 = new Date(Date.now() + 86400000 * 3);

        const startDay = tomorrow.getDate().toString().padStart(2, '0');
        const endDay = dayPlus3.getDate().toString().padStart(2, '0');

        await this.page.locator('.rbc-date-cell button.rbc-button-link').first().waitFor({ state: 'visible' });

        const startCell = this.page.locator('.rbc-date-cell button.rbc-button-link')
            .filter({ hasText: new RegExp(`^${startDay}$`) }).first();
        const endCell = this.page.locator('.rbc-date-cell button.rbc-button-link')
            .filter({ hasText: new RegExp(`^${endDay}$`) }).first();

        const startBox = await startCell.boundingBox();
        const endBox = await endCell.boundingBox();

        await this.page.mouse.move(startBox.x + startBox.width / 2, startBox.y + startBox.height / 2);
        await this.page.mouse.down();
        await this.page.mouse.move(endBox.x + endBox.width / 2, endBox.y + endBox.height / 2, { steps: 10 });
        await this.page.mouse.up();
    }

    async sendInvalidBookingForm(field, value) {
        const baseBooking = {
            firstname: faker.person.firstName(),
            lastname: faker.person.lastName(),
            email: faker.internet.email(),
            phone: faker.phone.number('###########')
        };

        const booking = {
            ...baseBooking,
            [field]: value
        };

        const fields = {
            firstname: this.firstnameField,
            lastname: this.lastnameField,
            email: this.emailField,
            phone: this.phoneField
        };

        await this.firstReserveButton.click();
        await fields.firstname.fill(booking.firstname);
        await fields.lastname.fill(booking.lastname);
        await fields.email.fill(booking.email);
        await fields.phone.fill(booking.phone);

        await fields[field].fill(value);
        await this.finalReserveButton.click();
    }
}