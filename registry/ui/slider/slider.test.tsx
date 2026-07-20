import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Slider } from "./index";
import { describeSlots } from "@/registry/lib/testing-utils";

describe("Slider", () => {
  describe("Root", () => {
    it('renders with data-slot="slider"', () => {
      const { container } = render(<Slider.Root />);
      expect(container.querySelector('[data-slot="slider"]')).toBeInTheDocument();
    });

    it("merges className into slot", () => {
      const { container } = render(<Slider.Root className="__test-class__" />);
      expect(container.querySelector('[data-slot="slider"]')).toHaveClass("__test-class__");
    });
  });

  describeSlots(Slider, {
    Root: { slot: "slider", skipRender: true },
    Label: { slot: "slider-label" },
    Value: { slot: "slider-value" },
    Control: { slot: "slider-control" },
    Track: { slot: "slider-track" },
    Thumb: { slot: "slider-thumb" },
    Indicator: { slot: "slider-indicator" },
  }, {
    wrapper: (children) => (
      <Slider.Root>{children}</Slider.Root>
    ),
  });
});
