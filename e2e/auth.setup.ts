import { readFile } from "node:fs/promises";

import { test as setup, expect } from "@playwright/test";

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
    const email = "test1@example.com";
    const password = "test1234";

    await page.goto("/login");

    const form = page.locator("form");
    await form.getByPlaceholder("이메일을 입력하세요.").fill(email);
    await form.getByPlaceholder("비밀번호를 입력하세요.").fill(password);
    await form.getByRole("button", { name: "로그인" }).click();

    await expect(page).toHaveURL("/");
    await expect(
        page.getByRole("button", { name: /테스트유저1/ }),
    ).toBeVisible();

    await page.context().storageState({ path: authFile });

    const storageState = JSON.parse(await readFile(authFile, "utf8")) as {
        cookies?: Array<{ name: string }>;
    };

    expect(
        storageState.cookies?.some(({ name }) => name === "access_token"),
    ).toBe(true);
});
