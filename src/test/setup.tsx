import "@testing-library/jest-dom/vitest";
import type { ReactNode } from "react";
import { afterAll, afterEach, beforeEach, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, type MemoryRouterProps } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { setupServer } from "msw/node";
import { handler } from "@/mocks/handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const server = setupServer(...handler);
beforeEach(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
  cleanup();
  vi.clearAllMocks();
});

afterAll(() => {
  server.close();
  vi.resetAllMocks();
});

vi.mock("zustand");

// toast(sooner)를 vitest의 jestdom에서 실행하면 fail이 뜬다. 이유는 matchMedia를 toast가 사용하는데 matchMedia가 없다는 설명이다. 따라서 아래와 같이 해주면 됨

// https://github.com/vitest-dev/vitest/issues/821
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

const customRender = (
  component: ReactNode,
  routerOptions?: MemoryRouterProps,
) => {
  // https://tanstack.com/query/latest/docs/framework/react/guides/testing
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  const user = userEvent.setup();
  return {
    user,
    ...render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter {...routerOptions}>
          {component}
          <Toaster richColors position="top-center" />
        </MemoryRouter>
        ,
      </QueryClientProvider>,
    ),
  };
};

export default customRender;
