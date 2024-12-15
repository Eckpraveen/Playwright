import { Page } from "@playwright/test";

// A Page Object Model page for checkout flow

export default class checkoutStepTwoPage {
    constructor(public page: Page) {}

    async pageName(): Promise<string> {
        const textContent = await this.page.locator('span.title').textContent();
        return textContent ? textContent.trim() : '';
    }

    async getTotalItemsAtCheckoutStep2Page() {
        return await this.page.locator(`div.cart_item`).count();
    }

    async finishBtn() {
        await this.page.locator('button#finish').click();
    }

    public getSummaryInfo(){
        return this.page.locator(`div.summary_info`);
    }

    public getPaymentInfoLabel(){
        return this.page.locator(`div[data-test='payment-info-label']`)
    }

    public getShippingInfoLabel(){
     return this.page.locator(`div[data-test='shipping-info-label']`)
    }

    public getTotalInfoLabel() {
        return this.page.locator(`div[data-test='total-info-label']`)
    }

    public getPaymentInfoValue(){
        return this.page.locator(`div[data-test='payment-info-value']`)
    }

    public getShippingInfoValue() {
        return this.page.locator(`div[data-test='shipping-info-value']`)
    }

    public getTotalInfoItemTotal() {
        return this.page.locator(`div.summary_subtotal_label`)
    }

    public getTotalInfoTaxValue() {
        return this.page.locator(`div.summary_tax_label`)
    }

    public getTotalPayable() {
        return this.page.locator(`div.summary_total_label`)
    }
    // async firstName(firstname: string) {
    //     await this.page.locator('input#first-name').click()
    //     await this.page.locator('input#first-name').fill(firstname)
    // }

    // async lastName(lastname: string) {
    //     await this.page.locator('input#last-name').click()
    //     await this.page.locator('input#last-name').fill(lastname);
    // }
    
    // async postalCode(postalCode: string) {
    //     await this.page.locator('input#postal-code').click()
    //     await this.page.locator('input#postal-code').fill(postalCode)
    // }



    // async completeCheckout(firstname: string, lastname: string, postalCode: string) {
    //     await this.page.waitForLoadState('networkidle');
    //     await this.firstName(firstname)
    //     await this.lastName(lastname)
    //     await this.postalCode(postalCode)
    //     await this.continueBtn();
    // }

}