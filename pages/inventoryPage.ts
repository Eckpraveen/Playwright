import { Page } from "@playwright/test";

/**
 * Page Object Model for the Inventory Page.
 */
export default class InventoryPage {
    constructor(private readonly page: Page) { }

    /**
     * Retrieves the page title by extracting and trimming the text content of the title element.
     */
    async getPageName(): Promise<string> {
        const titleLocator = this.page.locator('span.title');
        return (await titleLocator.textContent())?.trim() || '';
    }

    /**
     * Fills the billing first name input field.
     * @param firstName - The first name to be entered.
     */
    async enterFirstName(firstName: string): Promise<void> {
        const firstNameInput = this.page.locator('#billing_first_name');
        await firstNameInput.type(firstName);
    }

    /**
     * Counts the number of inventory items on the page.
     */
    async getInventoryItemCount(): Promise<number> {
        return await this.page.locator(`//div[@data-test='inventory-item']`).count();
    }

    /**
     * Retrieves all "Add to Cart" buttons for the inventory items.
     */
    async getAddToCartButtons() {
        await this.page.waitForLoadState('networkidle');
        return this.page.locator(`div[data-test='inventory-item'] button[data-test*='add-to-cart']`).all();
    }

    /**
     * Clicks on the cart icon to navigate to the cart page.
     */
    async clickCartIcon(): Promise<void> {
        const cartIconLocator = this.page.locator('div#shopping_cart_container');
        await cartIconLocator.click();
    }

    /**
     * Retrieves the current number of items in the cart from the cart badge.
     */
    async getCartItemCount(): Promise<number> {
        const cartBadgeLocator = this.page.locator('div#shopping_cart_container span.shopping_cart_badge');
        const textContent = await cartBadgeLocator.textContent();
        if (textContent !== null) {
            const numericValue = parseInt(textContent.trim());
            return isNaN(numericValue) ? 0 : numericValue;
        } else {
            console.error("Cart badge text content is null!");
            return 0;
        }
    }

    /**
     * Adds a specified number of products to the cart by clicking the "Add to Cart" buttons.
     * @param count - The number of products to add to the cart.
     */
    async addProductsToCart(count: number): Promise<void> {
        const addToCartButtons = await this.getAddToCartButtons();
        for (let i = 0; i < count; i++) {
            await addToCartButtons[i].click();
        }
    }

    /**
     * Navigates to the cart page.
     */
    async goToCart(): Promise<void> {
        await this.clickCartIcon();
    }
}
