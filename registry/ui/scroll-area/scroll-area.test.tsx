import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { ScrollArea } from "./index";
import { describeSlots } from "@/registry/lib/testing-utils";

describe("ScrollArea", () => {
  describe("Root", () => {
    it('renders with data-slot="scroll-area"', () => {
      const { container } = render(<ScrollArea.Root />);
      expect(container.querySelector('[data-slot="scroll-area"]')).toBeInTheDocument();
    });

    it("merges className into slot", () => {
      const { container } = render(<ScrollArea.Root className="__test-class__" />);
      expect(container.querySelector('[data-slot="scroll-area"]')).toHaveClass("__test-class__");
    });
  });

  describe("Content", () => {
    it('renders with data-slot="scroll-area-content"', () => {
      const { container } = render(
        <ScrollArea.Root>
          <ScrollArea.Viewport>
            <ScrollArea.Content />
          </ScrollArea.Viewport>
        </ScrollArea.Root>,
      );
      expect(container.querySelector('[data-slot="scroll-area-content"]')).toBeInTheDocument();
    });

    it("merges className into slot", () => {
      const { container } = render(
        <ScrollArea.Root>
          <ScrollArea.Viewport>
            <ScrollArea.Content className="__test-class__" />
          </ScrollArea.Viewport>
        </ScrollArea.Root>,
      );
      expect(container.querySelector('[data-slot="scroll-area-content"]')).toHaveClass("__test-class__");
    });
  });

  describeSlots(ScrollArea, {
    Root: { slot: "scroll-area", skipRender: true },
    Viewport: { slot: "scroll-area-viewport" },
    Scrollbar: {
      slot: "scroll-area-scrollbar",
      // Scrollbar only renders when content overflows; jsdom has no layout engine.
      skipRender: true,
    },
    Content: {
      slot: "scroll-area-content",
      wrapper: (children) => (
        <ScrollArea.Root>
          <ScrollArea.Viewport>{children}</ScrollArea.Viewport>
        </ScrollArea.Root>
      ),
    },
    Thumb: {
      slot: "scroll-area-thumb",
      // Thumb only renders inside a visible Scrollbar; jsdom has no layout engine.
      skipRender: true,
    },
    Corner: {
      slot: "scroll-area-corner",
      // Corner only renders when both scrollbars are visible; jsdom has no layout engine.
      skipRender: true,
    },
  }, {
    wrapper: (children) => (
      <ScrollArea.Root>{children}</ScrollArea.Root>
    ),
  });
});
