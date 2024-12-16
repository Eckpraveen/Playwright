import { Browser, chromium, expect, Page } from "@playwright/test";
import LoginPage from "./pages/loginPage";

async function globalSetup() {
    let browser: Browser | null = null;

    try {
        console.log("Launching browser...");
        browser = await chromium.launch({ headless: true });
        const context = await browser.newContext();
        const page: Page = await context.newPage();
        const login = new LoginPage(page);

        console.log("Navigating to Sauce Demo login page...");
        await page.goto('https://www.saucedemo.com/');
        await page.waitForLoadState('networkidle');

        console.log("Performing login...");
        await login.enterUsername('standard_user');
        await login.enterPassword('secret_sauce');
        await login.clickLoginButton();

        console.log("Validating login success...");
        await expect(page).toHaveTitle('Swag Labs');
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

        console.log("Saving authentication state...");
        await page.context().storageState({ path: "./LoginAuth.json" });
        console.log("Authentication state saved successfully.");
    } catch (error) {
        console.error("Error during global setup:", error);
        throw error; // Rethrow the error to fail the test suite setup
    } finally {
        if (browser) {
            console.log("Closing browser...");
            await browser.close();
        }
    }
}

export default globalSetup;
