import { expect, test } from "@playwright/test";

test.describe("로그인 페이지", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/login");
    });

    test('이메일을 입력하지 않고 로그인 버튼을 클릭한 경우 "이메일을 입력해주세요." 경고 메세지가 노출된다.', async ({
        page,
    }) => {
        const form = page.locator("form");

        await form.getByPlaceholder("비밀번호를 입력하세요.").fill("12345");
        await form.getByRole("button", { name: /로그인/ }).click();

        await expect(
            form.getByText("이메일을 입력해주세요."),
        ).toBeVisible();
    });

    test('비밀번호를 입력하지 않고 로그인 버튼을 클릭한 경우 "비밀번호를 입력해주세요." 경고 메세지가 노출된다.', async ({
        page,
    }) => {
        const form = page.locator("form");

        await form.getByPlaceholder("이메일을 입력하세요.").fill("john@mail.com");
        await form.getByRole("button", { name: /로그인/ }).click();

        await expect(
            form.getByText("비밀번호를 입력해주세요."),
        ).toBeVisible();
    });

    test('이메일 형식이 올바르지 않은 경우 "이메일 형식이 올바르지 않습니다." 경고 메세지가 노출된다.', async ({
        page,
    }) => {
        const form = page.locator("form");

        await form.getByPlaceholder("이메일을 입력하세요.").fill("test123");
        await form.getByPlaceholder("비밀번호를 입력하세요.").fill("12345");
        await form.getByRole("button", { name: "로그인" }).click();

        await expect(
            form.getByText("이메일 형식이 올바르지 않습니다."),
        ).toBeVisible();
    });

    test("이메일과 비밀번호를 올바르게 입력한 경우 로그인 요청이 가능하다.", async ({
        page,
    }) => {
        const form = page.locator("form");

        await form
            .getByPlaceholder("이메일을 입력하세요.")
            .fill("test1@example.com");
        await form.getByPlaceholder("비밀번호를 입력하세요.").fill("test1234");

        await expect(
            form.getByRole("button", {
                name: /로그인/,
            }),
        ).toBeEnabled();
    });

    test('로그인 페이지에 진입한 경우 "사용 가능한 유저 리스트" 아코디언이 노출된다.', async ({
        page,
    }) => {
        await expect(page.getByText("사용 가능한 유저 리스트")).toBeVisible();
    });

    test('로그인 페이지에 진입한 경우 아코디언의 "이름", "이메일", "비밀번호" 테이블 헤더가 노출된다.', async ({
        page,
    }) => {
        const thead = page.locator("table thead");

        await expect(thead.getByText("이름")).toBeVisible();
        await expect(thead.getByText("이메일")).toBeVisible();
        await expect(thead.getByText("비밀번호")).toBeVisible();
    });

    test("올바른 이메일과 비밀번호를 입력하고 로그인 버튼을 클릭한 경우 메인 페이지로 이동한다.", async ({
        page,
    }) => {
        const form = page.locator("form");

        await form
            .getByPlaceholder("이메일을 입력하세요.")
            .fill("test1@example.com");
        await form.getByPlaceholder("비밀번호를 입력하세요.").fill("test1234");
        await form.getByRole("button", { name: "로그인" }).click();

        await expect(page).toHaveURL("/");
    });

    test('성공적으로 로그인 되었을 경우 메인 홈 페이지로 이동하며, 사용자 이름 "테스트유저1"와 장바구니 아이콘이 노출된다.', async ({
        page,
    }) => {
        const form = page.locator("form");

        await form
            .getByPlaceholder("이메일을 입력하세요.")
            .fill("test1@example.com");
        await form.getByPlaceholder("비밀번호를 입력하세요.").fill("test1234");
        await form.getByRole("button", { name: "로그인" }).click();

        await expect(page).toHaveURL("/");
        await expect(page.getByText("테스트유저1")).toBeVisible();
        await expect(page.getByTestId("cart-icon")).toBeVisible();
    });
});

test('유저 목록을 불러오는 중인 경우 "불러오는 중..." 메세지가 노출된다.', async ({
    page,
}) => {
    await page.route("http://localhost:3000/users", async (route) => {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        return route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify([]),
        });
    });

    await page.goto("/login");

    const tbody = page.locator("tbody");
    await expect(tbody.getByText("불러오는 중...")).toBeVisible();
});

test("유저 목록 조회에 성공한 경우 사용자 이름, 이메일, 비밀번호 목록이 노출된다.", async ({
    page,
}) => {
    await page.route("http://localhost:3000/users", async (route) => {
        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify([
                {
                    id: 1,
                    name: "테스트 유저",
                    email: "test@test.com",
                    password: "1234567",
                },
            ]),
        });
    });

    await page.goto("/login");

    const table = page.locator("table");

    await expect(table.getByText("이름")).toBeVisible();
    await expect(table.getByText("이메일")).toBeVisible();
    await expect(table.getByText("비밀번호")).toBeVisible();

    await expect(table.getByText("테스트 유저")).toBeVisible();
    await expect(table.getByText("test@test.com")).toBeVisible();
    await expect(table.getByText("1234567")).toBeVisible();
});

test('유저 목록 조회에 실패한 경우 "유저 목록을 불러오지 못했습니다." 메세지가 노출된다.', async ({
    page,
}) => {
    await page.route("http://localhost:3000/users", async (route) => {
        await route.fulfill({
            status: 401,
        });
    });

    await page.goto("/login");

    const tbody = page.locator("tbody");
    await expect(
        tbody.getByText("유저 목록을 불러오지 못했습니다."),
    ).toBeVisible();
});

test('올바르지 않은 이메일 또는 비밀번호를 입력하고 로그인 버튼을 클릭한 경우 "이메일 또는 비밀번호가 잘못되었습니다." 메세지가 노출된다.', () => {});

test("비로그인 상태에서 보호 페이지에 접근한 후 로그인한 경우 원래 접근하려던 페이지로 이동한다.", () => {});
