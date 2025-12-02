import { Page, Locator } from "@playwright/test";
import { BoardListComponent } from "../../components/board/boardList.component";
import { BoardCardComponent } from "../../components/board/boardCard.component";  

export class BoardPage {
  readonly page: Page;
  readonly createBoardButton: Locator;
  readonly createBoardTitleInput: Locator;
  readonly createBoardSubmitButton: Locator;
  readonly boardListComponent: BoardListComponent;
  readonly boardCardComponent: BoardCardComponent;

  constructor(page: Page) {
    this.page = page;
    this.createBoardButton = page.getByTestId("header-create-board-button");
    this.createBoardTitleInput = page.getByTestId("create-board-title-input");
    this.createBoardSubmitButton = page.getByTestId(
      "create-board-submit-button"
    );
    this.boardListComponent = new BoardListComponent(page);
    this.boardCardComponent = new BoardCardComponent(page);
  }

  async createBoard(boardName: string) {
    await this.page.getByTestId("header-create-menu-button").click(); // Open create menu
    await this.createBoardButton.click(); // Click create board
    await this.createBoardTitleInput.fill(boardName); // Fill board name
    await this.createBoardSubmitButton.click(); // Submit creation
  }

  async deleteBoard() {
    await this.page.getByRole("button", { name: "Show menu" }).click();
    await this.page
      .getByRole("button", { name: "Close board" })
      .click();
    await this.page.getByTestId("popover-close-board-confirm").click();
    await this.page.getByRole("button", { name: "Show menu" }).click();
    await this.page.getByTestId("close-board-delete-board-button").click();
    await this.page
      .getByTestId("close-board-delete-board-confirm-button")
      .click();
  }
}
