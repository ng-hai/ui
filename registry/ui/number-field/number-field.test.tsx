import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { NumberField } from "./index";
import { describeSlots } from "@/registry/lib/testing-utils";

describe("NumberField", () => {
  describe("Root", () => {
    it('renders with data-slot="number-field"', () => {
      const { container } = render(<NumberField.Root />);
      expect(container.querySelector('[data-slot="number-field"]')).toBeInTheDocument();
    });

    it("merges className into slot", () => {
      const { container } = render(<NumberField.Root className="__test-class__" />);
      expect(container.querySelector('[data-slot="number-field"]')).toHaveClass("__test-class__");
    });
  });

  describeSlots(NumberField, {
    Root: { slot: "number-field", skipRender: true },
    Group: { slot: "number-field-group" },
    Increment: { slot: "number-field-increment" },
    Decrement: { slot: "number-field-decrement" },
    Input: { slot: "number-field-input" },
    ScrubArea: { slot: "number-field-scrub-area" },
    ScrubAreaCursor: {
      slot: "number-field-scrub-area-cursor",
      // ScrubAreaCursor only renders during an active pointer scrub interaction.
      skipRender: true,
    },
  }, {
    wrapper: (children) => (
      <NumberField.Root>{children}</NumberField.Root>
    ),
  });
});
