import { Page } from "@playwright/test";

/**
 * Page Object Model for the Login Page.
 */
export default class LoginPage {
    constructor(private readonly page: Page) { }

    /**
     * Enters the username into the username input field.
     * @param username - The username to be entered.
     */
    async enterUsername(username: string): Promise<void> {
        const usernameField = this.page.locator('input#user-name');
        await usernameField.fill(username);
    }

    /**
     * Enters the password into the password input field.
     * @param password - The password to be entered.
     */
    async enterPassword(password: string): Promise<void> {
        const passwordField = this.page.locator('input#password');
        await passwordField.fill(password);
    }

    /**
     * Clicks the login button to submit the login form.
     */
    async clickLoginButton(): Promise<void> {
        const loginButton = this.page.locator('#login-button');
        await loginButton.click();
    }
}
