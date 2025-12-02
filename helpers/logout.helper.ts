import { Page } from "@playwright/test";

export async function logoutUser(page: Page): Promise<void> {
  // Check if the logout button is present (ensure the user is logged in)
  if (await page.getByTestId("header-member-menu-avatar").isVisible()) {
    await page.getByTestId("header-member-menu-avatar").click(); // Open user menu
    await page.getByTestId("account-menu-logout").click(); // Click on logout
  }
}