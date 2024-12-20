export default class LoginPage {
  constructor(page) {
    this.page = page;
    this.locators = {
      signInButton: this.page.locator('button:has-text("Sign In")'),
      signinEmail: this.page.locator('input#signinEmail'),
      signinPassword: this.page.locator('input#signinPassword'),
      loginButton: this.page.locator('button:has-text("Login")')
    };
  }

  async login(username, password) {
    await this.locators.signInButton.waitFor({ state: 'visible', timeout: 20000 });
    await this.locators.signInButton.click();
    await this.locators.signinEmail.waitFor({ timeout: 10000 });
    await this.locators.signinEmail.fill(username);
    await this.locators.signinPassword.fill(password);
    await this.locators.loginButton.click();
  }
}

