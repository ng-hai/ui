import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Toolbar } from "./index";
import { describeSlots } from "@/registry/lib/testing-utils";

describe("Toolbar", () => {
  describe("Root", () => {
    it('renders with data-slot="toolbar"', () => {
      const { container } = render(<Toolbar.Root />);
      expect(container.querySelector('[data-slot="toolbar"]')).toBeInTheDocument();
    });

    it("merges className into slot", () => {
      const { container } = render(<Toolbar.Root className="__test-class__" />);
      expect(container.querySelector('[data-slot="toolbar"]')).toHaveClass("__test-class__");
    });
  });

  describeSlots(Toolbar, {
    Root: { slot: "toolbar", skipRender: true },
    Group: { slot: "toolbar-group" },
    Button: { slot: "toolbar-button" },
    Link: { slot: "toolbar-link" },
    Input: { slot: "toolbar-input" },
    Separator: { slot: "toolbar-separator" },
  }, {
    wrapper: (children) => (
      <Toolbar.Root>{children}</Toolbar.Root>
    ),
  });
});
