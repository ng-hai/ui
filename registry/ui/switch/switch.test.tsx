import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Switch } from "./index";
import { describeSlots } from "@/registry/lib/testing-utils";

describe("Switch", () => {
  describe("Root", () => {
    it('renders with data-slot="switch"', () => {
      const { container } = render(<Switch.Root />);
      expect(container.querySelector('[data-slot="switch"]')).toBeInTheDocument();
    });

    it("merges className into slot", () => {
      const { container } = render(<Switch.Root className="__test-class__" />);
      expect(container.querySelector('[data-slot="switch"]')).toHaveClass("__test-class__");
    });
  });

  describeSlots(Switch, {
    Root: { slot: "switch", skipRender: true },
    Thumb: { slot: "switch-thumb" },
  }, {
    wrapper: (children) => (
      <Switch.Root>{children}</Switch.Root>
    ),
  });
});
