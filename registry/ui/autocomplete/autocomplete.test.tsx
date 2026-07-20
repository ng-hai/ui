import { describe } from "vitest";
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
    Empty: { slot: "autocomplete-empty" },
    Status: { slot: "autocomplete-status" },
  }, {
    wrapper: (children) => (
      <Autocomplete.Root open>{children}</Autocomplete.Root>
    ),
  });
});
