import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { NavigationMenu } from "./index";
import { describeSlots } from "@/registry/lib/testing-utils";

describe("NavigationMenu", () => {
  describe("Root", () => {
    it('renders with data-slot="navigation-menu"', () => {
      const { container } = render(<NavigationMenu.Root />);
      expect(container.querySelector('[data-slot="navigation-menu"]')).toBeInTheDocument();
    });

    it("merges className into slot", () => {
      const { container } = render(<NavigationMenu.Root className="__test-class__" />);
      expect(container.querySelector('[data-slot="navigation-menu"]')).toHaveClass("__test-class__");
    });
  });

  describe("List", () => {
    it('renders with data-slot="navigation-menu-list"', () => {
      const { container } = render(
        <NavigationMenu.Root>
          <NavigationMenu.List />
        </NavigationMenu.Root>
      );
      expect(container.querySelector('[data-slot="navigation-menu-list"]')).toBeInTheDocument();
    });

    it("merges className into slot", () => {
      const { container } = render(
        <NavigationMenu.Root>
          <NavigationMenu.List className="__test-class__" />
        </NavigationMenu.Root>
      );
      expect(container.querySelector('[data-slot="navigation-menu-list"]')).toHaveClass("__test-class__");
    });
  });

  describe("Item", () => {
    it('renders with data-slot="navigation-menu-item"', () => {
      const { container } = render(
        <NavigationMenu.Root>
          <NavigationMenu.List>
            <NavigationMenu.Item />
          </NavigationMenu.List>
        </NavigationMenu.Root>
      );
      expect(container.querySelector('[data-slot="navigation-menu-item"]')).toBeInTheDocument();
    });

    it("merges className into slot", () => {
      const { container } = render(
        <NavigationMenu.Root>
          <NavigationMenu.List>
            <NavigationMenu.Item className="__test-class__" />
          </NavigationMenu.List>
        </NavigationMenu.Root>
      );
      expect(container.querySelector('[data-slot="navigation-menu-item"]')).toHaveClass("__test-class__");
    });
  });

  describeSlots(NavigationMenu, {
    Root: { slot: "navigation-menu", skipRender: true },
    List: {
      slot: "navigation-menu-list",
      wrapper: (children) => (
        <NavigationMenu.Root>{children}</NavigationMenu.Root>
      ),
    },
    Item: {
      slot: "navigation-menu-item",
      wrapper: (children) => (
        <NavigationMenu.Root>
          <NavigationMenu.List>{children}</NavigationMenu.List>
        </NavigationMenu.Root>
      ),
    },
    Trigger: { slot: "navigation-menu-trigger" },
    Icon: { slot: "navigation-menu-icon" },
    Content: {
      slot: "navigation-menu-content",
      wrapper: (children) => (
        <NavigationMenu.Root value="test">
          <NavigationMenu.List>
            <NavigationMenu.Item value="test">
              {children}
            </NavigationMenu.Item>
          </NavigationMenu.List>
          <NavigationMenu.Viewport />
        </NavigationMenu.Root>
      ),
    },
    Link: { slot: "navigation-menu-link" },
    Portal: {
      slot: "navigation-menu-portal",
      wrapper: (children) => (
        <NavigationMenu.Root value="test">
          <NavigationMenu.List>
            <NavigationMenu.Item value="test">
              {children}
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>
      ),
    },
    Backdrop: { slot: "navigation-menu-backdrop" },
    Positioner: {
      slot: "navigation-menu-positioner",
      wrapper: (children) => (
        <NavigationMenu.Root value="test">
          <NavigationMenu.List>
            <NavigationMenu.Item value="test">
              <NavigationMenu.Portal>{children}</NavigationMenu.Portal>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>
      ),
    },
    Popup: {
      slot: "navigation-menu-popup",
      wrapper: (children) => (
        <NavigationMenu.Root value="test">
          <NavigationMenu.List>
            <NavigationMenu.Item value="test">
              <NavigationMenu.Portal>
                <NavigationMenu.Positioner>{children}</NavigationMenu.Positioner>
              </NavigationMenu.Portal>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>
      ),
    },
    Viewport: { slot: "navigation-menu-viewport" },
    Arrow: {
      slot: "navigation-menu-arrow",
      wrapper: (children) => (
        <NavigationMenu.Root value="test">
          <NavigationMenu.List>
            <NavigationMenu.Item value="test">
              <NavigationMenu.Portal>
                <NavigationMenu.Positioner>{children}</NavigationMenu.Positioner>
              </NavigationMenu.Portal>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>
      ),
    },
  }, {
    wrapper: (children) => (
      <NavigationMenu.Root>
        <NavigationMenu.List>
          <NavigationMenu.Item value="test">
            {children}
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>
    ),
  });
});
