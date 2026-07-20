import { describe } from "vitest";
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
});
