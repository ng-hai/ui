import { describe, it, expect } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { createStyleContext } from "./create-style-context";

type MockStyles = { root: () => string };

const { StyleContext, useStyles } = createStyleContext<MockStyles>("TestComponent");

function Consumer() {
  const styles = useStyles();
  return <div data-testid="consumer">{styles.root()}</div>;
}

describe("createStyleContext", () => {
  it("provides styles to consumers via context", () => {
    const mockStyles: MockStyles = { root: () => "test-class" };
    render(
      <StyleContext value={mockStyles}>
        <Consumer />
      </StyleContext>,
    );
    expect(screen.getByTestId("consumer")).toHaveTextContent("test-class");
  });

  it("throws when useStyles is called outside provider", () => {
    expect(() => render(<Consumer />)).toThrow(
      "TestComponent parts must be used within <TestComponent.Root>",
    );
    cleanup();
  });

  it("propagates updated context values", () => {
    const stylesA: MockStyles = { root: () => "class-a" };
    const stylesB: MockStyles = { root: () => "class-b" };

    const { rerender } = render(
      <StyleContext value={stylesA}>
        <Consumer />
      </StyleContext>,
    );
    expect(screen.getByTestId("consumer")).toHaveTextContent("class-a");

    rerender(
      <StyleContext value={stylesB}>
        <Consumer />
      </StyleContext>,
    );
    expect(screen.getByTestId("consumer")).toHaveTextContent("class-b");
  });
});
