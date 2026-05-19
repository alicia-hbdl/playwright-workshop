import { Locator, Page } from "@playwright/test"
export class BasePage {
  
  // Class properties
  private shopButton: Locator;
  private loginButton: Locator;
  private cartButton: Locator;
  private logOutButton: Locator

  // Constructor
  constructor(protected page: Page) {
    this.shopButton = page.locator('#menu-item-1310');
    this.loginButton = page.locator('#menu-item-2330');
    this.cartButton = page.locator('xpath=/html/body/nav/div[1]/div[3]/div/a');
    this.logOutButton = page.locator('#menu-item-2332').getByRole('link', { name: 'Logout' });
  }

   // Open homepage
   async launch() {
    await this.page.goto('https://bitheap.tech', { waitUntil: 'domcontentloaded' });
  }
  
   // Accept cookie consent
   async acceptCookies() {
    try {
       await this.page.getByRole('button', {name: 'Accept All'}).waitFor({timeout: 2000});
       await this.page.getByRole('button', {name: 'Accept All'}).click();
       await this.page.getByRole('button', {name: 'Consent', exact: true}).click();
    } catch (error) {
       await this.page.getByRole('button', {name: 'Consent', exact: true}).click();
    }
  }
   
   // Navigate to Shop page
   async navigateToShop() {
    await this.shopButton.click();
   }
   
   // Navigate to Login page
   async navigateToLogin() {
    await this.loginButton.click();
   }
  
    // Navigate to Cart page
   async navigateToCart() {
    await this.cartButton.click();
   }

   // Log out user
   async logout() {
    await this.logOutButton.click();
   }
}
