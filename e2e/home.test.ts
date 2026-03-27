import { test, expect, Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto("/");
});
const assertProductListLength = async (page: Page, assertLength: number) => {
    const productList = page.getByTestId("product-card");
    await expect(productList).toHaveCount(assertLength);
};
test("초기 상품은 20개가 노출된다.", async ({ page }) => {
    // const productList = await page.getByTestId("product-card").count();
    // expect(productList).toBe(20);

    await assertProductListLength(page, 20);
});

test("show more 버튼을 클릭할 경우 상품이 20개 더 노출된다", async ({
    page,
}) => {
    const moreBtn = page.getByRole("button", {
        name: /show more/gi,
    });

    await moreBtn.click();
    await assertProductListLength(page, 40);
});

/**
 * todo
 *
 * 장바구니 / 구매버튼 테스트 작성하기
 */

function getProductCardByIndex(page: Page, index: number) {
    return page.getByTestId("product-card").nth(index);
}

function getCartBadge(page: Page) {
    return page.getByLabel("장바구니").locator("[data-slot='badge']");
}

test.describe("장바구니 / 구매 버튼", () => {
    test.describe("로그인을 하지 않았을 경우", () => {
        test("상품의 장바구니 클릭 시 로그인 페이지로 이동한다", async ({
            page,
        }) => {
            const productCard = getProductCardByIndex(page, 0);

            const cartBtn = productCard.getByRole("button", {
                name: /장바구니/,
            });
            await cartBtn.click();
            await expect(page).toHaveURL("/login");
        });

        test("상품의 구매 버튼을 클릭 시 로그인 페이지로 이동한다", async ({
            page,
        }) => {
            const productCard = getProductCardByIndex(page, 0);

            const cartBtn = productCard.getByRole("button", {
                name: /구매/,
            });
            await cartBtn.click();
            await expect(page).toHaveURL("/login");
        });
    });

    test.describe("로그인 시", () => {
        test.use({ storageState: "playwright/.auth/user.json" });

        test("로그인한 사용자는 장바구니 버튼과 사용자 이름이 노출된다.", async ({
            page,
        }) => {
            await expect(page.getByLabel("장바구니")).toBeVisible();
            await expect(
                page.getByRole("button", { name: /테스트유저1/ }),
            ).toBeVisible();
            await expect(getCartBadge(page)).toHaveText("0");
        });

        test('상품의 장바구니 클릭시 "Handmade Cotton Fish 장바구니 추가 완료!" 알림 메세지가 노출되며, 장바구니에 담긴 수량도 증가한다.', async ({
            page,
        }) => {
            // 현재 경로

            //  expect(page.url()).toBe("http://localhost:5173/") 아래처럼 사용가능
            //  await expect(page).toHaveURL('/') 아래처럼 사용가능
            expect(new URL(page.url()).pathname).toBe("/");
            const productCard = getProductCardByIndex(page, 0);
            const cartBtn = productCard.getByRole("button", {
                name: /장바구니/,
            });

            await cartBtn.click();

            await expect(
                page.getByText("Handmade Cotton Fish 장바구니 추가 완료!"),
            ).toBeVisible();
            await expect(getCartBadge(page)).toHaveText("1");
        });
        test("구매 버튼 클릭시 해당 아이템이 장바구니에 추가되며, 장바구니 페이지로 이동한다", async ({
            page,
        }) => {
            const productCard = getProductCardByIndex(page, 0);
            const purchase = productCard.getByRole("button", {
                name: /구매/,
            });
            const badge = getCartBadge(page);

            await purchase.click();

            await expect(badge).toHaveText("1");
            await expect(page).toHaveURL("/cart");
            await expect(page.getByText("Handmade Cotton Fish")).toBeVisible();
        });
    });
});

test("상품을 클릭할 경우 클릭한 상품의 상세 페이지로 이동한다", async ({
    page,
}) => {
    const productCard = getProductCardByIndex(page, 0);

    await productCard.click();
    await expect(page).toHaveURL(/\/product\/\d+$/);
});
test.describe("상품 필터링", () => {
    test('상품명을 "Handmade Cotton"로 입력하면 해당 상품명을 포함한 상품만 나타난다', async ({
        page,
    }) => {
        const input = page.getByPlaceholder("상품명을 검색하세요");
        await input.fill("Handmade Cotton");

        await assertProductListLength(page, 2);
        const productCard_1 = getProductCardByIndex(page, 0);
        const productCard_2 = getProductCardByIndex(page, 1);

        await expect(productCard_1).toBeVisible();
        await expect(productCard_2).toBeVisible();
    });

    test('카테고리를 "Sports"로 선택할 경우 해당 카테고리 상품만 나타난다.', async ({
        page,
    }) => {
        const radioBtn = page.getByRole("radio", { name: "Sports" });
        await expect(radioBtn).toBeVisible();
        await radioBtn.click();

        const productCardList = page.getByTestId("product-card");
        const texts = await productCardList.allTextContents();
        texts.forEach((text) => {
            expect(text).toContain("Shoes");
        });
    });
    test('최소 가격을 "15", 최대 가격을 "20"로 입력한 경우 해당 금액 사이에 있는 상품이 노출된다', async ({
        page,
    }) => {
        const miniInput = page.getByPlaceholder("최소 금액");
        const maxInput = page.getByPlaceholder("최대 금액");

        await miniInput.fill("15");
        await maxInput.fill("20");

        await assertProductListLength(page, 1);
        const productCard = getProductCardByIndex(page, 0);

        await expect(productCard).toContainText("$19");
    });

    test('상품명 "Handmade", 카테고리 "Shoes", 최소 금액 "750", 최대 금액 "800"로 입력하면 모든 조건을 충족하는 상품만 노출된다', async ({
        page,
    }) => {
        await page.getByPlaceholder("상품명을 검색하세요").fill("Handmade");
        await page.getByRole("radio", { name: "Sports" }).click();
        await page.getByPlaceholder("최소 금액").fill("750");
        await page.getByPlaceholder("최대 금액").fill("800");

        await assertProductListLength(page, 1);
        const product = getProductCardByIndex(page, 0);

        const text = await product.textContent();

        expect(text).toContain("Shoes");

        // 상품가격이 750 ~ 850 사이인지를 assertion
        const priceMatch = text?.match(/\$?(\d+(\.\d+)?)/);
        expect(priceMatch).not.toBeNull();
        const price = Number(priceMatch?.[1]);
        expect(price).toBeGreaterThanOrEqual(750);
        expect(price).toBeLessThanOrEqual(800);

        // 상품명에 Handmade가 있는지 assertion
        expect(text).toContain("Handmade");
    });
});
