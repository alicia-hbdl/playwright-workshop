import { test, expect } from '@playwright/test';
import { authenticate } from './challenge2';

test('add to cart and verify cart contents', async ({ page }) => {
  
  // Authenticate user
  await authenticate(page, 'alicia.hobdell', '5T6x7MRy8J7htxj');
    
  // Navigate to Shop page
  await page.locator('#menu-item-1310').click();

  // Navigate through pages until the desired product link is visible
  while(!(await page.getByAltText('Useful ChatGPT Prompts').isVisible())) {
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
