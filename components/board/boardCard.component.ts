import {type Locator, type Page} from "@playwright/test";

export class BoardCardComponent {
    readonly page: Page; 
    readonly cardCreateButton: Locator;
    readonly cardNameInput: Locator;
    readonly addCardButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cardCreateButton = page.getByTestId("list-add-card-button");
        this.cardNameInput = page.getByTestId("list-card-composer-textarea");
        this.addCardButton = page.getByTestId("list-card-composer-add-card-button");
    }
    async createCard(cardName: string) {
        await this.cardCreateButton.click();
        await this.cardNameInput.fill(cardName);
        await this.addCardButton.click();
    }
} 