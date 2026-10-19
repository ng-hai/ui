import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { Tooltip } from "./index";
import { describeSlots } from "@/registry/lib/testing-utils";

describe("Tooltip", () => {
  describeSlots(Tooltip, {
    Root: { slot: "tooltip", skipRender: true },
    Provider: { slot: "tooltip-provider", skipRender: true },
    // A detached Trigger renders outside Root, so the error comes from Base UI, not the style context.
    Trigger: { slot: "tooltip-trigger", outsideError: "must be either used within" },
    Portal: { slot: "tooltip-portal" },
    Positioner: {
      slot: "tooltip-positioner",
      wrapper: (children) => (
        <Tooltip.Root open>
          <Tooltip.Portal>{children}</Tooltip.Portal>
        </Tooltip.Root>
      ),
    },
    Popup: {
      slot: "tooltip-popup",
      wrapper: (children) => (
        <Tooltip.Root open>
          <Tooltip.Portal>
            <Tooltip.Positioner>{children}</Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      ),
    },
    Viewport: {
      slot: "tooltip-viewport",
      wrapper: (children) => (
        <Tooltip.Root open>
          <Tooltip.Portal>
            <Tooltip.Positioner>{children}</Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      ),
    },
    Arrow: {
      slot: "tooltip-arrow",
      wrapper: (children) => (
        <Tooltip.Root open>
          <Tooltip.Portal>
            <Tooltip.Positioner>{children}</Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      ),
    },
  }, {
    wrapper: (children) => (
      <Tooltip.Root open>{children}</Tooltip.Root>
    ),
  });

  describe("handle", () => {
    it("re-exports the upstream handle API", () => {
      expect(Tooltip.createHandle).toBe(TooltipPrimitive.createHandle);
      expect(Tooltip.Handle).toBe(TooltipPrimitive.Handle);
      expect(Tooltip.createHandle() instanceof Tooltip.Handle).toBe(true);
    });

    it("renders a detached Trigger outside Root", () => {
      const handle = Tooltip.createHandle<{ id: string }>();
      render(
        <>
          <Tooltip.Trigger handle={handle} payload={{ id: "a" }} className="__test-class__">
            Open
          </Tooltip.Trigger>
          <Tooltip.Root handle={handle}>{({ payload }) => <output>{payload?.id.toUpperCase()}</output>}</Tooltip.Root>
        </>,
      );
      const trigger = document.querySelector('[data-slot="tooltip-trigger"]');
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveClass("__test-class__");
    });

    it("rejects a payload that does not match the handle", () => {
      const handle = Tooltip.createHandle<{ id: string }>();
      // @ts-expect-error the payload must match the handle's type
      const tree = <Tooltip.Trigger handle={handle} payload={{ id: 1 }} />;
      expect(tree).toBeDefined();
    });
  });
});
