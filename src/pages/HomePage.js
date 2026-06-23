import { faker } from '@faker-js/faker/locale/pt_BR';

export class HomePage {
    constructor(page) {
        this.page = page;
        this.loginLink = page.locator('a[href="/admin"]');
        this.checkAvailabilityBtn = page.getByRole('button', { name: 'Check availability' });
        this.checkOutInput = page.getByPlaceholder('Check-out');
        this.shadyMeadowsLink = page.getByRole('link', { name: 'Shady Meadows B&B' });
        this.aeneanPorttitorMaurisSit = page.getByText('Aenean porttitor mauris sit');
        this.sendUsAMessageHeading = page.getByRole('heading', { name: 'Send us a message' });
        this.welcomeToShadyMeadowsInfo = page.getByRole('contentinfo').getByText('Welcome to Shady Meadows, a')
        this.bookingLink = page.getByRole('link', { name: 'Book now' });
        this.bookNowButton = page.locator('div').filter({ hasText: /^£50 per nightBook now$/ }).getByRole('link');
    }

    async navigate() {
        await this.page.goto('https://automationintesting.online/');
    }

    async selectFutureDate() {
        const today = new Date();
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + 2);
        const day = futureDate.getDate();
        console.log('Future day:', day);

        await this.page.locator('.react-datepicker-wrapper input').last().click();
        await this.page.getByText(`${day}`).first().click();
    }

    async sendFormMessage(profile) {
        await this.page.getByTestId('ContactName').fill(profile.firstname);
        await this.page.getByTestId('ContactEmail').type(profile.email, { delay: 50 });
        await this.page.getByTestId('ContactPhone').type(profile.phone, { delay: 50 });
        await this.page.getByTestId('ContactSubject').fill(profile.subject);
        await this.page.getByTestId('ContactDescription').fill(profile.message);
        await this.page.getByRole('button', { name: 'Submit' }).click();
    }

    async sendInvalidFormMessage(field, value) {
        const baseProfile = {
            firstname: faker.person.firstName(),
            email: faker.internet.email(),
            phone: faker.phone.number('###########'),
            subject: faker.lorem.sentence(),
            message: faker.lorem.paragraph()
        };

        const profile = {
            ...baseProfile,
            [field]: value
        };

        const fields = {
            firstname: this.page.getByTestId('ContactName'),
            email: this.page.getByTestId('ContactEmail'),
            phone: this.page.getByTestId('ContactPhone'),
            subject: this.page.getByTestId('ContactSubject'),
            message: this.page.getByTestId('ContactDescription')
        };

        await fields.firstname.fill(profile.firstname);
        await fields.email.pressSequentially(profile.email, { delay: 50 });
        await fields.phone.pressSequentially(profile.phone, { delay: 50 });
        await fields.subject.fill(profile.subject);
        await fields.message.fill(profile.message);

        await fields[field].fill(value);
        await this.page.getByRole('button', { name: 'Submit' }).click();
    }
}