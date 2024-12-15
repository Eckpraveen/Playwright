import { Page } from "@playwright/test";

// A Page Object Model page for checkout flow

export default class checkoutStepOnePage {
    constructor(public page: Page) {}

    async pageName(): Promise<string> {
        const textContent = await this.page.locator('span.title').textContent();
        // await this.page.locator('span.title').textContent()
        return textContent ? textContent.trim() : '';
    }
    
    async firstName(firstname: string) {
        await this.page.locator('input#first-name').click()
        await this.page.locator('input#first-name').fill(firstname)
    }

    async lastName(lastname: string) {
        await this.page.locator('input#last-name').click()
        await this.page.locator('input#last-name').fill(lastname);
    }
    
    async postalCode(postalCode: string) {
        await this.page.locator('input#postal-code').click()
        await this.page.locator('input#postal-code').fill(postalCode)
    }

    async continueBtn() {
        await this.page.locator('input#continue').click();
    }

    async completeCheckout(firstname: string, lastname: string, postalCode: string) {
        await this.page.waitForLoadState('networkidle');
        await this.firstName(firstname)
        await this.lastName(lastname)
        await this.postalCode(postalCode)
        await this.continueBtn();
    }

}