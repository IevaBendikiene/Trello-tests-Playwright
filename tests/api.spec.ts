import { test, expect, request } from "@playwright/test";

test.describe("Trello API tests", () => {
  const BASE_URL = "https://api.trello.com/1";
  const API_KEY = process.env.API_KEY;
  const TOKEN = process.env.API_TOKEN;
  const boardName = "TEST";
  let boardId: string | undefined;

  test("should create a new board successfully", async ({ request }) => {
    // Construct the request URL
    const url = `${BASE_URL}/boards/?name=${encodeURIComponent(
      boardName
    )}&key=${API_KEY}&token=${TOKEN}`;

    // Make POST request using Playwright's APIRequestContext
    const response = await request.post(url, {
      headers: {
        Accept: "application/json",
      },
    });
    const responseData = await response.json();
    boardId = responseData.id;
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("application/json");
    expect(responseData).toHaveProperty("id");
    expect(responseData).toHaveProperty("name", boardName);
    expect(responseData).toHaveProperty("url");
  });

  // Optional: Add an afterEach or afterAll hook to clean up resources (if required)
  test.afterEach(async ({ request }) => {
    // Delete the created board if it exists
    if (boardId) {
      const deleteUrl = `${BASE_URL}/boards/${boardId}?key=${API_KEY}&token=${TOKEN}`;
      const response = await request.delete(deleteUrl);
      expect(response.status()).toBe(200);
    }
  });

});
