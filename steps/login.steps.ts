import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { chromium, Browser, BrowserContext, Page } from 'playwright';

let browser: Browser;
let context: BrowserContext;
let page: Page;

Before(async function () {
  browser = await chromium.launch({ headless: false });
  context = await browser.newContext();
  page = await context.newPage();
});

After(async function () {
  await browser.close();
});

Given('I navigate to the login page', async function () {
  await page.goto('https://bitheap.tech');
  await page.waitForLoadState('load');
});

When('I open the login form', async function () {
  await page.click('#menu-item-2330');
});

When('I enter valid credentials', async function () {
  await page.locator("[name='xoo-el-username']").fill('Playwright');
  await page.locator("[name='xoo-el-password']").fill('playwright');
});

When('I click the login button', async function () {
  await page
    .locator('xpath=/html/body/div[8]/div[2]/div/div/div[2]/div/div/div[2]/div/form/button')
    .click();

  await page.waitForLoadState('load');
});

Then('I should see a welcome message containing my username', async function () {
  await expect(page.locator('css=#menu-item-2333 > a'))
    .toHaveText('Hello, Playwright');
});

Then('I take a screenshot for documentation', async function () {
  await page.screenshot({ path: 'test-results/login-test.png' });
});