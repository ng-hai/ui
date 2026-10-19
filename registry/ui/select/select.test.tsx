import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Select } from "./index";
import { describeSlots } from "@/registry/lib/testing-utils";

describe("Select", () => {
  describeSlots(Select, {
    Root: { slot: "select", skipRender: true },
    Trigger: { slot: "select-trigger" },
    Label: { slot: "select-label" },
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
    List: {
      slot: "select-list",
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

  // The arrows render only while the popup can scroll, and describeSlots can't pass props, so keep them mounted.
  describe.each([
    ["ScrollUpArrow", "select-scroll-up-arrow"],
    ["ScrollDownArrow", "select-scroll-down-arrow"],
  ] as const)("%s", (part, slot) => {
    const Part = Select[part];
    const renderPart = (className?: string) =>
      render(
        <Select.Root open>
          <Select.Positioner>
            <Part keepMounted className={className} />
          </Select.Positioner>
        </Select.Root>,
      );

    it(`renders with data-slot="${slot}"`, () => {
      renderPart();
      expect(document.querySelector(`[data-slot="${slot}"]`)).toBeInTheDocument();
    });

    it("merges className into slot", () => {
      renderPart("__test-class__");
      expect(document.querySelector(`[data-slot="${slot}"]`)).toHaveClass("__test-class__");
    });
  });
});
