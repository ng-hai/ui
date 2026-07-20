import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Collapsible } from "./index";
import { describeSlots } from "@/registry/lib/testing-utils";

describe("Collapsible", () => {
  describe("Root", () => {
    it('renders with data-slot="collapsible"', () => {
      const { container } = render(<Collapsible.Root />);
      expect(container.querySelector('[data-slot="collapsible"]')).toBeInTheDocument();
    });

    it("merges className into slot", () => {
      const { container } = render(<Collapsible.Root className="__test-class__" />);
      expect(container.querySelector('[data-slot="collapsible"]')).toHaveClass("__test-class__");
    });
  });

  describeSlots(Collapsible, {
    Root: { slot: "collapsible", skipRender: true },
    Trigger: { slot: "collapsible-trigger" },
    Panel: { slot: "collapsible-panel" },
  }, {
    wrapper: (children) => (
      <Collapsible.Root defaultOpen>{children}</Collapsible.Root>
    ),
  });
});
