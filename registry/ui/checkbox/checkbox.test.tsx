import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Checkbox } from "./index";
import { describeSlots } from "@/registry/lib/testing-utils";

describe("Checkbox", () => {
  describe("Root", () => {
    it('renders with data-slot="checkbox"', () => {
      const { container } = render(<Checkbox.Root />);
      expect(container.querySelector('[data-slot="checkbox"]')).toBeInTheDocument();
    });

    it("merges className into slot", () => {
      const { container } = render(<Checkbox.Root className="__test-class__" />);
      expect(container.querySelector('[data-slot="checkbox"]')).toHaveClass("__test-class__");
    });
  });

  describeSlots(Checkbox, {
    Root: { slot: "checkbox", skipRender: true },
    Indicator: { slot: "checkbox-indicator" },
  }, {
    wrapper: (children) => (
      <Checkbox.Root defaultChecked>{children}</Checkbox.Root>
    ),
  });
});
