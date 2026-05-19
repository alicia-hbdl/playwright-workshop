import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ShopPage extends BasePage {
   
   // Class properties
   private nextPageArrow: Locator
   // Constructor
   constructor(page: Page) {
        super(page);
        this.nextPageArrow = page.getByRole('link', { name: '→' });
    }
   // Navigate through shop pages to find and select a product by name
   async goToProduct(productName: string) {
        await this.navigateToShop();
        while(!(await this.page.getByText(productName).isVisible())) {
            await this.nextPageArrow.click();
            await this.page.waitForLoadState('domcontentloaded');
        }
        await this.page.getByText(productName).click();
    }
}
