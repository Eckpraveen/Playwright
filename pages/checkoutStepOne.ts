import { Page } from "@playwright/test";

/**
 * Page Object Model for the Checkout Step One page.
 */
export default class CheckoutStepOnePage {
    constructor(private readonly page: Page) { }

    /**
     * Retrieves the page name by extracting and trimming the text from the title locator.
     */
    async getPageName(): Promise<string> {
        const titleLocator = this.page.locator('span.title');
        return (await titleLocator.textContent())?.trim() || '';
    }

    /**
     * Enters the first name in the input field.
     * @param firstname - The first name to be entered.
     */
    async enterFirstName(firstname: string): Promise<void> {
        const firstNameInput = this.page.locator('input#first-name');
        await firstNameInput.click();
        await firstNameInput.fill(firstname);
    }

    /**
     * Enters the last name in the input field.
     * @param lastname - The last name to be entered.
     */
    async enterLastName(lastname: string): Promise<void> {
        const lastNameInput = this.page.locator('input#last-name');
        await lastNameInput.click();
        await lastNameInput.fill(lastname);
    }

    /**
     * Enters the postal code in the input field.
     * @param postalCode - The postal code to be entered.
     */
    async enterPostalCode(postalCode: string): Promise<void> {
        const postalCodeInput = this.page.locator('input#postal-code');
        await postalCodeInput.click();
        await postalCodeInput.fill(postalCode);
    }

    /**
     * Clicks the continue button to proceed to the next step.
     */
    async clickContinue(): Promise<void> {
        const continueButton = this.page.locator('input#continue');
        await continueButton.click();
    }

    /**
     * Completes the checkout step by entering all required fields and clicking continue.
     * @param firstname - The first name to be entered.
     * @param lastname - The last name to be entered.
     * @param postalCode - The postal code to be entered.
     */
    async completeCheckout(firstname: string, lastname: string, postalCode: string): Promise<void> {
        await this.page.waitForLoadState('networkidle');
        await this.enterFirstName(firstname);
        await this.enterLastName(lastname);
        await this.enterPostalCode(postalCode);
        await this.clickContinue();
    }
}
