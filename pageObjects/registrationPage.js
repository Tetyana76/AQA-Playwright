import { expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default class Registration {
  constructor(page) {
    this.page = page;

    this.locators = {
      signInButton: this.page.locator('button:has-text("Sign In")'),
      registrationForm: this.page.locator('h4:has-text("Registration")'),
      signupNameField: this.page.locator('input#signupName'),
      signupLastNameField: this.page.locator('input#signupLastName'),
      signupEmailField: this.page.locator('input#signupEmail'),
      signupPasswordField: this.page.locator('input#signupPassword'),
      signupRepeatPassword: this.page.locator('input#signupRepeatPassword'),
      registerButton: this.page.locator('button:has-text("Register")'),
      registrationButton: this.page.locator('button:has-text("Registration")'),
      nameRequired: this.page.locator('p:has-text("Name required")'),
      nameInvalid: this.page.locator('p:has-text("Name is invalid")'),
      lengthNameRequired: this.page.locator('p:has-text("Name has to be from 2 to 20 characters long")'),
      lastNameRequired: this.page.locator('p:has-text("Last name required")'),
      lastNameInvalid: this.page.locator('p:has-text("Last name is invalid")'),
      lengthLastNameRequired: this.page.locator('p:has-text("Last name has to be from 2 to 20 characters long")'),
      emailRequired: this.page.locator('p:has-text("Email required")'),
      emailIncorrect: this.page.locator('p:has-text("Email is incorrect")'),
      passwordRequired: this.page.locator('p:has-text("Password required")'),
      passwordInvalid: this.page.locator(
        'p:has-text("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")'
      ),
      reenterPasswordRequired: this.page.locator('p:has-text("Re-enter password required")'),
      reenterPasswordInvalid: this.page.locator('p:has-text("Passwords do not match")'),
      garagePageHeader: this.page.locator('h1:has-text("Garage")'),
    };
  }

  async clickSignInButton() {
    await this.locators.signInButton.waitFor({ state: 'visible' });
    await this.locators.signInButton.click();
  }

  async clickRegistrationButton() {
    await this.locators.registrationButton.waitFor({ state: 'visible' });
    await this.locators.registrationButton.click();
    await this.locators.registrationForm.waitFor({ state: 'visible' });
  }

  async fillSignupName(name) {
    await this.locators.signupNameField.fill(name);
  }

  async fillSignupLastName(lastName) {
    await this.locators.signupLastNameField.fill(lastName);
  }

  async fillSignupEmail(email) {
    await this.locators.signupEmailField.fill(email);
  }

  async fillSignupPassword(password) {
    await this.locators.signupPasswordField.fill(password);
  }

  async fillReenterPassword(password) {
    await this.locators.signupRepeatPassword.fill(password);
  }

  registerButton() {
    return this.locators.registerButton;
  }

  async clickRegisterButton() {
    await this.locators.registerButton.click();
  }

  signupName() {
    return this.locators.signupNameField;
  }

  signupLastName() {
    return this.locators.signupLastNameField;
  }

  signupEmail() {
    return this.locators.signupEmailField;
  }

  signupPassword() {
    return this.locators.signupPasswordField;
  }

  signupRepeatPassword() {
    return this.locators.signupRepeatPassword;
  }

  nameRequired() {
    return this.locators.nameRequired;
  }

  nameInvalid() {
    return this.locators.nameInvalid;
  }

  lengthNameRequired() {
    return this.locators.lengthNameRequired;
  }

  lastNameRequired() {
    return this.locators.lastNameRequired;
  }

  lastNameInvalid() {
    return this.locators.lastNameInvalid;
  }

  lengthLastNameRequired() {
    return this.locators.lengthLastNameRequired;
  }

  emailRequired() {
    return this.locators.emailRequired;
  }

  emailIncorrect() {
    return this.locators.emailIncorrect;
  }

  passwordRequired() {
    return this.locators.passwordRequired;
  }

  passwordInvalid() {
    return this.locators.passwordInvalid;
  }

  reenterPasswordRequired() {
    return this.locators.reenterPasswordRequired;
  }

  reenterPasswordInvalid() {
    return this.locators.reenterPasswordInvalid;
  }

  async verifyRedirectToGaragePage() {
    console.log('BASE_URL:', process.env.BASE_URL);
    const expectedUrl = `${process.env.BASE_URL}panel/garage`;
    await this.page.waitForURL(expectedUrl);
    const currentURL = this.page.url();
    if (currentURL !== expectedUrl) {
      throw new Error(`Expected URL to be "${expectedUrl}" but found "${currentURL}"`);
    }
  }

  async verifyGaragePageElements() {
    await expect(this.locators.garagePageHeader).toBeVisible();
  }
}