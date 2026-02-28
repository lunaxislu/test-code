import { act, renderHook, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import useConfirmModal from "./useConfirmModal";

test("호출 시 initialValue 인자를 지정하지 않은 경우 isModalOpened 상태가 false로 실행된다.", () => {
  const { result } = renderHook(useConfirmModal);
  expect(result.current.isModalOpened).toBe(false);
});

test("호출 시 initialValue 인자를 boolean 값으로 지정하는 경우 해당 값으로 isModalOpened가 지정된다.", () => {
  const { result } = renderHook(() => useConfirmModal(true));
  expect(result.current.isModalOpened).toBe(true);
});

test("훅의 toggleIsModalOpened()를 호출하면 isModalOpened 상태가 toggle된다.", () => {
  const { result } = renderHook(useConfirmModal);
  act(() => {
    result.current.toggleIsModalOpened();
  });
  screen.debug();
  expect(result.current.isModalOpened).toBe(true);
});
