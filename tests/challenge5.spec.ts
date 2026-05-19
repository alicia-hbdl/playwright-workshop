import { test } from '@playwright/test';

// Import page object classes
import { LoginPage } from '../pages/challenge5/LoginPage';
import { ShopPage } from '../pages/challenge5/ShopPage';
import { CartPage } from '../pages/challenge5/CartPage';
import { ProductPage } from '../pages/challenge5/ProductPage';


test.describe('POM', () => { 
test.setTimeout(60000);

    // Declare variables for page objects
    let loginPage: LoginPage;
    let shopPage: ShopPage;
    let cartPage: CartPage;
    let productPage: ProductPage;

    // Setup before each test
    test.beforeEach(async ({ page }) => {

        // Initialise page objects
        loginPage = new LoginPage(page);
        shopPage = new ShopPage(page);
        cartPage = new CartPage(page);
        productPage = new ProductPage(page);     
        
        // Launch app and empty cart
        await loginPage.launch();
        await loginPage.acceptCookies()
        await loginPage.authenticate('alicia.hobdell', '5T6x7MRy8J7htxj');
        await cartPage.emptyCart();
    });

    // Test case: add a product to the cart and verify its contents
    test('add to cart and verify cart contents', async () => {
        await shopPage.goToProduct('Useful ChatGPT Prompts');

        await productPage.setProductQuantity(3);
        await productPage.addToCart();
        await cartPage.verifyProductInCart('Useful ChatGPT Prompts', 3);
    });
});
