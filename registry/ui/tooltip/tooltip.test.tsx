import { describe, expect, it } from "vitest";
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { Tooltip } from "./index";
import { describeSlots } from "@/registry/lib/testing-utils";

describe("Tooltip", () => {
  describeSlots(Tooltip, {
    Root: { slot: "tooltip", skipRender: true },
    Provider: { slot: "tooltip-provider", skipRender: true },
    Trigger: { slot: "tooltip-trigger" },
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

    // Compile-time check: a typed handle flows into Root and a detached Trigger.
    it("types the payload across Root and a detached Trigger", () => {
      const handle = Tooltip.createHandle<{ id: string }>();
      const tree = (
        <>
          <Tooltip.Trigger handle={handle} payload={{ id: "a" }} />
          {/* @ts-expect-error the payload must match the handle's type */}
          <Tooltip.Trigger handle={handle} payload={{ id: 1 }} />
          <Tooltip.Root handle={handle}>{({ payload }) => <output>{payload?.id.toUpperCase()}</output>}</Tooltip.Root>
        </>
      );
      expect(tree).toBeDefined();
    });
  });
});
