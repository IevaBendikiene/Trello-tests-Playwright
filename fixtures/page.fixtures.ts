import { BoardPage } from "../pages/board/board.page";
import { LoginPage } from "../pages/login/login.page";
import { test as baseTest } from "@playwright/test";

type MyPages = {
  loginPage: LoginPage;
  boardPage: BoardPage;
};

export const test = baseTest.extend<MyPages>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
    boardPage: async ({ page }, use) => { 
    await use(new BoardPage(page));
    }
});

export const expect = test.expect;