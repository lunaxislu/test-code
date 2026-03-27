import test, { expect } from "playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto("/");
});

test.describe("로그인이 필요한 페이지에 비로그인 상태로 접속하면 로그인 페이지로 리다이렉트 된다", () => {
    test("장바구니 페이지에 접속 할 경우 로그인 페이지로 리다이렉트 된다", async ({
        page,
    }) => {
        await page.goto("/cart");

        await expect(page).toHaveURL("/login");
    });

    test("구매 페이지로 접속 할 경우 로그인 페이지로 리다이렉트 된다", async ({
        page,
    }) => {
        await page.goto("/purchase");

        await expect(page).toHaveURL("/login");
    });
});

test.describe("로그인 된 상태라면 로그인이 필요한 페이지에 접속 할 수 있다", () => {
    test.use({ storageState: "playwright/.auth/user.json" });

    test("장바구니 페이지에 접속 할 수 있다", async ({ page }) => {
        await page.goto("/cart");

        await expect(page).toHaveURL("/cart");
    });

    test("구매 페이지로 접속 할 수 있다", async ({ page }) => {
        await page.goto("/purchase");

        await expect(page).toHaveURL("/purchase");
    });
});

test.describe("로그인 된 상태로 로그인 또는 회원 가입 페이지로 접속할 경우 메인홈 페이지로", () => {
    test.use({
        storageState: "playwright/.auth/user.json",
    });
    test.beforeEach(async ({ page }) => {
        await page.goto("/login");
    });
    test("로그인 페이지에 접속 시 메인 홈으로 리다이렉트 된다", async ({
        page,
    }) => {
        await expect(page).toHaveURL("/");
    });
});

test.describe("비로그인 상태인 경우 로그인 또는 회원 가입 페이지에 접속 할 수 있다", () => {
    test("로그인 페이지에 접속할 수 있다", async ({ page }) => {
        await page.goto("/login");

        await expect(page).toHaveURL("/login");
    });
});
