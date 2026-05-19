import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
  
    // Class properties
  private quantityInput: Locator
  
  // Constructor
  constructor(page: Page) {
    super(page);
    this.quantityInput = page.getByRole('spinbutton', {name: 'Product quantity'});
  }

  // Verify product is in cart with expected quantity
   async verifyProductInCart(productName: string, expectedQuantity: number) {
    await this.navigateToCart();
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.page.locator('body')).toContainText(productName);
    await expect(
        this.page.getByRole('cell', {name: `${productName} quantity`}).getByLabel('Product quantity')
    ).toHaveValue(expectedQuantity.toString());
  }

  // Empty the cart by setting all product quantities to zero
  async emptyCart() {
    await this.navigateToCart();
    await this.page.waitForLoadState('domcontentloaded');
    const amountInCart = await this.quantityInput.count();
    for (let i = 0; i < amountInCart; i++) {
      await this.quantityInput.first().click();
      await this.quantityInput.first().fill('0');
      await this.quantityInput.first().press('Enter');
      await this.page.waitForLoadState('load');
    }
  }
}