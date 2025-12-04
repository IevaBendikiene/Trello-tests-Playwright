import { test, expect } from "@playwright/test";

const BASE_URL = "https://api.trello.com/1";
const API_KEY = process.env.API_KEY;
const TOKEN = process.env.API_TOKEN;
const boardName = "TEST";
let boardId: string | undefined;

test.describe("Trello API tests", () => {
  test("should create a new board successfully", async ({ request }) => {
    const url = `${BASE_URL}/boards/?name=${encodeURIComponent(
      boardName
    )}&key=${API_KEY}&token=${TOKEN}`;
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

  test("should handle invalid API key or token gracefully", async ({
    request,
  }) => {
    const boardName = "Test Invalid API Key";
    const url = `${BASE_URL}/boards/?name=${encodeURIComponent(
      boardName
    )}&key=INVALID_KEY&token=INVALID_TOKEN`;
    const response = await request.post(url, {
      headers: {
        Accept: "application/json",
      },
    });
    expect(response.status()).toBe(401);
    const responseText = await response.text();
    expect(responseText).toBe("invalid key");
  });

  test.afterEach(async ({ request }) => {
    if (boardId) {
      const deleteUrl = `${BASE_URL}/boards/${boardId}?key=${API_KEY}&token=${TOKEN}`;
      const response = await request.delete(deleteUrl);
      expect(response.status()).toBe(200);
    }
  });
});

test.describe("Trello API - Get Board", () => {
  test.beforeEach(async ({ request }) => {
    const boardName = "Test Board";
    const url = `${BASE_URL}/boards/?name=${encodeURIComponent(
      boardName
    )}&key=${API_KEY}&token=${TOKEN}`;
    const response = await request.post(url, {
      headers: { Accept: "application/json" },
    });
    const responseData = await response.json();
    if (response.status() !== 200) {
      throw new Error("Failed to create board in beforeEach");
    }
    boardId = responseData.id;
  });

  test.afterEach(async ({ request }) => {
    if (boardId) {
      const url = `${BASE_URL}/boards/${boardId}?key=${API_KEY}&token=${TOKEN}`;
      const response = await request.delete(url);
      if (response.status() !== 200) {
        console.warn("Failed to delete board in afterEach");
      }
    }
  });

  test("should return board details with valid status, headers, and body", async ({
    request,
  }) => {
    const url = `${BASE_URL}/boards/${boardId}?key=${API_KEY}&token=${TOKEN}`;
    const response = await request.get(url);
    const responseData = await response.json();
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("application/json");
    expect(responseData).toHaveProperty("id", boardId);
    expect(responseData).toHaveProperty("name");
    expect(responseData).toHaveProperty("shortUrl");
  });

  test("should throw an error when the API returns a failure response", async ({
    request,
  }) => {
    const invalidBoardId = "invalidBoard123";
    const url = `${BASE_URL}/boards/${invalidBoardId}?key=${API_KEY}&token=${TOKEN}`;
    const response = await request.get(url);
    const responseData = await response.text();
    expect(response.status()).toBe(400);
    expect(responseData).toBe("invalid id");
  });
});

test.describe("Trello API - Update Board", () => {

  test.beforeEach(async ({ request }) => {
    const boardName = "Test Board";
    const url = `${BASE_URL}/boards/?name=${encodeURIComponent(
      boardName
    )}&key=${API_KEY}&token=${TOKEN}`;
    const response = await request.post(url, {
      headers: { Accept: "application/json" },
    });
    const responseData = await response.json();
    if (response.status() !== 200) {
      throw new Error("Failed to create board in beforeEach");
    }
    boardId = responseData.id;
  });

  test.afterEach(async ({ request }) => {
    if (boardId) {
      const url = `${BASE_URL}/boards/${boardId}?key=${API_KEY}&token=${TOKEN}`;
      const response = await request.delete(url);
      if (response.status() !== 200) {
        console.warn("Failed to delete board in afterEach");
      }
    }
  });

  test("should update the board successfully", async ({ request }) => {
    const updates = { name: "Updated Board Name", desc: "Updated description" };
    const url = `${BASE_URL}/boards/${boardId}?key=${API_KEY}&token=${TOKEN}`;
    const response = await request.put(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: updates,
    });
    const responseData = await response.json();
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("application/json");
    expect(responseData).toHaveProperty("id", boardId);
    expect(responseData).toHaveProperty("name", updates.name);
    expect(responseData).toHaveProperty("desc", updates.desc);
  });
});

test.describe("Trello API - Delete Board", () => {
  test.beforeEach(async ({ request }) => {
    const boardName = "Test Board";
    const url = `${BASE_URL}/boards/?name=${encodeURIComponent(
      boardName
    )}&key=${API_KEY}&token=${TOKEN}`;
    const response = await request.post(url, {
      headers: { Accept: "application/json" },
    });
    const responseData = await response.json();
    if (response.status() !== 200) {
      throw new Error("Failed to create board in beforeEach");
    }
    boardId = responseData.id;
  });

  test.afterEach(async ({ request }) => {
    if (boardId) {
      const url = `${BASE_URL}/boards/${boardId}?key=${API_KEY}&token=${TOKEN}`;
      const response = await request.delete(url);
      if (response.status() !== 200) {
        console.warn("Failed to delete board in afterEach");
      }
    }
  });

  test("should delete a board successfully", async ({ request }) => {
    const url = `${BASE_URL}/boards/${boardId}?key=${API_KEY}&token=${TOKEN}`;
    const response = await request.delete(url);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("application/json");
  });

  test("should handle an invalid board ID gracefully", async ({ request }) => {
    const invalidBoardId = "invalidBoard123";
    const url = `${BASE_URL}/boards/${invalidBoardId}?key=${API_KEY}&token=${TOKEN}`;
    const response = await request.delete(url);
    const responseData = await response.text();
    expect(response.status()).toBe(400);
    expect(responseData).toBe("invalid id");
  });
});
