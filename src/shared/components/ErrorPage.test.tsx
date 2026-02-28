import { expect, test, vi } from "vitest";
import render from "@/test/setup";
import ErrorPage from "./ErrorPage";
import { screen } from "@testing-library/react";
const spy = vi.fn();
vi.mock("react-router-dom", async () => {
  const original = vi.importActual("react-router-dom");
  return {
    ...original,
    useNavigate: () => spy,
  };
});
test("뒤로 이동 버튼 클릭시 뒤로 이동하는 navigate(-1) 함수가 호출된다", async () => {
  const { user } = render(<ErrorPage />);

  const button = screen.getByRole("button");
  await user.click(button);

  expect(spy).toHaveBeenNthCalledWith(1, -1);
});
