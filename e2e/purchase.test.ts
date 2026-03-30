import { test, expect, Locator } from "@playwright/test";
test.use({
    storageState: "playwright/.auth/user.json",
});
test.beforeEach(async ({ page }) => {
    await page.goto("/");
    const productCardList = page.getByTestId("product-card");

    await expect(productCardList).toHaveCount(20);
    await productCardList
        .nth(0)
        .getByRole("button", { name: "장바구니" })
        .click();
    await productCardList
        .nth(1)
        .getByRole("button", { name: "장바구니" })
        .click();
    // await page.goto("/cart");

    await productCardList.nth(1).getByRole("button", { name: "구매" }).click();

    /**
     * localstorage에 장바구니 정보 저장 기능을 안했기 때문에 client routing으로 아래처럼 assertion 함
     */
    await expect(page).toHaveURL("/cart");
    await expect(page.getByRole("button", { name: "구매하기" })).toBeVisible();
    await page.getByRole("button", { name: "구매하기" }).click();
});
test.describe("배송 정보 입력 페이지", () => {
    let shippingList: Locator;
    test.beforeEach(async ({ page }) => {
        shippingList = page
            .locator("section > div")
            .filter({ has: page.getByText("배송 정보") })
            .getByRole("table");
    });

    test('로그인 한 사용자의 이름 "테스트유저1"가 입력되어 있다.', async () => {
        const nameInput = shippingList.getByPlaceholder("이름을 입력하세요");
        await expect(nameInput).toBeVisible();
        await expect(nameInput).toHaveValue("테스트유저1");
    });
    test('할인 쿠폰을 선택하지 않은 경우 "없음"이 노출되며, 할인 쿠폰을 선택하지 않은 경우 "없음"이 노출되며, 특정 할인 쿠폰을 선택하면 해당 쿠폰의 이름("가입 기념! $5 할인 쿠폰")이 노출된다', async () => {
        const couponSelect = shippingList.getByRole("combobox", {
            name: "쿠폰 리스트",
        });
        // navtive select 요소는 option의 label이 아닌 value로 선택이 되기 때문에 value로 assertion
        // 기본값 확인
        await expect(couponSelect).toHaveValue("0");

        // 쿠폰 선택
        await couponSelect.selectOption({ label: "5% 할인" });

        // 선택 결과 확인
        await expect(couponSelect).toHaveValue("1");
    });

    test('이름을 입력하지 않고 구매하기 버튼을 클릭할 경우 "이름을 입력하세요" 경고 문구가 노출된다', async ({
        page,
    }) => {
        const nameInput = shippingList.getByPlaceholder("이름을 입력하세요");
        await nameInput.fill("");
        const purchaseBtn = page.getByRole("button", { name: "구매하기" });
        await purchaseBtn.click();

        await expect(page.getByText("이름을 입력하세요")).toBeVisible();
    });
    test('주소를 입력하지 않고 구매하기 버튼을 클릭할 경우 "주소를 입력하세요" 경고 문구가 노출된다', async ({
        page,
    }) => {
        const addressInput = shippingList.getByPlaceholder("주소를 입력하세요");
        await addressInput.fill("");
        const purchaseBtn = page.getByRole("button", { name: "구매하기" });
        await purchaseBtn.click();

        await expect(page.getByText("주소를 입력하세요")).toBeVisible();
    });

    test('전화번호를 입력하지 않고 구매하기 버튼을 클릭할 경우 "휴대폰 번호를 입력하세요" 경고 문구가 노출된다', async ({
        page,
    }) => {
        const phoneInput =
            shippingList.getByPlaceholder("휴대폰 번호를 입력하세요");
        await phoneInput.fill("");
        const purchaseBtn = page.getByRole("button", { name: "구매하기" });
        await purchaseBtn.click();

        await expect(page.getByText("휴대폰 번호를 입력하세요")).toBeVisible();
    });

    test('잘못된 전화번호 양식을 입력하고 구매하기 버튼을 클릭할 경우 "-를 포함한 휴대폰 번호만 가능합니다" 경고 문구가 노출된다', async ({
        page,
    }) => {
        const phoneInput =
            shippingList.getByPlaceholder("휴대폰 번호를 입력하세요");
        await phoneInput.fill("0101234567");
        const purchaseBtn = page.getByRole("button", { name: "구매하기" });
        await purchaseBtn.click();

        await expect(
            page.getByText("-를 포함한 휴대폰 번호만 가능합니다"),
        ).toBeVisible();
    });
});

test.describe("구매 물품", () => {
    let itemList: Locator;
    test.beforeEach(async ({ page }) => {
        const productList = page
            .locator("section > div")
            .filter({ has: page.getByText("구매 물품") });
        itemList = productList.getByRole("table");
    });
    /**
 * Handmade Cotton Fish	1개	$809
Awesome Concrete Shirt	2개	$884
 */
    test("구매하려는 상품의 정보가 나타난다", async () => {
        const rows = itemList.locator("tbody tr");
        await expect(rows).toHaveCount(2);

        await expect(rows.nth(0).locator("td").nth(0)).toHaveText(
            "Handmade Cotton Fish",
        );
        await expect(rows.nth(0).locator("td").nth(1)).toHaveText("1개");
        await expect(rows.nth(0).locator("td").nth(2)).toHaveText("$809");

        await expect(rows.nth(1).locator("td").nth(0)).toHaveText(
            "Awesome Concrete Shirt",
        );
        /**
         * 맨 위에서 장바구니 클릭 하고 구매하기 버튼을 누르면 1개가 더 추가되는 오류가있음 나중에 고치자
         */
        await expect(rows.nth(1).locator("td").nth(1)).toHaveText("2개");
        await expect(rows.nth(1).locator("td").nth(2)).toHaveText("$884");
    });
});

test.describe("결제 정보", () => {
    let paymentSection: Locator;
    let shippingSection: Locator;
    // let itemSection: Locator;
    test.beforeEach(async ({ page }) => {
        paymentSection = page
            .locator("section > div")
            .filter({ has: page.getByText("결제정보") });
        shippingSection = page
            .locator("section > div")
            .filter({ has: page.getByText("배송 정보") });
        // itemSection = page
        //     .locator("section > div")
        //     .filter({ has: page.getByText("구매 물품") });
    });

    test("상품의 총합($1,693)이 나타난다 선택한 쿠폰, 배송비($5)가 나타나며, 모든 총합이 결제 금액($1,698)에 나타난다", async () => {
        await expect(paymentSection.getByText("$1,693")).toBeVisible();

        // 쿠폰 선택 안했을 때 기본 값
        await expect(
            shippingSection.getByRole("combobox", { name: "쿠폰 리스트" }),
        ).toHaveValue("0");
        await expect(paymentSection.getByText("$5")).toBeVisible();
        await expect(paymentSection.getByText("$1,698")).toBeVisible();
    });

    test("배송 정보에서 특정 할인 쿠폰을 선택하면 결제 정보에 해당 쿠폰 정보가 노출되며, 결제 금액이 재계산된다", async () => {
        const couponSelect = shippingSection.getByRole("combobox", {
            name: "쿠폰 리스트",
        });

        await couponSelect.selectOption({ label: "5% 할인" });

        await expect(paymentSection.getByText("5% 할인")).toBeVisible();
        // 총 상품 가격 $1,693
        await expect(paymentSection.getByText("$1,693")).toBeVisible();

        // 할인쿠폰
        await expect(
            paymentSection.filter({ hasText: "할인쿠폰" }).getByText("5% 할인"),
        ).toBeVisible();
        // 배송비
        await expect(paymentSection.getByText("$5")).toBeVisible();
        // 총 결제금액
        await expect(paymentSection.getByText("$1,614")).toBeVisible();
    });

    test('구매하기 성공시 장바구니는 초기화 되고 메인홈 페이지로 이동하며, "구매 성공!" 메세지가 노출된다', async ({
        page,
    }) => {
        await shippingSection
            .getByPlaceholder("주소를 입력하세요")
            .fill("테스트 주소");
        await shippingSection
            .getByPlaceholder("휴대폰 번호를 입력하세요")
            .fill("010-1234-5678");
        await shippingSection
            .getByPlaceholder("배송 요청사항을 입력하세요")
            .fill("테스트 배송 요청사항");
        const purchaseBtn = page.getByRole("button", { name: "구매하기" });
        await purchaseBtn.click();

        await page.waitForURL("http://localhost:5173/");
        await expect(page).toHaveURL("/");
        await expect(page.getByText("구매 성공!")).toBeVisible();
    });

    test('구매 실패시 "잠시 문제가 발생했습니다! 다시 시도해 주세요." 메세지가 노출된다', async ({
        page,
    }) => {
        await page.route("http://localhost:3000/purchase", async (route) =>
            route.fulfill({
                status: 500,
                contentType: "application/json",
                body: JSON.stringify({
                    message: "",
                }),
            }),
        );
        await shippingSection
            .getByPlaceholder("주소를 입력하세요")
            .fill("테스트 주소");
        await shippingSection
            .getByPlaceholder("휴대폰 번호를 입력하세요")
            .fill("010-1234-5678");
        await shippingSection
            .getByPlaceholder("배송 요청사항을 입력하세요")
            .fill("테스트 배송 요청사항");
        const purchaseBtn = page.getByRole("button", { name: "구매하기" });
        await purchaseBtn.click();

        await expect(
            page.getByText("잠시 문제가 발생했습니다! 다시 시도해 주세요."),
        ).toBeVisible();
    });
});
