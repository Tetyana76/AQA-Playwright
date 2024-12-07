export default class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigateToMainPageWithLogin(defaultCredentials, baseURL) {
    const { username, password } = defaultCredentials;
    await this.page.context().setHTTPCredentials({ username, password });
    await this.page.goto(baseURL);
  }
}