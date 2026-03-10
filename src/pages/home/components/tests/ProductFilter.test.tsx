import { expect, test, vi, beforeEach } from "vitest";
import render from "@/test/setup";
import ProductFilter from "../ProductFilter";
import { screen } from "@testing-library/react";

import { mockUseFilterStore } from "@/test/mockStore";

const setMinPriceFn = vi.fn();
const setMaxPriceFn = vi.fn();
const setTitleFn = vi.fn();

beforeEach(() => {
  // 강의와는 달리 Controlled을 사용하고 있기 때문(value값이 state/not dom)에 mockImplementation사용
  setMinPriceFn.mockImplementation((value) => {
    mockUseFilterStore({ minPrice: value });
  });
  setMaxPriceFn.mockImplementation((value) => {
    mockUseFilterStore({ maxPrice: value });
  });
  mockUseFilterStore({
    setMaxPrice: setMaxPriceFn,
    setMinPrice: setMinPriceFn,
    setTitle: setTitleFn,
  });
});

test("카테고리 목록을 가져온 후 카테고리 필드의 정보들이 올바르게 렌더링된다.", async () => {
  render(<ProductFilter />);

  expect(await screen.findByLabelText("category1")).toBeInTheDocument();
  expect(await screen.findByLabelText("category2")).toBeInTheDocument();
  expect(await screen.findByLabelText("category3")).toBeInTheDocument();
});

test("상품명을 수정하는 경우 setTitle 액션이 호출된다.", async () => {
  vi.useFakeTimers({ shouldAdvanceTime: true });

  const { user } = render(<ProductFilter />); // customRender의 user 재사용

  const searchInput = screen.getByPlaceholderText("상품명을 검색하세요");
  await user.type(searchInput, "test");

  expect(setTitleFn).not.toHaveBeenCalled();

  vi.advanceTimersByTime(300);
  expect(setTitleFn).toHaveBeenCalledWith("test");

  vi.useRealTimers();
});

test("카테고리를 클릭 할 경우의 클릭한 카테고리가 체크된다.", async () => {
  const { user } = render(<ProductFilter />);

  const [first] = await screen.findAllByRole("radio");
  await user.click(first);

  expect(first).toBeChecked();
});

test("최소 가격 또는 최대 가격을 수정하면 setMinPrice과 setMaxPrice 액션이 호출된다.", async () => {
  const { user } = render(<ProductFilter />);
  const minInput = screen.getByPlaceholderText("최소 금액");
  const maxInput = screen.getByPlaceholderText("최대 금액");

  await user.type(minInput, "100");
  expect(setMinPriceFn).toHaveBeenCalledWith("100");

  await user.type(maxInput, "800");
  expect(setMaxPriceFn).toHaveBeenCalledWith("800");
});
