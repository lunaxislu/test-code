import test, { expect } from "playwright/test";

test.describe("로그인이 되어있지 않은 경우", () => {
    test.beforeEach(async ({ page }) => {
        const productResponsePromise = page.waitForResponse((response) => {
            return response.url().includes("/products/6");
        });

        await page.goto("/product/6");

        const productResponse = await productResponsePromise;
        expect(productResponse.ok()).toBeTruthy();
        expect(productResponse.status()).toBe(200);
    });

    test("장바구니 버튼 클릭 시 로그인페이지로 이동한다", async ({ page }) => {
        const cartBtn = page.getByRole("button", { name: "장바구니" });
        await expect(cartBtn).toBeVisible();
        await cartBtn.click();

        await expect(page).toHaveURL("/login");
    });
    test("구매하기 버튼 클릭 시 로그인페이지로 이동한다", async ({ page }) => {
        const purchaseBtn = page.getByRole("button", { name: "구매" });
        await expect(purchaseBtn).toBeVisible();
        await purchaseBtn.click();

        await expect(page).toHaveURL("/login");
    });
});

test.describe("로그인이 되어있는 경우", () => {
    test.use({
        storageState: "playwright/.auth/user.json",
    });

    test.beforeEach(async ({ page }) => {
        const productResponsePromise = page.waitForResponse((response) => {
            return response.url().includes("/products/6");
        });

        await page.goto("/product/6");

        const productResponse = await productResponsePromise;
        expect(productResponse.ok()).toBeTruthy();
        expect(productResponse.status()).toBe(200);
    });

    test("'0개'상태에서 장바구니 클릭 시 '0개 이상의 값을 입력해주세요!' 경고 문구가 노출된다", async ({
        page,
    }) => {
        const proudctSection = page.locator("section");
        const cartBtn = proudctSection.getByRole("button", {
            name: "장바구니",
        });
        await expect(cartBtn).toBeVisible();
        await cartBtn.click();

        await expect(
            page.getByText("수량은 1개 이상이어야 합니다."),
        ).toBeVisible();
    });

    test('상품 수량을 "3"으로 입력 후 장바구니 클릭 시 장바구니 페이지로 이동하며, 수량이 "3"개로 표시된다', async ({
        page,
    }) => {
        const productSection = page.locator("section");
        const quantityInput = productSection.getByRole("spinbutton");
        await quantityInput.fill("3");

        const cartBtn = productSection.getByRole("button", {
            name: "장바구니",
        });
        await cartBtn.click();
        const headerCartButton = page
            .getByRole("button", { name: "장바구니" })
            .first();
        await expect(headerCartButton).toBeVisible();
        await expect(headerCartButton).toContainText("3");
    });

    test('상품 수량을 "2"로 입력 후 구매 버튼을 클릭하면 해당 상품이 장바구니에 추가되며, 장바구니 페이지로 이동한다', async ({
        page,
    }) => {
        const productSection = page.locator("section");
        const quantityInput = productSection.getByRole("spinbutton");
        await quantityInput.fill("2");

        const purchaseBtn = productSection.getByRole("button", {
            name: "구매",
        });
        await purchaseBtn.click();
        await expect(page).toHaveURL("/cart");
        const headerCartButton = page
            .getByRole("button", { name: "장바구니" })
            .first();
        await expect(headerCartButton).toBeVisible();
        await expect(headerCartButton).toContainText("2");
    });
});
