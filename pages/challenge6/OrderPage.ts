import {Page, Locator, expect} from '@playwright/test';
import { BasePage } from '../challenge5/BasePage';

import { User } from '../../dataClass/User';
import { Product } from '../../dataClass/Product'

export class OrderPage extends BasePage {
    private pageContent: Locator

    constructor(page: Page) {
        super(page);
        this.pageContent = page.locator('body');
    }

    async verifyOrderSuccess(user: User, products: Product[]) {
        await this.page.waitForLoadState('load');
        await this.page.getByText('Order received').waitFor();

        for (const product of products) {
            await expect(this.pageContent).toContainText(product.name);
        }

        await expect(this.pageContent).toContainText(products.reduce((accumulator, currProd) => accumulator + (currProd.price * currProd.quantity), 0).toString());
        await expect(this.pageContent).toContainText(user.firstName);
        await expect(this.pageContent).toContainText(user.lastName);
        await expect(this.pageContent).toContainText(user.emailAddress);
        await expect(this.pageContent).toContainText(user.address.streetAddress);
        // await expect(this.pageContent).toContainText(user.address.town);
        // await expect(this.pageContent).toContainText(user.address.zipCode);
        await expect(this.pageContent).toContainText(user.address.country);
    }
}
