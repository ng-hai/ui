import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
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

    it("renders a detached Trigger outside Root", () => {
      const handle = Drawer.createHandle<{ id: string }>();
      render(
        <>
          <Drawer.Trigger handle={handle} payload={{ id: "a" }} className="__test-class__">
            Open
          </Drawer.Trigger>
          <Drawer.Root handle={handle}>{({ payload }) => <output>{payload?.id.toUpperCase()}</output>}</Drawer.Root>
        </>,
      );
      const trigger = document.querySelector('[data-slot="drawer-trigger"]');
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveClass("__test-class__");
    });

    it("rejects a payload that does not match the handle", () => {
      const handle = Drawer.createHandle<{ id: string }>();
      // @ts-expect-error the payload must match the handle's type
      const tree = <Drawer.Trigger handle={handle} payload={{ id: 1 }} />;
      expect(tree).toBeDefined();
    });
  });
});
