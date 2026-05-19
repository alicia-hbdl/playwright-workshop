import { test, expect } from '@playwright/test';

test('login', async ({ page }) => {
   
   // Navigate to the login page URL.
   await page.goto('https://bitheap.tech')
   await page.waitForLoadState('load')

   // Click on the login menu item to open the login form.
   await page.click('#menu-item-2330')
   
   // Enter a valid username and password.
   await page.locator("[name='xoo-el-username']").fill('alicia.hobdell')
   await page.locator("[name='xoo-el-password']").fill('5T6x7MRy8J7htxj')
   
   // Click the login button.
   await page.locator('xpath=/html/body/div[8]/div[2]/div/div/div[2]/div/div/div[2]/div/form/button').click()
   await page.waitForLoadState('load')

   // Verify successful login by checking for a specific element on the landing.
   await expect(page.locator('css=#menu-item-2333 > a')).toHaveText('Hello, Alicia')

   // Take screenshot for documentation
   await page.screenshot({path: 'test-results/login-test.png'})
});
