import { Browser, chromium, expect, Page } from "@playwright/test";
import LoginPage from "./pages/loginPage";

async function globalSetup() {
    let browser: Browser | null = null;
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page: Page = await context.newPage();
    const login = new LoginPage(page);
    await page.goto('https://www.saucedemo.com/');
    await page.waitForLoadState('networkidle')
    await login.enterUsername('standard_user');
    await login.enterPassword('secret_sauce');
    await login.clickLoginBtn();
    await expect(page).toHaveTitle('Swag Labs');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await page.context().storageState({ path: "./LoginAuth.json" });
}

export default globalSetup;