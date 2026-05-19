import { test, expect } from '@playwright/test';
import { authenticate } from './challenge2';

// Hook executed before each test in the suite
test.beforeEach(async ({ page }) => {

     // Authenticate user 
     await authenticate(page, 'alicia.hobdell', '5T6x7MRy8J7htxj');

     // Go to cart
     await page.locator('xpath=/html/body/nav/div[1]/div[3]/div/a').click();
     await page.waitForLoadState('domcontentloaded');

     // Get the number of distinct products in the cart
     const amountInCart = await page.getByRole('spinbutton', { name: 'Product quantity' }).count()
	
     // Empty cart
     for (let i = 0; i < amountInCart; i++) {
          await page.getByRole('spinbutton', { name: 'Product quantity' }).first().click();
          await page.getByRole('spinbutton', { name: 'Product quantity' }).first().fill('0');
          await page.getByRole('spinbutton', { name: 'Product quantity' }).first().press('Enter');
          await page.waitForLoadState('load');
     }
});

// Test cases
test('add to cart and verify cart contents', async ({ page }) => {
  
  // Authenticate user
  // await authenticate(page, 'YOUR_USERNAME_HERE', 'YOUR_PASSWORD_HERE');
    
  // Navigate to Shop page
  await page.locator('#menu-item-1310').click();

       // Navigate through pages until the desired product link is visible
       while(!(await page.getByText('Useful ChatGPT Prompts').isVisible())) {
       await page.getByRole('link', { name: '→'}).click();
       await page.waitForLoadState('domcontentloaded');
       }

  // Select product, set quantity, and add to cart
  await page.getByAltText('Useful ChatGPT Prompts').click();
  await page.getByRole('spinbutton', { name: 'Product quantity'}).click();
  await page.getByRole('spinbutton', { name: 'Product quantity'}).fill('3');
  await page.getByRole('button', { name: '+ Add to cart'}).click();

  // Navigate to cart and verify contents
  await page.locator('xpath=/html/body/nav/div[1]/div[3]/div/a').click();
  await expect(page.locator('body')).toContainText('Useful ChatGPT Prompts');
  await expect(page.getByRole('cell', { name: 'Useful ChatGPT Prompts quantity'}).getByLabel('Product quantity')).toHaveValue('3');
});
