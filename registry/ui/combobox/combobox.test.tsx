import { describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { Combobox, comboboxStyles } from "./index";
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
    Separator: { slot: "combobox-separator" },
    Empty: { slot: "combobox-empty" },
    Status: { slot: "combobox-status" },
  }, {
    wrapper: (children) => (
      <Combobox.Root open>{children}</Combobox.Root>
    ),
  });

  describe("trigger variant", () => {
    it("exposes icon and field modes on Root", () => {
      expect(comboboxStyles.variantKeys).toContain("trigger");
      expect(comboboxStyles.variants.trigger).toEqual({ icon: { trigger: "" }, field: { trigger: "" } });
      expect(comboboxStyles.defaultVariants).toEqual({ trigger: "icon" });
    });

    it("does not leak the variant prop to the DOM", () => {
      render(
        <Combobox.Root trigger="field">
          <Combobox.Trigger />
        </Combobox.Root>,
      );
      expect(document.querySelector("[trigger]")).toBeNull();
    });
  });

  describe("Empty", () => {
    it("renders nothing styled while items match", () => {
      cleanup();
      render(
        <Combobox.Root open items={["a"]}>
          <Combobox.Empty className="p-4">No results</Combobox.Empty>
        </Combobox.Root>,
      );
      const region = document.querySelector('[role="status"]')!;
      expect(region).toBeInTheDocument();
      expect(region).toBeEmptyDOMElement();
      expect(document.querySelector('[data-slot="combobox-empty"]')).toBeNull();
    });

    it("renders the styled slot when the list is empty", () => {
      cleanup();
      render(
        <Combobox.Root open items={[]}>
          <Combobox.Empty className="p-4">No results</Combobox.Empty>
        </Combobox.Root>,
      );
      const el = document.querySelector('[data-slot="combobox-empty"]');
      expect(el).toHaveClass("p-4");
      expect(el).toHaveTextContent("No results");
    });
  });
});
