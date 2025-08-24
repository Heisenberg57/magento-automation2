# Magento Automation with Playwright & Cucumber

This project automates the Magento sign-up and login flows using [Playwright](https://playwright.dev/) and [Cucumber.js](https://github.com/cucumber/cucumber-js) with TypeScript.

## Features

- Automated sign-up with unique and existing email addresses
- Automated login and logout
- Negative scenario: sign up with an already existing email address
- Screenshots captured after every test step (see `/screenshots` folder)

## Project Structure

```
├── features/
│   └── signup_login.feature      # Gherkin scenarios
├── pages/
│   ├── homePage.ts
│   ├── signupPage.ts
│   └── loginPage.ts
├── step-definitions/
│   └── signupSteps.ts           # Step definitions and screenshot hook
├── screenshots/                 # Screenshots after every step
├── cucumber.js                  # Cucumber config
├── package.json
└── tsconfig.json
```

## Getting Started

### 1. Install dependencies

```sh
npm install
```

### 2. Run the tests

```sh
npx cucumber-js
```

### 3. View screenshots

Screenshots for every step are saved in the `screenshots/` folder.

## Notes

- The project uses a demo Magento site. If the site is down, tests may fail.  
- Update the email in the negative scenario (`existinguser@mail.com`) to match a real, registered user in your test environment.
- All code is written in TypeScript and organized for clarity and maintainability.

## Troubleshooting

- If you see errors about selectors or missing elements, inspect the Magento site and adjust selectors in the page objects or step definitions.
- If the site is unavailable, document your work and push your code as-is.

## License

MIT

## Test Cases

Manual test cases are documented in [TestCases.xlsx](./TestCases.xlsx).

<!-- If you put it in a folder, use: [TestCases.xlsx](./docs/TestCases.xlsx) -->

## Note

The Magento demo site became unavailable during my assignment.  
All test automation code is complete and ready to run.  
If the site becomes available again, simply run `npx cucumber-js` to execute the tests and generate screenshots for each step in the `screenshots/` folder.