import { describe } from "vitest";
import { Combobox } from "./index";
import { describeSlots } from "@/registry/lib/testing-utils";

describe("Combobox", () => {
  describeSlots(Combobox, {
    Root: { slot: "combobox", skipRender: true },
    Value: { slot: "combobox-value", skipRender: true },
    Collection: { slot: "combobox-collection", skipRender: true },
    Label: { slot: "combobox-label" },
    Trigger: { slot: "combobox-trigger" },
    Input: { slot: "combobox-input" },
    InputGroup: { slot: "combobox-input-group" },
    Chips: { slot: "combobox-chips" },
    Chip: {
      slot: "combobox-chip",
      wrapper: (children) => (
        <Combobox.Root open multiple defaultValue={["a"]}>
          <Combobox.Chips>{children}</Combobox.Chips>
        </Combobox.Root>
      ),
    },
    ChipRemove: {
      slot: "combobox-chip-remove",
      wrapper: (children) => (
        <Combobox.Root open multiple defaultValue={["a"]}>
          <Combobox.Chips>
            <Combobox.Chip>{children}</Combobox.Chip>
          </Combobox.Chips>
        </Combobox.Root>
      ),
    },
    Clear: {
      slot: "combobox-clear",
      wrapper: (children) => (
        <Combobox.Root open defaultValue="a">{children}</Combobox.Root>
      ),
    },
    Icon: { slot: "combobox-icon" },
    Portal: { slot: "combobox-portal" },
    Backdrop: { slot: "combobox-backdrop" },
    Positioner: {
      slot: "combobox-positioner",
      wrapper: (children) => (
        <Combobox.Root open>
          <Combobox.Portal>{children}</Combobox.Portal>
        </Combobox.Root>
      ),
    },
    Popup: {
      slot: "combobox-popup",
      wrapper: (children) => (
        <Combobox.Root open>
          <Combobox.Portal>
            <Combobox.Positioner>{children}</Combobox.Positioner>
          </Combobox.Portal>
        </Combobox.Root>
      ),
    },
    Arrow: {
      slot: "combobox-arrow",
      wrapper: (children) => (
        <Combobox.Root open>
          <Combobox.Portal>
            <Combobox.Positioner>{children}</Combobox.Positioner>
          </Combobox.Portal>
        </Combobox.Root>
      ),
    },
    List: { slot: "combobox-list" },
    Row: { slot: "combobox-row" },
    Item: { slot: "combobox-item" },
    ItemIndicator: {
      slot: "combobox-item-indicator",
      wrapper: (children) => (
        <Combobox.Root open defaultValue="a">
          <Combobox.Item value="a">{children}</Combobox.Item>
        </Combobox.Root>
      ),
    },
    Group: { slot: "combobox-group" },
    GroupLabel: {
      slot: "combobox-group-label",
      wrapper: (children) => (
        <Combobox.Root open>
          <Combobox.Group>{children}</Combobox.Group>
        </Combobox.Root>
      ),
    },
    Empty: { slot: "combobox-empty" },
    Status: { slot: "combobox-status" },
  }, {
    wrapper: (children) => (
      <Combobox.Root open>{children}</Combobox.Root>
    ),
  });
});
