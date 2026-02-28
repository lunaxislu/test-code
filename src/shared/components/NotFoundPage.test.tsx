import { screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import NotFoundPage from "./NotFoundPage";
import render from "@/test/setup";
const navigateFn = vi.fn();
vi.mock("react-router-dom", async () => {
  const original = await vi.importActual("react-router-dom");

  return {
    ...original,
    useNavigate: () => navigateFn,
  };
});

test('Home으로 이동 버튼을 눌렀을 때 navigate 함수가 "/"과 replace:true를 인자로 받아 호출된다. ', async () => {
  const { user } = render(<NotFoundPage />);
  const btn = screen.getByRole("button", {
    name: "Home으로 이동",
  });

  await user.click(btn);
  expect(navigateFn).toHaveBeenNthCalledWith(1, "/", { replace: true });
});
