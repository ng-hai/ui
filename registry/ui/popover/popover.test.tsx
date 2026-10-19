import { describe, expect, it } from "vitest";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { Popover } from "./index";
import { describeSlots } from "@/registry/lib/testing-utils";

describe("Popover", () => {
  describeSlots(Popover, {
    Root: { slot: "popover", skipRender: true },
    Trigger: { slot: "popover-trigger" },
    Portal: { slot: "popover-portal" },
    Backdrop: { slot: "popover-backdrop" },
    Positioner: {
      slot: "popover-positioner",
      wrapper: (children) => (
        <Popover.Root open>
          <Popover.Portal>{children}</Popover.Portal>
        </Popover.Root>
      ),
    },
    Popup: {
      slot: "popover-popup",
      wrapper: (children) => (
        <Popover.Root open>
          <Popover.Portal>
            <Popover.Positioner>{children}</Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>
      ),
    },
    Viewport: {
      slot: "popover-viewport",
      wrapper: (children) => (
        <Popover.Root open>
          <Popover.Portal>
            <Popover.Positioner>{children}</Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>
      ),
    },
    Arrow: {
      slot: "popover-arrow",
      wrapper: (children) => (
        <Popover.Root open>
          <Popover.Portal>
            <Popover.Positioner>{children}</Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>
      ),
    },
    Title: { slot: "popover-title" },
    Description: { slot: "popover-description" },
    Close: { slot: "popover-close" },
  }, {
    wrapper: (children) => (
      <Popover.Root open>{children}</Popover.Root>
    ),
  });

  describe("handle", () => {
    it("re-exports the upstream handle API", () => {
      expect(Popover.createHandle).toBe(PopoverPrimitive.createHandle);
      expect(Popover.Handle).toBe(PopoverPrimitive.Handle);
      expect(Popover.createHandle() instanceof Popover.Handle).toBe(true);
    });

    // Compile-time check: a typed handle flows into Root and a detached Trigger.
    it("types the payload across Root and a detached Trigger", () => {
      const handle = Popover.createHandle<{ id: string }>();
      const tree = (
        <>
          <Popover.Trigger handle={handle} payload={{ id: "a" }} />
          {/* @ts-expect-error the payload must match the handle's type */}
          <Popover.Trigger handle={handle} payload={{ id: 1 }} />
          <Popover.Root handle={handle}>{({ payload }) => <output>{payload?.id.toUpperCase()}</output>}</Popover.Root>
        </>
      );
      expect(tree).toBeDefined();
    });
  });
});
