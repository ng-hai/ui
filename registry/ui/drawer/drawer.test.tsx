import { describe, expect, it } from "vitest";
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import { Drawer } from "./index";
import { describeSlots } from "@/registry/lib/testing-utils";

describe("Drawer", () => {
  describeSlots(Drawer, {
    Root: { slot: "drawer", skipRender: true },
    Provider: { slot: "drawer-provider", skipRender: true },
    VirtualKeyboardProvider: { slot: "drawer-virtual-keyboard-provider", skipRender: true },
    Trigger: { slot: "drawer-trigger" },
    Portal: { slot: "drawer-portal" },
    Backdrop: { slot: "drawer-backdrop" },
    Popup: {
      slot: "drawer-popup",
      wrapper: (children) => (
        <Drawer.Root open>
          <Drawer.Portal>{children}</Drawer.Portal>
        </Drawer.Root>
      ),
    },
    SwipeArea: { slot: "drawer-swipe-area" },
    Content: { slot: "drawer-content" },
    Viewport: {
      slot: "drawer-viewport",
      wrapper: (children) => (
        <Drawer.Root open>
          <Drawer.Portal>{children}</Drawer.Portal>
        </Drawer.Root>
      ),
    },
    Title: { slot: "drawer-title" },
    Description: { slot: "drawer-description" },
    Close: { slot: "drawer-close" },
    Indent: { slot: "drawer-indent" },
    IndentBackground: { slot: "drawer-indent-background" },
  }, {
    wrapper: (children) => (
      <Drawer.Root open>{children}</Drawer.Root>
    ),
  });

  describe("handle", () => {
    it("re-exports the upstream handle API", () => {
      expect(Drawer.createHandle).toBe(DrawerPrimitive.createHandle);
      expect(Drawer.Handle).toBe(DrawerPrimitive.Handle);
      expect(Drawer.createHandle() instanceof Drawer.Handle).toBe(true);
    });

    // Compile-time check: a typed handle flows into Root and a detached Trigger.
    it("types the payload across Root and a detached Trigger", () => {
      const handle = Drawer.createHandle<{ id: string }>();
      const tree = (
        <>
          <Drawer.Trigger handle={handle} payload={{ id: "a" }} />
          {/* @ts-expect-error the payload must match the handle's type */}
          <Drawer.Trigger handle={handle} payload={{ id: 1 }} />
          <Drawer.Root handle={handle}>{({ payload }) => <output>{payload?.id.toUpperCase()}</output>}</Drawer.Root>
        </>
      );
      expect(tree).toBeDefined();
    });
  });
});
