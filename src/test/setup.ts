import "@testing-library/jest-dom/vitest";
import type { ReactNode } from "react";
import { afterEach } from "vitest";
import { cleanup, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

afterEach(() => {
  cleanup();
});

const customRender = (component: ReactNode) => {
  const user = userEvent.setup();
  return {
    user,
    ...render(component),
  };
};

export default customRender;
