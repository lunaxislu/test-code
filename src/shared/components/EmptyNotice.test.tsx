import { expect, test, vi } from "vitest";
import render from "@/test/setup";
import EmptyNotice from "./EmptyNotice";
import { screen } from "@testing-library/react";

const navigateFn = vi.fn();

vi.mock("react-router-dom", async () => {
  const original = await vi.importActual("react-router-dom");

  return {
    ...original,
    useNavigate: () => navigateFn,
  };
});

test("홈으로 가기 버튼을 클릭 시 홈 경로로 이동하는 navigate가 실행된다.", async () => {
  const { user } = render(<EmptyNotice />);

  const button = screen.getByRole("link", {
    name: "홈으로 가기",
  });
  await user.click(button);

  expect(navigateFn).toHaveBeenNthCalledWith(1, "/");
});
