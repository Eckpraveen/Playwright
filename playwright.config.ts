import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  globalSetup: "./global-setup",
  testDir: './tests',
  /* Maximum time one test can run for. */
  timeout: 30 * 3000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 50000
  },
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  
  //Playwright default report
  reporter: 'html',
  
  // Allure report
  //reporter: [   ['allure-playwright'],],
  /*
  For allure rpeort ensure to run below commands and keep above code uncommented
  - npm install @playwright/test allure-playwright
  - npm install -g allure-commandline --save-dev
  - Uncomment above code
  - Run the test
  - run command: allure generate allure-results --clean
  - eun command: allure open
  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  
  outputDir: "test-results-saucedemo",

  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    trace: 'on-first-retry',
    storageState: "./LoginAuth.json",

    /* Set headless */
    headless: false,
    /* Record video */
    video: 'on',
    screenshot: 'on', // Options: 'on', 'off', 'only-on-failure'
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    // },

    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //   },
    // },
  ],
};

export default config;
