import { Page } from "@playwright/test";
import { HomePage } from "../pages/home/home.page";
import { LoginPage } from "../pages/login/login.page"

export async function loginUser(page: Page, email: string, password: string): Promise<void> {
  const home = new HomePage(page);
  await home.goto();
  await home.navigateToLogin();
  
  const login = new LoginPage(page);
  await login.login(email, password);
}

