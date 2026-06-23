import { faker } from '@faker-js/faker/locale/pt_BR';

export const generateProfile = () => {
    return {
        firstname: faker.person.firstName(),
        email: faker.internet.email(),
        phone: faker.phone.number('###########'),
        subject: faker.lorem.sentence(),
        message: faker.lorem.paragraph()
    }
}