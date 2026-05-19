
import { expect, Page } from '@playwright/test';

export async function authenticate(page: Page, username: string, pass: string){
   
   // Navigate to the login page URL.
   await page.goto('https://bitheap.tech')
   await page.waitForLoadState('load')

   // Click on the login menu item to open the login form.
   await page.click('#menu-item-2330')
   
   // Enter a valid username and password.
   await page.locator("[name='xoo-el-username']").fill(username)
   await page.locator("[name='xoo-el-password']").fill(pass)
   
   // Click the login button.
   await page.locator('xpath=/html/body/div[8]/div[2]/div/div/div[2]/div/div/div[2]/div/form/button').click()
   await page.waitForLoadState('load')
   
   // Verify successful login by checking for a specific element on the landing.
   await expect(page.locator('css=#menu-item-2333 > a')).toHaveText(new RegExp(`Hello, ${username.split('.')[0]}`, 'i'));
}




