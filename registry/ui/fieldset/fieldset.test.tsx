import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Fieldset } from "./index";
import { describeSlots } from "@/registry/lib/testing-utils";

describe("Fieldset", () => {
  describe("Root", () => {
    it('renders with data-slot="fieldset"', () => {
      const { container } = render(<Fieldset.Root />);
      expect(container.querySelector('[data-slot="fieldset"]')).toBeInTheDocument();
    });

    it("merges className into slot", () => {
      const { container } = render(<Fieldset.Root className="__test-class__" />);
      expect(container.querySelector('[data-slot="fieldset"]')).toHaveClass("__test-class__");
    });
  });

  describeSlots(Fieldset, {
    Root: { slot: "fieldset", skipRender: true },
    Legend: { slot: "fieldset-legend" },
  }, {
    wrapper: (children) => (
      <Fieldset.Root>{children}</Fieldset.Root>
    ),
  });
});
