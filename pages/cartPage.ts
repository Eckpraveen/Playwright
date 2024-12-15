import { Page } from "@playwright/test";


export default class cartPage {
    constructor(public page: Page) { }

    async pageName(): Promise<string> {
        const textContent = await this.page.locator('span.title').textContent();
        return textContent ? textContent.trim() : '';
    }

    async getTotalItemsAtCartPage() {
        return await this.page.locator(`div.cart_item`).count();
    }

    async checkoutBtn() {
        await this.page.locator('button#checkout').click()
        await this.page.waitForLoadState('networkidle');
    }

}