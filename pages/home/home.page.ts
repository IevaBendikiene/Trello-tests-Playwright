import { type Locator, type Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly navBar: Locator;
  readonly loginLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navBar = page.getByTestId("bignav");
    this.loginLink = this.navBar.getByRole("link", { name: "Log in" });
  }
  async goto() {
    await this.page.goto("https://trello.com/");
  }

  async navigateToLogin() {
    await this.loginLink.click(); 
  }
}
