import { describe } from "vitest";
import { Select } from "./index";
import { describeSlots } from "@/registry/lib/testing-utils";

describe("Select", () => {
  describeSlots(Select, {
    Root: { slot: "select", skipRender: true },
    Trigger: { slot: "select-trigger" },
    Value: { slot: "select-value" },
    Icon: { slot: "select-icon" },
    Portal: { slot: "select-portal" },
    Backdrop: { slot: "select-backdrop" },
    Positioner: { slot: "select-positioner" },
    Popup: {
      slot: "select-popup",
      wrapper: (children) => (
        <Select.Root open>
          <Select.Positioner>{children}</Select.Positioner>
        </Select.Root>
      ),
    },
    Item: { slot: "select-item" },
    ItemText: {
      slot: "select-item-text",
      wrapper: (children) => (
        <Select.Root open>
          <Select.Item value="">{children}</Select.Item>
        </Select.Root>
      ),
    },
    ItemIndicator: {
      slot: "select-item-indicator",
      wrapper: (children) => (
        <Select.Root defaultValue="a" open>
          <Select.Item value="a">{children}</Select.Item>
        </Select.Root>
      ),
    },
    Group: { slot: "select-group" },
    GroupLabel: {
      slot: "select-group-label",
      wrapper: (children) => (
        <Select.Root open>
          <Select.Group>{children}</Select.Group>
        </Select.Root>
      ),
    },
    Arrow: {
      slot: "select-arrow",
      wrapper: (children) => (
        <Select.Root open>
          <Select.Positioner alignItemWithTrigger={false}>
            {children}
          </Select.Positioner>
        </Select.Root>
      ),
    },
    Separator: { slot: "select-separator" },
  }, {
    wrapper: (children) => (
      <Select.Root open>{children}</Select.Root>
    ),
  });
});
