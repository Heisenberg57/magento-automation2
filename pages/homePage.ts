import { Page } from '@playwright/test';

export class HomePage {
    constructor(public page: Page) {}

    async navigate() {
        await this.page.goto('https://magento.softwaretestingboard.com/',{ waitUntil: 'domcontentloaded' });

        // Handle annoying pop-up if it appears
        const popup = await this.page.$('//*[@id="dismiss-button"]');
        if (popup) {
            await popup.click();
        }
    }

    async goToSignUp() {
        await this.page.click('text=Create an Account');
    }

    async goToLogin() {
        // Target the actual header login link
        const loginLink = this.page.locator('header a[href*="customer/account/login/"]');
        await loginLink.waitFor({ state: 'visible', timeout: 10000 });
        await loginLink.click();
    }
}
