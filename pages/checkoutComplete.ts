import { Page } from "@playwright/test";

export default class checkoutCompletePage {
    constructor(public page: Page) { }

    async pageName(): Promise<string> {
        const textContent = await this.page.locator('span.title').textContent();
        return textContent ? textContent.trim() : '';
    }

    public getCheckoutCompletedHeaderText() {
        return this.page.locator(`h2.complete-header`)
    }

    public getCheckoutCompleteText() {
        return this.page.locator(`div.complete-text`)
    }

    async backHome() {
        await this.page.locator('button#back-to-products').isEnabled()
        await this.page.locator('button#back-to-products').click()
    }


}