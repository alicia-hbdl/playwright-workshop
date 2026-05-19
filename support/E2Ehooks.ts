import { User } from "../dataClass/User"
import { Product } from "../dataClass/Product";
import { loadUserData, loadProductData } from "./dataLoaders";
import { test } from "@playwright/test";
import { LoginPage } from "../pages/challenge5/LoginPage";
import { CheckoutPage } from "../pages/challenge6/CheckoutPage";
import { OrderPage } from "../pages/challenge6/OrderPage";
import { ShopPage } from "../pages/challenge5/ShopPage";
import { ProductPage } from "../pages/challenge5/ProductPage";
import { CartPage } from "../pages/challenge6/CartPage";

export let loginPage: LoginPage;
export let checkoutPage: CheckoutPage;
export let orderPage: OrderPage;
export let shopPage: ShopPage;
export let productPage: ProductPage;
export let cartPage: CartPage;

export let userData: User[] = [];
export let ProductData: Product[] = [];


export function setupHooks() {

  userData = loadUserData();
    ProductData = loadProductData();
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    checkoutPage = new CheckoutPage(page);
    orderPage = new OrderPage(page);
    shopPage = new ShopPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);

    for (const user of userData) {
      if (user.valid) {
        await loginPage.launch();
        await loginPage.authenticate(user.username, user.password);
        await cartPage.emptyCart();
        await loginPage.logout();
      }
    }
  });
}
