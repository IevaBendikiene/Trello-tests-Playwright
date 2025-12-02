import {type Locator, type Page} from "@playwright/test";

export class BoardListComponent {
    readonly page: Page;    
    readonly listCreateButton: Locator;
    readonly listNameInput: Locator;
    readonly addListButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.listCreateButton = page.getByTestId("list-composer-button");
        this.listNameInput = page.getByTestId("list-name-textarea");
        this.addListButton = page.getByTestId("list-composer-add-list-button");
    }
    async createList(listName: string) {
        await this.listNameInput.fill(listName);
        await this.addListButton.click();
    }
}