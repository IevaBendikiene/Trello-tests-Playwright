import { type Locator, type Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly userEmailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  constructor(page: Page) {
    this.page = page;
    this.userEmailInput = page.getByTestId("username");
    this.passwordInput = page.getByTestId("password");
    this.loginButton = page.getByTestId("login-submit-idf-testid");
  }

  async login(userEmail: string, userPassword: string) {
    await this.userEmailInput.fill(userEmail);
    await this.loginButton.click();
    await this.passwordInput.fill(userPassword);
    await this.loginButton.click();

  }
}
