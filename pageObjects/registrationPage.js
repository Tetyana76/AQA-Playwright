import { expect } from '@playwright/test'; 

export default class Registration {
  constructor(page) {
    this.page = page;

    this.selectors = {
      signInButton: 'button:has-text("Sign In")',
      registrationForm: 'h4:has-text("Registration")',
      signupNameField: 'input#signupName',
      signupLastNameField: 'input#signupLastName',
      signupEmailField: 'input#signupEmail',
      signupPasswordField: 'input#signupPassword',
      signupRepeatPassword: 'input#signupRepeatPassword',
      registerButton: 'button:has-text("Register")',
      registrationButton: 'button:has-text("Registration")',
      nameRequired: 'p:has-text("Name required")',
      nameInvalid: 'p:has-text("Name is invalid")',
      lengthNameRequired: 'p:has-text("Name has to be from 2 to 20 characters long")',
      lastNameRequired: 'p:has-text("Last name required")',
      lastNameInvalid: 'p:has-text("Last name is invalid")',
      lengthLastNameRequired: 'p:has-text("Last name has to be from 2 to 20 characters long")',
      emailRequired: 'p:has-text("Email required")',
      emailIncorrect: 'p:has-text("Email is incorrect")',
      passwordRequired: 'p:has-text("Password required")',
      passwordInvalid: 'p:has-text("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")',
      reenterPasswordRequired: 'p:has-text("Re-enter password required")',
      reenterPasswordInvalid: 'p:has-text("Passwords do not match")',
      garagePageHeader: 'h1:has-text("Garage")',
    };
  }

  async clickSignInButton() {
    await this.page.waitForSelector(this.selectors.signInButton, { state: 'visible' });
    await this.page.locator(this.selectors.signInButton).click();
  }

  async clickRegistrationButton() {
    await this.page.waitForSelector(this.selectors.registrationButton, { state: 'visible' });
    await this.page.locator(this.selectors.registrationButton).click();
    await this.page.waitForSelector(this.selectors.registrationForm, { state: 'visible' });
  }

  async fillSignupName(name) {
    await this.page.locator(this.selectors.signupNameField).fill(name);
  }

  async fillSignupLastName(lastName) {
    await this.page.locator(this.selectors.signupLastNameField).fill(lastName);
  }

  async fillSignupEmail(email) {
    await this.page.locator(this.selectors.signupEmailField).fill(email);
  }

  async fillSignupPassword(password) {
    await this.page.locator(this.selectors.signupPasswordField).fill(password);
  }

  async fillReenterPassword(password) {
    await this.page.locator(this.selectors.signupRepeatPassword).fill(password);
  }

  registerButton() {
    return this.page.locator(this.selectors.registerButton);
  }

  async clickRegisterButton() {
    await this.page.locator(this.selectors.registerButton).click();
  }

  signupName() {
    return this.page.locator(this.selectors.signupNameField);
  }

  signupLastName() {
    return this.page.locator(this.selectors.signupLastNameField);
  }

  signupEmail() {
    return this.page.locator(this.selectors.signupEmailField);
  }

  signupPassword() {
    return this.page.locator(this.selectors.signupPasswordField);
  }

  signupRepeatPassword() {
    return this.page.locator(this.selectors.signupRepeatPassword);
  }

  nameRequired() {
    return this.page.locator(this.selectors.nameRequired);
  }

  nameInvalid() {
    return this.page.locator(this.selectors.nameInvalid);
  }

  lengthNameRequired() {
    return this.page.locator(this.selectors.lengthNameRequired);
  }

  lastNameRequired() {
    return this.page.locator(this.selectors.lastNameRequired);
  }

  lastNameInvalid() {
    return this.page.locator(this.selectors.lastNameInvalid);
  }

  lengthLastNameRequired() {
    return this.page.locator(this.selectors.lengthLastNameRequired);
  }

  emailRequired() {
    return this.page.locator(this.selectors.emailRequired);
  }

  emailIncorrect() {
    return this.page.locator(this.selectors.emailIncorrect);
  }

  passwordRequired() {
    return this.page.locator(this.selectors.passwordRequired);
  }

  passwordInvalid() {
    return this.page.locator(this.selectors.passwordInvalid);
  }

  reenterPasswordRequired() {
    return this.page.locator(this.selectors.reenterPasswordRequired);
  }

  reenterPasswordInvalid() {
    return this.page.locator(this.selectors.reenterPasswordInvalid);
  }

  async verifyRedirectToGaragePage(page) {
    await page.waitForURL("https://qauto.forstudy.space/panel/garage");
    const currentURL = page.url();
    if (currentURL !== "https://qauto.forstudy.space/panel/garage") {
        throw new Error(`Expected URL to be "https://qauto.forstudy.space/panel/garage" but found "${currentURL}"`);
    }
  }

  async verifyGaragePageElements() {
    const garageElement = await this.page.locator(this.selectors.garagePageHeader);
    await expect(garageElement).toBeVisible();
  }
}
