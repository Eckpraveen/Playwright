import { Page } from "@playwright/test";

export default class inventoryPage {
    constructor(public page: Page) { }

    async pageName(): Promise<string> {
        const textContent = await this.page.locator('span.title').textContent();
        return textContent ? textContent.trim() : '';
    }

    async firstName(firstname: string) {
        await this.page.locator('#billing_first_name')
            .type(firstname);
    }
    async inventoryItemCounts(): Promise<number> {
        return await this.page.locator(`//div[@data-test='inventory-item']`).count();
    }

    async getInventoryItemsAddToCartBtn() {
        await this.page.waitForLoadState('networkidle');
        return this.page.locator(`div[data-test='inventory-item'] button[data-test*='add-to-cart']`).all();
    }

    async cartIcon() {
        await this.page.locator('div#shopping_cart_container').click();
    }

    async getCurrentCartItem(): Promise<number> {
        const textContent = await this.page.locator(`div#shopping_cart_container span.shopping_cart_badge`).textContent();
        if (textContent !== null) {
            const numericValue = parseInt(textContent.trim());
            return numericValue
        } else {
            console.error("Text content is null!");
            return 0
        }

    }
}

