import { beforeEach, describe } from "node:test";
import { afterAll, expect, test, vi } from "vitest";
import { debounce } from "./utils";

describe("debounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });
  test("특정 시간이 지나면 호출된다.", () => {
    const spy = vi.fn();

    const debounceFn = debounce(spy, 300);

    debounceFn();
    vi.advanceTimersByTime(300);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test("연이어 호출해도 마지막 호출 기준으로 지정된 타이머 시간이 지난 경우에만 함수가 호출된다.", () => {
    const spy = vi.fn();

    const debounceFn = debounce(spy, 300);

    // 최초 호출
    debounceFn();

    // 최초 호출 후 0.1초 후 호출
    vi.advanceTimersByTime(100);
    debounceFn();

    // 위의 두번째 호출 후 0.2초 후 호출
    vi.advanceTimersByTime(200);
    debounceFn();

    // 위의 세번 째 호출 후 0.1초 후 호출
    vi.advanceTimersByTime(100);
    debounceFn();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
