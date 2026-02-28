import "@testing-library/jest-dom/vitest";
import type { ReactNode } from "react";
import { afterAll, afterEach, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

afterAll(() => {
  vi.resetAllMocks();
});

const customRender = (component: ReactNode) => {
  const user = userEvent.setup();
  return {
    user,
    ...render(component),
  };
};

export default customRender;
