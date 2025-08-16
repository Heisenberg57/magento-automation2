import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { SignUpPage } from '../pages/signupPage';
import { LoginPage } from '../pages/loginPage';
//import { chromium } from 'playwright';
import { chromium, Browser, BrowserContext, Page } from 'playwright';
import { setDefaultTimeout } from '@cucumber/cucumber';
import { AfterStep, ITestCaseHookParameter } from '@cucumber/cucumber';
import fs from 'fs';
import path from 'path';





setDefaultTimeout(60 * 1000); // 60 seconds


// Declare with proper types
let browser: Browser;
let context: BrowserContext;
export let page: Page;

let homePage: HomePage;
let signUpPage: SignUpPage;
let loginPage: LoginPage;

const testUser = {
    firstName: 'Test',
    lastName: 'User',
    email: `testuser${Date.now()}@mail.com`,
    password: 'Password123'
};

Given('I am on the Magento home page', async () => {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();

    homePage = new HomePage(page);
    await homePage.navigate();
});

When('I navigate to the Sign Up page', async () => {
    await homePage.goToSignUp();
    signUpPage = new SignUpPage(page);
});

When('I register with valid details', async () => {
    await signUpPage.register(testUser.firstName, testUser.lastName, testUser.email, testUser.password);
});

Then('I should land on my account dashboard', async () => {
    Then('I should land on my account dashboard', async () => {
    await page.waitForSelector('h1.page-title span.base', { timeout: 30000 });
    const title = await page.textContent('h1.page-title span.base');
    expect(title).toContain('My Account');
});

});

When('I log out', async () => {
    // Click the correct toggle button
    const toggleButton = page.locator('span.customer-name[role="button"] button[data-action="customer-menu-toggle"]').first();
    await toggleButton.waitFor({ state: 'visible', timeout: 5000 });
    await toggleButton.click();

    // Wait for the "Sign Out" link to be visible inside any open customer menu
    const signOutLink = page.locator('.customer-menu[aria-hidden="false"] a:has-text("Sign Out")');
    await signOutLink.waitFor({ state: 'visible', timeout: 5000 });

    // Click the "Sign Out" link
    await signOutLink.click();
});




When('I log in with the same credentials', async () => {
    await homePage.goToLogin();
    loginPage = new LoginPage(page);
    await loginPage.login(testUser.email, testUser.password);
});

Then('I should see my account dashboard again', async () => {
     await page.waitForSelector('h1.page-title span.base', { timeout: 30000 });
    const title = await page.textContent('h1.page-title span.base');
    expect(title).toContain('My Account');
});



When('I register with an already existing email address', async () => {
    // Use a known existing email address
    const existingEmail = 'existinguser@mail.com'; // Replace with a real one if needed
    await signUpPage.register('Test', 'User', existingEmail, 'Password123');
});

Then('I should see an error message about the email already being used', async () => {
    const errorMsg = await page.locator('.message-error:has-text("There is already an account with this email address")');
    await expect(errorMsg).toBeVisible();
});




AfterStep(async function (this: any) {
    if (!page) return;

    // Ensure screenshots directory exists
    const dir = path.join(process.cwd(), 'screenshots');
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    // Get scenario and step text
    const scenario = this.pickle?.name?.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'scenario';
    const stepIndex = this.testStepIndex || 0;
    const stepText = this.pickle?.steps?.[stepIndex]?.text?.replace(/[^a-z0-9]/gi, '_').toLowerCase() || `step${stepIndex}`;
    const timestamp = Date.now();
    const filename = `${scenario}_${stepText}_${timestamp}.png`;
    const filepath = path.join(dir, filename);

    await page.screenshot({ path: filepath, fullPage: true });
});