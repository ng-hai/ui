import { describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { Autocomplete } from "./index";
import { describeSlots } from "@/registry/lib/testing-utils";

describe("Autocomplete", () => {
  describeSlots(Autocomplete, {
    Root: { slot: "autocomplete", skipRender: true },
    Value: { slot: "autocomplete-value", skipRender: true },
    Collection: { slot: "autocomplete-collection", skipRender: true },
    Trigger: { slot: "autocomplete-trigger" },
    Input: { slot: "autocomplete-input" },
    InputGroup: { slot: "autocomplete-input-group" },
    Icon: { slot: "autocomplete-icon" },
    Clear: {
      slot: "autocomplete-clear",
      wrapper: (children) => (
        <Autocomplete.Root open defaultValue="a">{children}</Autocomplete.Root>
      ),
    },
    Portal: { slot: "autocomplete-portal" },
    Backdrop: { slot: "autocomplete-backdrop" },
    Positioner: {
      slot: "autocomplete-positioner",
      wrapper: (children) => (
        <Autocomplete.Root open>
          <Autocomplete.Portal>{children}</Autocomplete.Portal>
        </Autocomplete.Root>
      ),
    },
    Popup: {
      slot: "autocomplete-popup",
      wrapper: (children) => (
        <Autocomplete.Root open>
          <Autocomplete.Portal>
            <Autocomplete.Positioner>{children}</Autocomplete.Positioner>
          </Autocomplete.Portal>
        </Autocomplete.Root>
      ),
    },
    Arrow: {
      slot: "autocomplete-arrow",
      wrapper: (children) => (
        <Autocomplete.Root open>
          <Autocomplete.Portal>
            <Autocomplete.Positioner>{children}</Autocomplete.Positioner>
          </Autocomplete.Portal>
        </Autocomplete.Root>
      ),
    },
    List: { slot: "autocomplete-list" },
    Row: { slot: "autocomplete-row" },
    Item: { slot: "autocomplete-item" },
    Group: { slot: "autocomplete-group" },
    GroupLabel: {
      slot: "autocomplete-group-label",
      wrapper: (children) => (
        <Autocomplete.Root open>
          <Autocomplete.Group>{children}</Autocomplete.Group>
        </Autocomplete.Root>
      ),
    },
    Separator: { slot: "autocomplete-separator" },
    Empty: { slot: "autocomplete-empty" },
    Status: { slot: "autocomplete-status" },
  }, {
    wrapper: (children) => (
      <Autocomplete.Root open>{children}</Autocomplete.Root>
    ),
  });

  describe("Empty", () => {
    it("renders nothing styled while items match", () => {
      cleanup();
      render(
        <Autocomplete.Root open items={["a"]}>
          <Autocomplete.Empty className="p-4">No results</Autocomplete.Empty>
        </Autocomplete.Root>,
      );
      const region = document.querySelector('[role="status"]')!;
      expect(region).toBeInTheDocument();
      expect(region).toBeEmptyDOMElement();
      expect(document.querySelector('[data-slot="autocomplete-empty"]')).toBeNull();
    });

    it("renders the styled slot when the list is empty", () => {
      cleanup();
      render(
        <Autocomplete.Root open items={[]}>
          <Autocomplete.Empty className="p-4">No results</Autocomplete.Empty>
        </Autocomplete.Root>,
      );
      const el = document.querySelector('[data-slot="autocomplete-empty"]');
      expect(el).toHaveClass("p-4");
      expect(el).toHaveTextContent("No results");
    });
  });
});
