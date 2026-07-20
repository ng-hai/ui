import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Radio } from "./index";
import { describeSlots } from "@/registry/lib/testing-utils";

describe("Radio", () => {
  describe("Root", () => {
    it('renders with data-slot="radio"', () => {
      const { container } = render(<Radio.Root />);
      expect(container.querySelector('[data-slot="radio"]')).toBeInTheDocument();
    });

    it("merges className into slot", () => {
      const { container } = render(<Radio.Root className="__test-class__" />);
      expect(container.querySelector('[data-slot="radio"]')).toHaveClass("__test-class__");
    });
  });

  describe("Item", () => {
    it('renders with data-slot="radio-item"', () => {
      const { container } = render(
        <Radio.Root>
          <Radio.Item value="test" />
        </Radio.Root>,
      );
      expect(container.querySelector('[data-slot="radio-item"]')).toBeInTheDocument();
    });

    it("merges className into slot", () => {
      const { container } = render(
        <Radio.Root>
          <Radio.Item value="test" className="__test-class__" />
        </Radio.Root>,
      );
      expect(container.querySelector('[data-slot="radio-item"]')).toHaveClass("__test-class__");
    });
  });

  describeSlots(Radio, {
    Root: { slot: "radio", skipRender: true },
    Item: { slot: "radio-item", skipRender: true },
    Indicator: { slot: "radio-indicator" },
  }, {
    wrapper: (children) => (
      <Radio.Root defaultValue="test">
        <Radio.Item value="test">{children}</Radio.Item>
      </Radio.Root>
    ),
  });
});
