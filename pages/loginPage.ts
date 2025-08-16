import { Page } from '@playwright/test';

export class LoginPage {
    constructor(public page: Page) {}

    async login(email: string, password: string) {
        await this.page.fill('#email', email);
        await this.page.fill('#pass', password);
        await this.page.click('#send2');
    }
}
