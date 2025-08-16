import { Page } from '@playwright/test';

export class SignUpPage {
    constructor(public page: Page) {}

    async register(firstName: string, lastName: string, email: string, password: string) {
        await this.page.fill('#firstname', firstName);
        await this.page.fill('#lastname', lastName);
        await this.page.fill('#email_address', email);
        await this.page.fill('#password', password);
        await this.page.fill('#password-confirmation', password);
        await this.page.click('button[title="Create an Account"]');
    }


}
