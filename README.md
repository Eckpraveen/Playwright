# Playwright E2E Testing Framework

[Playwright Github](https://playwright.dev/img/playwright-logo.svg )

Demo automation testing framework created with Playwright. A NodeJS library made for browser automation. It's free, open source and backed up by Microsoft. 

Playwright supports all modern rendering engines including Chromium, WebKit, and Firefox. Test on Windows, Linux, and macOS, locally or on CI, headless or headed with native mobile emulation of Google Chrome for Android and Mobile Safari.

[Playwright Github](https://github.com/microsoft/playwright)

# What does Playwright support

- One API, cross platform, cross language and cross browser
- Test on Windows, Linux and MacOS
- Supports Chromium, Firefox & Webkit
- Playwright API can be used in JavaScript, TypeScript, Python, Java & .NET

# Why Playwright

Resilent tests:
- Auto-waiting
- Web first assertions (automatic retries)
- Strong debugging capabilities (tracing, screenshots, videos...)

Fast execution:
- Isolated testing (new browser profile for each test)
- Re-use authentication (save and reuse state)

Powerful tooling:
- CodeGen
- Inspector
- Traceviewer

Limitations:
- Multi tab, origin and windows support
- Iframe support
- Pierce the shadow DOM
- Make API request


# Demo site - E-commerce

The [demo website](https://www.saucedemo.com/)

# Test suite

The tests in the framework cover:

- User login with provided credentials
- User add 3 random items at the cart
- User checkout them
- E2E checkoput flow : https://github.com/Eckpraveen/Playwright/blob/main/tests/checkoutFlowE2E.spec.ts


# UI E2E test

The UI tests are located in /tests folder

More tests will be added over time.


# Usage

Get started by installing Playwright using npm or yarn. Alternatively you can also get started and run tests using the VS Code Extension.

> npm init playwright@latest
> 
> npm install @faker-js/faker
> 
> yarn create playwright

Running tests

> npx playwright test

# Reports
For default report no changes required

For Allure report, execute below commands and uncomment required code in playwright.config.ts

> npm install @playwright/test allure-playwright 

> npm install -g allure-commandline --save-dev

Once Test case is executed( npx playwright test) get the allure report using below commands

> allure generate allure-results --clean

> allure open


# Other Commands
Here are the most common options available in the command line.
Run a single test file

> npx playwright test tests/todo-page.spec.ts

Run a set of test files

> npx playwright test tests/todo-page/ tests/landing-page/

Run tests in headed browsers

> npx playwright test --headed

Run all the tests against a specific project

> npx playwright test --project=chromium

Disable parallelization

> npx playwright test --workers=1

Choose a reporter

> npx playwright test --reporter=dot

Run in debug mode with Playwright Inspector

> npx playwright test --debug

Ask for help

> npx playwright test --help

Complete set of Playwright Test options is available in the configuration file.

# Locators

Playwright comes with multiple built-in locators. To make tests resilient, Playwright recommend prioritizing user-facing attributes and explicit contracts. These are the recommended built in locators.

**page.getByRole()** to locate by explicit and implicit accessibility attributes.

**page.getByText()** to locate by text content.

**page.getByLabel()** to locate a form control by associated label's text.

**page.getByPlaceholder()** to locate an input by placeholder.

**page.getByAltText()** to locate an element, usually image, by its text alternative.

**page.getByTitle()** to locate an element by its title attribute.

**page.getByTestId()** to locate an element based on its data-testid attribute (other attributes can be configured).

# How to Update Playwright version

Checking Playwright version

> npx @playwright/test --version

Check if package needs update

> npm outdated @playwright/test

Playwright updade can be made by running

> npm i @playwright/test

Update to specific version

> npm install @playwright/test@1.36.2

Usually after Playwright update, browsers need to be updated

> npx playwright install
