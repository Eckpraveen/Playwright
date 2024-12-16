import { Page, Locator } from "@playwright/test";

export default class CartPage {
    private page: Page;
    private titleSelector: Locator;
    private cartItemsSelector: Locator;
    private checkoutButtonSelector: Locator;

    constructor(page: Page) {
        this.page = page;
        this.titleSelector = page.locator('span.title');
        this.cartItemsSelector = page.locator('div.cart_item');
        this.checkoutButtonSelector = page.locator('button#checkout');
    }

    /**
     * Get the name of the current page.
     * @returns {Promise<string>} - The title of the page.
     */
    async getPageName(): Promise<string> {
        const textContent = await this.titleSelector.textContent();
        if (!textContent) {
            throw new Error("Page title not found!");
        }
        return textContent.trim();
    }

    /**
     * Get the total number of items in the cart.
     * @returns {Promise<number>} - The count of items in the cart.
     */
    async getTotalItemsInCart(): Promise<number> {
        return this.cartItemsSelector.count();
    }

    /**
     * Click the checkout button and ensure the navigation to the next page is successful.
     */
    async proceedToCheckout(): Promise<void> {
        await this.checkoutButtonSelector.click();
        await this.page.waitForLoadState('networkidle'); // Optional: Can be replaced with wait for a specific element on the next page.
        const isCheckoutPageLoaded = await this.page.locator('span.title:has-text("Checkout: Your Information")').isVisible();
        if (!isCheckoutPageLoaded) {
            throw new Error("Failed to navigate to the checkout page.");
        }
    }
}
