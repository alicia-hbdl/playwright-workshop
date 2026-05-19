import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
export class ProductPage extends BasePage {
    
    // Class properties
    private quantityInput: Locator;
    private addToCartButton: Locator;
    // Constructor
    constructor(page: Page) {
        super(page);
        this.quantityInput = page.getByRole('spinbutton', { name: 'Product quantity' });
        this.addToCartButton = page.getByRole('button', { name: '+ Add to cart' });
    }
    // Method to set the product quantity
    async setProductQuantity(quantity: number) {
        await this.quantityInput.click();
        await this.quantityInput.fill(quantity.toString());
    }
    // Method to add the product to the cart
    async addToCart() {
        await this.addToCartButton.click();
    }
}
