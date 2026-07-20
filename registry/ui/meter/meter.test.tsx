import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Meter } from "./index";
import { describeSlots } from "@/registry/lib/testing-utils";

describe("Meter", () => {
  describe("Root", () => {
    it('renders with data-slot="meter"', () => {
      const { container } = render(<Meter.Root value={50} />);
      expect(container.querySelector('[data-slot="meter"]')).toBeInTheDocument();
    });

    it("merges className into slot", () => {
      const { container } = render(<Meter.Root value={50} className="__test-class__" />);
      expect(container.querySelector('[data-slot="meter"]')).toHaveClass("__test-class__");
    });
  });

  describeSlots(Meter, {
    Root: { slot: "meter", skipRender: true },
    Track: { slot: "meter-track" },
    Indicator: { slot: "meter-indicator" },
    Value: { slot: "meter-value" },
    Label: { slot: "meter-label" },
  }, {
    wrapper: (children) => (
      <Meter.Root value={50}>{children}</Meter.Root>
    ),
  });
});
