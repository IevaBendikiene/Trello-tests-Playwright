
import {test, expect} from "../fixtures/page.fixtures";
import { loginUser } from "../helpers/auth.helper";
import { logoutUser } from "../helpers/logout.helper";
import { describe } from "node:test";

const userEmail = process.env.USER_ID ?? "";
const userPassword = process.env.USER_PASSWORD ?? "";

describe("Board tests", () => {
  test.beforeEach(async ({ page, boardPage }) => {
    await loginUser(page, userEmail, userPassword);
    await boardPage.createBoard("Test");
  });
  test.afterEach(async ({ page, boardPage }) => {

    await boardPage.deleteBoard();
    await logoutUser(page);
  });
  test("Create board in Trello", async ({ page }) => {
    await expect(page.getByTestId("board-name-display")).toHaveText("Test");
  });
  test("Create board and list in the board", async ({ page, boardPage }) => {
    const boardListName = "Test 1"
    await boardPage.boardListComponent.createList(boardListName);
    await expect(page.getByTestId("list-name")).toHaveText(boardListName);
    
  });
  test("Create card", async ({ page, boardPage }) => {
    const boardListName = "Test 1"
    await boardPage.boardListComponent.createList(boardListName);
    const cardName = "Card 1"
    await boardPage.boardCardComponent.createCard(cardName);
    await expect(page.getByTestId("card-name")).toHaveText(cardName);
  });   
});
