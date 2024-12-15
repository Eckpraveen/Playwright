import { Page } from "@playwright/test";
export default class LoginPage {
    constructor(public page: Page) { }

    async enterUsername(username: string) {
        await this.page.locator('input#user-name').fill(username)
    }

    async enterPassword(passowrd: string) {
        await this.page.locator('input#password').fill(passowrd);
    }

    async clickLoginBtn() {
        await this.page.locator('#login-button').click()
    }


}