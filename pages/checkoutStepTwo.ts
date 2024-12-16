import { expect, Page } from "@playwright/test";

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

    async verifySummaryDetails(): Promise<void> {
        expect(await this.getPaymentInfoLabel()).toHaveText('Payment Information:');
        expect(await this.getShippingInfoLabel()).toHaveText('Shipping Information:');
        expect(await this.getTotalInfoLabel()).toHaveText('Price Total');

        const paymentInfo = await this.getPaymentInfoValue().textContent();
        const shippingInfo = await this.getShippingInfoValue().textContent();
        const itemTotal = await this.getTotalInfoItemTotal().textContent();
        const taxValue = await this.getTotalInfoTaxValue().textContent();
        const total = await this.getTotalPayable().textContent();

        console.log({ paymentInfo, shippingInfo, itemTotal, taxValue, total });
    }


}