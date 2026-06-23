export class LoginPage {
    constructor(page) {
        this.page = page;
        this.adminInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('button[type="submit"]');
    }

    async navigate() {
        await this.page.goto('/admin');
    }

    async login(username, password) {
        await this.adminInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}
