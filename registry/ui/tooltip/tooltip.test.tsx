import { describe } from "vitest";
import { Tooltip } from "./index";
import { describeSlots } from "@/registry/lib/testing-utils";

describe("Tooltip", () => {
  describeSlots(Tooltip, {
    Root: { slot: "tooltip", skipRender: true },
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
});
