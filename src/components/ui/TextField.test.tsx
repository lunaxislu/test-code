import { expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import TextField from "./TextField";

it("className prop으로 설정한 css class가 적용된다.", () => {
  // 1. TextField 컴포넌트에 대한 className props 테스트 이므로 먼저 테스트 환경을 만들어준다. render하여 TextField 컴포넌트를 렌더링하고 className을 props로 내려준다.
  render(<TextField className="my-class" />);
  // 2. expect와 매처를 통해 의도한 대로 동작하는지 확인한다. getByPlaceholderText를 통해 TextField 컴포넌트를 찾고 toHaveClass를 통해 className이 적용되었는지 확인한다.
  expect(screen.getByPlaceholderText("텍스트를 입력해 주세요.")).toHaveClass(
    "my-class",
  );
});
