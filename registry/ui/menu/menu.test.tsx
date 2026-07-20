import { describe } from "vitest";
import { Menu } from "./index";
import { describeSlots } from "@/registry/lib/testing-utils";

describe("Menu", () => {
  describeSlots(Menu, {
    Root: { slot: "menu", skipRender: true },
    SubmenuRoot: { slot: "menu-submenu", skipRender: true },
    Trigger: { slot: "menu-trigger" },
    SubmenuTrigger: {
      slot: "menu-submenu-trigger",
      wrapper: (children) => (
        <Menu.Root open>
          <Menu.Portal>
            <Menu.Positioner>
              <Menu.Popup>
                <Menu.SubmenuRoot>{children}</Menu.SubmenuRoot>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      ),
    },
    Portal: { slot: "menu-portal" },
    Backdrop: { slot: "menu-backdrop" },
    Positioner: {
      slot: "menu-positioner",
      wrapper: (children) => (
        <Menu.Root open>
          <Menu.Portal>{children}</Menu.Portal>
        </Menu.Root>
      ),
    },
    Popup: {
      slot: "menu-popup",
      wrapper: (children) => (
        <Menu.Root open>
          <Menu.Portal>
            <Menu.Positioner>{children}</Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      ),
    },
    Viewport: {
      slot: "menu-viewport",
      wrapper: (children) => (
        <Menu.Root open>
          <Menu.Portal>
            <Menu.Positioner>{children}</Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      ),
    },
    Arrow: {
      slot: "menu-arrow",
      wrapper: (children) => (
        <Menu.Root open>
          <Menu.Portal>
            <Menu.Positioner>{children}</Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      ),
    },
    Item: { slot: "menu-item" },
    LinkItem: { slot: "menu-link-item" },
    Group: { slot: "menu-group" },
    GroupLabel: {
      slot: "menu-group-label",
      wrapper: (children) => (
        <Menu.Root open>
          <Menu.Group>{children}</Menu.Group>
        </Menu.Root>
      ),
    },
    RadioGroup: { slot: "menu-radio-group" },
    RadioItem: {
      slot: "menu-radio-item",
      wrapper: (children) => (
        <Menu.Root open>
          <Menu.RadioGroup>{children}</Menu.RadioGroup>
        </Menu.Root>
      ),
    },
    RadioItemIndicator: {
      slot: "menu-radio-item-indicator",
      wrapper: (children) => (
        <Menu.Root open>
          <Menu.RadioGroup defaultValue="a">
            <Menu.RadioItem value="a">{children}</Menu.RadioItem>
          </Menu.RadioGroup>
        </Menu.Root>
      ),
    },
    CheckboxItem: { slot: "menu-checkbox-item" },
    CheckboxItemIndicator: {
      slot: "menu-checkbox-item-indicator",
      wrapper: (children) => (
        <Menu.Root open>
          <Menu.CheckboxItem defaultChecked>{children}</Menu.CheckboxItem>
        </Menu.Root>
      ),
    },
  }, {
    wrapper: (children) => (
      <Menu.Root open>{children}</Menu.Root>
    ),
  });
});
