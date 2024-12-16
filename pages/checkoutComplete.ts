import { Page } from "@playwright/test";

export default class CheckoutCompletePage {
    constructor(private readonly page: Page) { }

    /**
     * Retrieves the page name by extracting and trimming the text from the title locator.
     */
    async getPageName(): Promise<string> {
        const titleLocator = this.page.locator('span.title');
        return (await titleLocator.textContent())?.trim() || '';
    }

    /**
     * Returns the locator for the checkout completed header text.
     */
    get checkoutCompletedHeaderText() {
        return this.page.locator('h2.complete-header');
    }

    /**
     * Returns the locator for the checkout complete text.
     */
    get checkoutCompleteText() {
        return this.page.locator('div.complete-text');
    }

    /**
     * Navigates back to the inventory/products page by clicking the back-home button.
     */
    async navigateBackHome(): Promise<void> {
        const backButton = this.page.locator('button#back-to-products');
        await backButton.isEnabled(); // Ensure the button is enabled before clicking.
        await backButton.click();
    }
}
