import { test, expect } from "@playwright/test";
import { loginUser } from "../helpers/auth.helper";
import { logoutUser } from "../helpers/logout.helper";

const userEmail = process.env.USER_ID ?? "";
const userPassword = process.env.USER_PASSWORD ?? "";

test("Login user to Trello", async ({ page }) => {
  await loginUser(page, userEmail, userPassword);
  await expect(page).toHaveURL("https://trello.com/u/ieva_test/boards");
  await logoutUser(page);
});



