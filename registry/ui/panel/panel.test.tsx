import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Panel } from "./index";
import { describeSlots } from "@/registry/lib/testing-utils";

describe("Panel", () => {
  describe("Root", () => {
    it('renders with data-slot="panel"', () => {
      const { container } = render(<Panel.Root />);
      expect(container.querySelector('[data-slot="panel"]')).toBeInTheDocument();
    });

    it("merges className into slot", () => {
      const { container } = render(<Panel.Root className="__test-class__" />);
      expect(container.querySelector('[data-slot="panel"]')).toHaveClass("__test-class__");
    });
  });

  describeSlots(
    Panel,
    {
      Well: { slot: "panel-well" },
    },
    {
      wrapper: (children) => <Panel.Root>{children}</Panel.Root>,
    },
  );
});
