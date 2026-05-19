import { test } from '@playwright/test';

import {
    userData,
    ProductData,
    loginPage,
    shopPage,
    productPage,
    cartPage,
    checkoutPage,
    orderPage,
    setupHooks,
    cleanCart
} from '../support/E2Ehooks';

test.setTimeout(60000);

setupHooks();

userData.forEach(user => {

    test(`E2E test for user: ${user.username}`, async () => {

        // Clean cart for current user only
        await cleanCart(user);

        // Login
        await loginPage.launch();
        await loginPage.acceptCookies();
        await loginPage.authenticate(user.username, user.password);

        // Add products
        for (const product of ProductData) {

            if (product.valid) {

                await shopPage.goToProduct(product.name);

                await productPage.setProductQuantity(product.quantity);
                await productPage.addToCart();

                await cartPage.verifyProductInCart(product.name, product.quantity);
            }
        }

        // Checkout
        await cartPage.checkout();

        await checkoutPage.fillDetails(user);
        await checkoutPage.placeOrder();

        // Verify order
        await orderPage.verifyOrderSuccess(user, ProductData);

        await loginPage.logout();
    });
});