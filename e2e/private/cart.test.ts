import { expect, Page, test } from "playwright/test";
test.use({
    storageState: "playwright/.auth/user.json",
});
test.describe("장바구니에 상품이 없는 경우", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
        const cartBtn = page.getByTestId("cart-icon");
        await cartBtn.click();
    });

    test('"텅~"글자가 나타난다.', async ({ page }) => {
        await expect(page.getByText("텅~")).toBeVisible();
    });

    test('"홈으로 가기" 링크를 클릭하는 경우 홈으로 이동한다', async ({
        page,
    }) => {
        const btn = page.getByRole("button", {
            name: "홈으로 가기",
        });

        await btn.click();

        await expect(page).toHaveURL("/");
    });
});

const getProductCardByIndex = (page: Page, index: number) =>
    page.getByTestId("product-card").nth(index);

const getCartButton = (page: Page) => page.getByTestId("cart-icon");

test.describe("장바구니에 상품이 추가되어 있는 경우", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
        await getProductCardByIndex(page, 0)
            .getByRole("button", { name: "장바구니" })
            .click();
        await getProductCardByIndex(page, 1)
            .getByRole("button", { name: "장바구니" })
            .click();

        await getCartButton(page).click();
    });

    test('추가한 상품이 장바구니 상품 목록에 나타나며, 상품의 총 수량과 가격 총합인 "총 2개"와 가격이 표시되어 나타난다', async ({
        page,
    }) => {
        const rows = page.locator("tbody tr");

        for (let i = 0; i < 2; i++) {
            const row = rows.nth(i);

            await expect(row.locator("td").nth(1)).not.toHaveText("");
            await expect(row.locator("td").nth(3)).toContainText("$");
        }
        await expect(page.getByText(/총 2개/)).toBeVisible();
    });

    test('장바구니 상품의 수량을"10"으로 변경 할 경우 총 갯수와 총합은 이전의 수량과 가격의 합보다 더 높다.', async ({
        page,
    }) => {
        const summary = page.getByText(/총 \d+개,\s*\$\d[\d,]*/);
        const firstCountInput = page
            .locator("tbody tr")
            .first()
            .getByRole("spinbutton");

        const beforeText = await summary.textContent();
        const beforeMatch = beforeText?.match(/총\s+(\d+)개,\s*\$([\d,]+)/);

        expect(beforeMatch).not.toBeNull();

        const beforeCount = Number(beforeMatch?.[1]);
        const beforePrice = Number(beforeMatch?.[2].replaceAll(",", ""));

        await firstCountInput.fill("10");

        const afterText = await summary.textContent();
        const afterMatch = afterText?.match(/총\s+(\d+)개,\s*\$([\d,]+)/);

        expect(afterMatch).not.toBeNull();

        const afterCount = Number(afterMatch?.[1]);
        const afterPrice = Number(afterMatch?.[2].replaceAll(",", ""));

        expect(afterCount).toBeGreaterThan(beforeCount);
        expect(afterPrice).toBeGreaterThan(beforePrice);
    });

    test("삭제 버튼을 클릭할 경우 해당 상품이 장바구니에서 삭제된다", async ({
        page,
    }) => {
        const rows = page.locator("tbody tr");
        await expect(rows).toHaveCount(2);

        const targetRow = rows.nth(1);

        await targetRow.getByLabel("삭제").click();

        await expect(rows).toHaveCount(1);
    });

    test('"구매하기" 버튼을 클릭할 경우 구매페이지로 이동한다', async ({
        page,
    }) => {
        await page.getByText("구매하기").click();

        await expect(page).toHaveURL("/purchase");
    });
});
