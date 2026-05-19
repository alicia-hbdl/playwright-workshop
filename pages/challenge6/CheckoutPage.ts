import { Page, Locator } from '@playwright/test';
import { BasePage } from '../challenge5/BasePage';
import { User } from '../../dataClass/User';

export class CheckoutPage extends BasePage {

    // Class properties
    private firstNameInput: Locator; 
    private lastNameInput: Locator; 
    private countryDropDown: Locator; 
    private countryInput: Locator;  
    private streetAddressInput: Locator; 
    private zipCodeInput: Locator; 
    private townInput: Locator; 
    private emailAddressInput: Locator; 
    private placeOrderButton: Locator;    
   
    // Constructor
  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.getByRole('textbox', { name: 'First name' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last name' });
    this.countryDropDown = page.locator('#select2-billing_country-container');
    this.countryInput = page.getByRole('combobox').filter({ hasText: /^$/ });
    this.streetAddressInput = page.getByRole('textbox', { name: 'Street address' });
    this.zipCodeInput = page.getByRole('textbox', { name: 'Postcode / ZIP' });
    this.townInput = page.getByRole('textbox', { name: 'Town / City' });
    this.emailAddressInput = page.getByRole('textbox', { name: 'Email address'});
    this.placeOrderButton = page.getByRole('button', { name: 'Place order' });
  }

 // Method to fill billing details form with user data
   async fillDetails(user: User) {
        await this.firstNameInput.click();
        await this.firstNameInput.fill(user.firstName);

        await this.lastNameInput.click();
        await this.lastNameInput.fill(user.lastName);

        await this.countryDropDown.click();
        await this.countryInput.click();
        await this.countryInput.fill(user.address.country);
        await this.page.getByRole('option', { name: user.address.country }).click();

        await this.streetAddressInput.click();
        await this.streetAddressInput.fill(user.address.streetAddress);

        await this.zipCodeInput.click();
        await this.zipCodeInput.fill(user.address.zipCode);

        await this.townInput.click();
        await this.townInput.fill(user.address.town);

        await this.emailAddressInput.click();
        await this.emailAddressInput.fill(user.emailAddress);
    }

    // Method to click the place order button and submit the order
    async placeOrder() {
        await this.placeOrderButton.click();
    }}
