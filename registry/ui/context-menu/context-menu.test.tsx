import { describe } from "vitest";
import { ContextMenu } from "./index";
import { describeSlots } from "@/registry/lib/testing-utils";

describe("ContextMenu", () => {
  describeSlots(ContextMenu, {
    Root: { slot: "context-menu", skipRender: true },
    Trigger: { slot: "context-menu-trigger" },
    SubmenuRoot: { slot: "context-menu-submenu", skipRender: true },
    SubmenuTrigger: {
      slot: "context-menu-submenu-trigger",
      wrapper: (children) => (
        <ContextMenu.Root open>
          <ContextMenu.Portal>
            <ContextMenu.Positioner>
              <ContextMenu.Popup>
                <ContextMenu.SubmenuRoot>{children}</ContextMenu.SubmenuRoot>
              </ContextMenu.Popup>
            </ContextMenu.Positioner>
          </ContextMenu.Portal>
        </ContextMenu.Root>
      ),
    },
    Portal: { slot: "context-menu-portal" },
    Backdrop: { slot: "context-menu-backdrop" },
    Positioner: {
      slot: "context-menu-positioner",
      wrapper: (children) => (
        <ContextMenu.Root open>
          <ContextMenu.Portal>{children}</ContextMenu.Portal>
        </ContextMenu.Root>
      ),
    },
    Popup: {
      slot: "context-menu-popup",
      wrapper: (children) => (
        <ContextMenu.Root open>
          <ContextMenu.Portal>
            <ContextMenu.Positioner>{children}</ContextMenu.Positioner>
          </ContextMenu.Portal>
        </ContextMenu.Root>
      ),
    },
    Arrow: {
      slot: "context-menu-arrow",
      wrapper: (children) => (
        <ContextMenu.Root open>
          <ContextMenu.Portal>
            <ContextMenu.Positioner>{children}</ContextMenu.Positioner>
          </ContextMenu.Portal>
        </ContextMenu.Root>
      ),
    },
    Item: { slot: "context-menu-item" },
    LinkItem: { slot: "context-menu-link-item" },
    Group: { slot: "context-menu-group" },
    GroupLabel: {
      slot: "context-menu-group-label",
      wrapper: (children) => (
        <ContextMenu.Root open>
          <ContextMenu.Group>{children}</ContextMenu.Group>
        </ContextMenu.Root>
      ),
    },
    RadioGroup: { slot: "context-menu-radio-group" },
    RadioItem: {
      slot: "context-menu-radio-item",
      wrapper: (children) => (
        <ContextMenu.Root open>
          <ContextMenu.RadioGroup>{children}</ContextMenu.RadioGroup>
        </ContextMenu.Root>
      ),
    },
    RadioItemIndicator: {
      slot: "context-menu-radio-item-indicator",
      wrapper: (children) => (
        <ContextMenu.Root open>
          <ContextMenu.RadioGroup defaultValue="a">
            <ContextMenu.RadioItem value="a">{children}</ContextMenu.RadioItem>
          </ContextMenu.RadioGroup>
        </ContextMenu.Root>
      ),
    },
    CheckboxItem: { slot: "context-menu-checkbox-item" },
    CheckboxItemIndicator: {
      slot: "context-menu-checkbox-item-indicator",
      wrapper: (children) => (
        <ContextMenu.Root open>
          <ContextMenu.CheckboxItem defaultChecked>{children}</ContextMenu.CheckboxItem>
        </ContextMenu.Root>
      ),
    },
  }, {
    wrapper: (children) => (
      <ContextMenu.Root open>{children}</ContextMenu.Root>
    ),
  });
});
