import { expect, test } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage.js';

import users from '../../src/data/users.js';

test.describe('Testes relacionados a tela de login', () => {
    let login;

    test.beforeEach(async ({ page }) => {
        login = new LoginPage(page);
        await login.navigate();
    });

    test('should be able to login successfully', async ({ page }) => {
        await login.login(users.username, users.password);
        await expect(page).toHaveURL(/rooms/);
    });
    
});
