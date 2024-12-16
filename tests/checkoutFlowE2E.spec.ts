import { test, expect } from '@playwright/test';
import InventoryPage from '../pages/inventoryPage';
import CartPage from '../pages/cartPage';
import CheckoutStepOnePage from '../pages/checkoutStepOne';
import CheckoutStepTwoPage from '../pages/checkoutStepTwo';
import CheckoutCompletePage from '../pages/checkoutComplete';
import { faker } from '@faker-js/faker';


let inventoryPage: InventoryPage;
let cartPage: CartPage;
let checkoutStepOnePage: CheckoutStepOnePage;
let checkoutStepTwoPage: CheckoutStepTwoPage;
let checkoutCompletePage: CheckoutCompletePage;

test.describe('Sauce Demo Checkout Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutStepOnePage = new CheckoutStepOnePage(page);
    checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    checkoutCompletePage = new CheckoutCompletePage(page);
  });

  test.afterEach(async ({ page }) => {
    // Close the browser context after each test
    await page.close();
  });

  test('Successful Checkout Journey', async () => {
    // Inventory Page Journey
    expect(await inventoryPage.getPageName()).toBe('Products');
    const inventoryCount = await inventoryPage.getInventoryItemCount();
    expect(inventoryCount).toBeGreaterThan(3);

    await inventoryPage.addProductsToCart(3); // Abstracted logic into a reusable method
    expect(await inventoryPage.getCartItemCount()).toBe(3);
    await inventoryPage.goToCart();

    // Cart Page Journey
    expect(await cartPage.getPageName()).toBe('Your Cart');
    expect(await cartPage.getTotalItemsInCart()).toBe(3);
    await cartPage.proceedToCheckout();

    // Checkout Step 1 Page Journey
    expect(await checkoutStepOnePage.getPageName()).toBe('Checkout: Your Information');
    const randomFN = faker.person.firstName();
    const randomLN = faker.person.lastName();
    const randomPostalCode = faker.number.int({ min: 110000, max: 999999 }).toString();
    await checkoutStepOnePage.completeCheckout(randomFN, randomLN, randomPostalCode);

    // Checkout Step 2 Page Journey
    expect(await checkoutStepTwoPage.pageName()).toBe('Checkout: Overview');
    expect(await checkoutStepTwoPage.getTotalItemsAtCheckoutStep2Page()).toBe(3);
    expect(await checkoutStepTwoPage.getSummaryInfo().isVisible()).toBeTruthy();

    // Verify Payment and Shipping Info
    await checkoutStepTwoPage.verifySummaryDetails();

    await checkoutStepTwoPage.finishBtn();

    // Checkout Complete Page Journey
    expect(await checkoutCompletePage.getPageName()).toBe('Checkout: Complete!');
    expect(await checkoutCompletePage.checkoutCompletedHeaderText).toHaveText('Thank you for your order!');
    expect(await checkoutCompletePage.checkoutCompleteText).toHaveText(
      'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
    );
    await checkoutCompletePage.navigateBackHome();
    expect(await inventoryPage.getPageName()).toBe('Products');
  });
});
