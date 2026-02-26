import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import TextField from "./TextField";
import userEvent from "@testing-library/user-event";

describe("TextField의 props에 대한 검증 - className, placeholder, onChange,onFocus, borderonFocus", () => {
  it("className prop으로 설정한 css class가 적용된다.", () => {
    // 1. TextField 컴포넌트에 대한 className props 테스트 이므로 먼저 테스트 환경을 만들어준다. render하여 TextField 컴포넌트를 렌더링하고 className을 props로 내려준다.
    render(<TextField className="my-class" />);
    // 2. expect와 매처를 통해 의도한 대로 동작하는지 확인한다. getByPlaceholderText를 통해 TextField 컴포넌트를 찾고 toHaveClass를 통해 className이 적용되었는지 확인한다.
    expect(screen.getByPlaceholderText("텍스트를 입력해 주세요.")).toHaveClass(
      "my-class",
    );
  });

  it("placeholder prop에 따라 placeholder가 변경된다.", () => {
    render(<TextField placeholder="test" />);
    const input = screen.getByPlaceholderText("test");
    expect(input).toBeInTheDocument();
  });

  it("텍스트를 입력하면 onChange prop으로 등록한 함수가 호출된다.", async () => {
    const spy = vi.fn();
    const user = userEvent.setup();
    render(<TextField onChange={spy} />);
    const input = screen.getByPlaceholderText("텍스트를 입력해 주세요.");
    await user.type(input, "test");
    expect(spy).toHaveBeenCalledWith("test");
  });

  it("엔텈티를 입력하면 onEnter prop으로 등록한 함수가 호출된다.", async () => {
    const spy = vi.fn();
    const user = userEvent.setup();
    render(<TextField onEnter={spy} />);
    const input = screen.getByPlaceholderText("텍스트를 입력해 주세요.");
    await user.type(input, "test{Enter}");
    expect(spy).toHaveBeenCalledWith("test");
  });

  it("포커스가 활성화 되면 onFocus prop으로 등록한 함수가 호출된다.", async () => {
    const spy = vi.fn();
    const user = userEvent;
    render(<TextField onFocus={spy} />);
    const input = screen.getByPlaceholderText("텍스트를 입력해 주세요.");
    await user.click(input);
    expect(spy).toHaveBeenCalled();
  });

  it("포커스가 활성화되면 border class 스타일이 추가된다.", async () => {
    const user = userEvent;
    render(<TextField />);

    const input = screen.getByPlaceholderText("텍스트를 입력해 주세요.");
    await user.click(input);
    expect(input).toHaveClass("border-blue-700 border-2");
  });
});
