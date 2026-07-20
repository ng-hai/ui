import { describe } from "vitest";
import { Drawer } from "./index";
import { describeSlots } from "@/registry/lib/testing-utils";

describe("Drawer", () => {
  describeSlots(Drawer, {
    Root: { slot: "drawer", skipRender: true },
    Provider: { slot: "drawer-provider", skipRender: true },
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
});
