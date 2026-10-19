import { describe, expect, expectTypeOf, it } from "vitest";
import { render } from "@testing-library/react";
import type { Progress as ProgressPrimitive } from "@base-ui/react/progress";
import { Progress } from "./index";
import { describeSlots } from "@/registry/lib/testing-utils";

describe("Progress", () => {
  describe("Root", () => {
    it('renders with data-slot="progress"', () => {
      const { container } = render(<Progress.Root value={50} />);
      expect(container.querySelector('[data-slot="progress"]')).toBeInTheDocument();
    });

    it("merges className into slot", () => {
      const { container } = render(<Progress.Root value={50} className="__test-class__" />);
      expect(container.querySelector('[data-slot="progress"]')).toHaveClass("__test-class__");
    });
  });

  describeSlots(Progress, {
    Root: { slot: "progress", skipRender: true },
    Track: { slot: "progress-track" },
    Indicator: { slot: "progress-indicator" },
    Value: { slot: "progress-value" },
    Label: { slot: "progress-label" },
  }, {
    wrapper: (children) => (
      <Progress.Root value={50}>{children}</Progress.Root>
    ),
  });

  describe("types", () => {
    it("re-exports the upstream Status type", () => {
      expectTypeOf<Progress.Status>().toEqualTypeOf<ProgressPrimitive.Status>();
    });
  });
});
