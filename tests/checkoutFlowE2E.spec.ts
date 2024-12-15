import { test, expect } from '@playwright/test';
import inventoryPage from '../pages/inventoryPage';
import cartPage from '../pages/cartPage';
import checkoutStepOnePage from '../pages/checkoutStepOne';
import { faker } from '@faker-js/faker';
import checkoutStepTwoPage from '../pages/checkoutStepTwo';
import checkoutCompletePage from '../pages/checkoutComplete';


test.describe('Sauce Demo : ', () => {
  test('Successful checkout Journey', async ({ page }) => {

    /** 
    Inventory Page Journey 
      1. Verify current page - Products
      2. Verify inventory Products are more than 3
      3. Ensure having suffice add to cart items (at least 3 in our case)
      4. Add first 3 products to the cart, simultaniously same count should reflect at Cart Icon
      5. Click at Cart icon
    */
    await page.goto('https://www.saucedemo.com/inventory.html');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    const inventorypage = new inventoryPage(page);
    let currentPageName: string;
    currentPageName = await inventorypage.pageName();
    expect(currentPageName).toBe('Products');
    const inventoryCount = await inventorypage.inventoryItemCounts();
    console.log('Inventory Products count : ',inventoryCount);
    expect(inventoryCount).toBeGreaterThan(3)
    const addToCartButtons = await inventorypage.getInventoryItemsAddToCartBtn();
    expect(addToCartButtons.length).toBeGreaterThan(3);
    for (let i = 0; i < 3; i++) {
      await addToCartButtons[i].click();
      const currentCartItem = await inventorypage.getCurrentCartItem(); // Await the async method
      expect(currentCartItem).toBe(i + 1);
    }
    await inventorypage.cartIcon();

    /**
    Cart Page Journey 
    1. Verify current page - Your Cart
    2. Verify at cart page total items should be 3
    3. Click at Checkout Button
    */
    const cartpage = new cartPage(page)
    currentPageName = await cartpage.pageName();
    expect(currentPageName).toBe('Your Cart');
    expect(await cartpage.getTotalItemsAtCartPage()).toBe(3)
    await cartpage.checkoutBtn();

    /**
    Checkout Step 1 Page Journey 
    1. Verify current page - Checkout: Your Information
    2. Generate fake data for FN, LN, Indian postal code
    3. Perform checkout with created fake data
    */
    const checkoutStepOnepage = new checkoutStepOnePage(page);
    currentPageName = await checkoutStepOnepage.pageName();
    expect(currentPageName).toBe('Checkout: Your Information');
    const randomFN = faker.person.firstName()
    const randomLN = faker.person.lastName()
    const randomPostalCode = faker.number.int({ min: 110000, max: 999999 })
    await checkoutStepOnepage.completeCheckout(randomFN, randomLN, randomPostalCode.toString())

    /**
    Checkout Step 2 Page Journey 
    1. Verify current page - Checkout: Overview
    2. Verify total items should be 3
    3. Verify summary info is displayed
    2. Verify labels: Payment Information, Shipping Info, Total Info
    3. Verify values displayed : Payment Info, Shipping value, Item Total, tax, Total Paid amount
    */
    const checkoutStepTwopage = new checkoutStepTwoPage(page)
    currentPageName = await checkoutStepTwopage.pageName();
    expect(currentPageName).toBe('Checkout: Overview');
    expect(await checkoutStepTwopage.getTotalItemsAtCheckoutStep2Page()).toBe(3)

    expect(await checkoutStepTwopage.getSummaryInfo().isVisible()).toBeTruthy();
    expect(checkoutStepTwopage.getPaymentInfoLabel()).toHaveText('Payment Information:')
    expect(checkoutStepTwopage.getShippingInfoLabel()).toHaveText('Shipping Information:')
    expect(checkoutStepTwopage.getTotalInfoLabel()).toHaveText('Price Total')

    const paymentInfo = await checkoutStepTwopage.getPaymentInfoValue().textContent();
    expect(await checkoutStepTwopage.getPaymentInfoValue().isVisible()).toBeTruthy();
    console.log('Payment Info:', paymentInfo);

    const shippingInfo = await checkoutStepTwopage.getShippingInfoValue().textContent();
    expect(await checkoutStepTwopage.getShippingInfoValue().isVisible()).toBeTruthy();
    console.log('Shipping Info:', shippingInfo);

    const itemTotal = await checkoutStepTwopage.getTotalInfoItemTotal().textContent();
    expect(await checkoutStepTwopage.getTotalInfoItemTotal().isVisible()).toBeTruthy();
    console.log('Item Total:', itemTotal);

    const taxValue = await checkoutStepTwopage.getTotalInfoTaxValue().textContent();
    expect(await checkoutStepTwopage.getTotalInfoTaxValue().isVisible()).toBeTruthy();
    console.log('Tax value:', taxValue);

    const total = await checkoutStepTwopage.getTotalPayable().textContent();
    expect(await checkoutStepTwopage.getTotalPayable().isVisible()).toBeTruthy();
    console.log('Total :', total);
    await checkoutStepTwopage.finishBtn();

    /**
    Checkout Complete Page Journey 
    1. Verify current page - Checkout: Complete!
    2. At successful checkout verify the text - Thank you for your order! 
      Your order has been dispatched, and will arrive just as fast as the pony can get there!
    3. Back home button should land the user to Products/Inventory page back
    */
    const checkoutCompletepage = new checkoutCompletePage(page);
    currentPageName = await checkoutCompletepage.pageName();
    expect(currentPageName).toBe('Checkout: Complete!');
    expect(checkoutCompletepage.getCheckoutCompletedHeaderText()).toHaveText('Thank you for your order!')
    expect(checkoutCompletepage.getCheckoutCompleteText()).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!')
    await checkoutCompletepage.backHome();
    currentPageName = await inventorypage.pageName();
    expect(currentPageName).toBe('Products');
  });

});