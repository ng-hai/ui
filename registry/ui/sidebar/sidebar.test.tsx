import { describe, it, expect } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { Sidebar } from "./index";
import { describeSlots } from "@/registry/lib/testing-utils";

describe("Sidebar", () => {
  describe("Root", () => {
    it('renders with data-slot="sidebar"', () => {
      const { container } = render(<Sidebar.Root />);
      expect(container.querySelector('[data-slot="sidebar"]')).toBeInTheDocument();
    });

    it("merges className into slot", () => {
      const { container } = render(<Sidebar.Root className="__test-class__" />);
      expect(container.querySelector('[data-slot="sidebar"]')).toHaveClass("__test-class__");
    });
  });

  describeSlots(Sidebar, {
    Header: { slot: "sidebar-header" },
    Content: { slot: "sidebar-content" },
    Footer: { slot: "sidebar-footer" },
    Group: { slot: "sidebar-group" },
    GroupLabel: { slot: "sidebar-group-label" },
    GroupTrigger: {
      slot: "sidebar-group-trigger",
      wrapper: (children) => (
        <Sidebar.Root>
          <Sidebar.Group>{children}</Sidebar.Group>
        </Sidebar.Root>
      ),
    },
    GroupContent: {
      slot: "sidebar-group-content",
      wrapper: (children) => (
        <Sidebar.Root>
          <Sidebar.Group>{children}</Sidebar.Group>
        </Sidebar.Root>
      ),
    },
    Item: { slot: "sidebar-item" },
    ItemIcon: { slot: "sidebar-item-icon" },
    ItemLabel: { slot: "sidebar-item-label" },
    ItemBadge: { slot: "sidebar-item-badge" },
    Separator: { slot: "sidebar-separator" },
  }, {
    wrapper: (children) => <Sidebar.Root>{children}</Sidebar.Root>,
  });

  describe("collapsible groups", () => {
    it("renders Group as a section, open by default, and toggles via the trigger", () => {
      const { container, getByRole } = render(
        <Sidebar.Root>
          <Sidebar.Group>
            <Sidebar.GroupTrigger>Platform</Sidebar.GroupTrigger>
            <Sidebar.GroupContent>
              <Sidebar.Item href="/home">Home</Sidebar.Item>
            </Sidebar.GroupContent>
          </Sidebar.Group>
        </Sidebar.Root>,
      );

      const group = container.querySelector('[data-slot="sidebar-group"]');
      expect(group?.tagName).toBe("SECTION");

      const trigger = getByRole("button");
      expect(trigger).toHaveAttribute("aria-expanded", "true");
      expect(container.querySelector('[data-slot="sidebar-group-content"]')).toBeInTheDocument();

      fireEvent.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "false");
      expect(container.querySelector('[data-slot="sidebar-group-content"]')).not.toBeInTheDocument();
    });

    it("respects defaultOpen={false}", () => {
      const { container } = render(
        <Sidebar.Root>
          <Sidebar.Group defaultOpen={false}>
            <Sidebar.GroupTrigger>Archive</Sidebar.GroupTrigger>
            <Sidebar.GroupContent>
              <Sidebar.Item href="/2024">2024</Sidebar.Item>
            </Sidebar.GroupContent>
          </Sidebar.Group>
        </Sidebar.Root>,
      );

      expect(container.querySelector('[data-slot="sidebar-group-content"]')).not.toBeInTheDocument();
    });
  });

  describe("Item", () => {
    it("renders an anchor by default", () => {
      const { container } = render(
        <Sidebar.Root>
          <Sidebar.Item href="/home">Home</Sidebar.Item>
        </Sidebar.Root>,
      );
      const item = container.querySelector('[data-slot="sidebar-item"]');
      expect(item?.tagName).toBe("A");
      expect(item).toHaveAttribute("href", "/home");
    });

    it('sets aria-current="page" and data-active when active', () => {
      const { container } = render(
        <Sidebar.Root>
          <Sidebar.Item href="/home" active>
            Home
          </Sidebar.Item>
          <Sidebar.Item href="/inbox">Inbox</Sidebar.Item>
        </Sidebar.Root>,
      );
      const [home, inbox] = container.querySelectorAll('[data-slot="sidebar-item"]');
      expect(home).toHaveAttribute("aria-current", "page");
      expect(home).toHaveAttribute("data-active");
      expect(inbox).not.toHaveAttribute("aria-current");
      expect(inbox).not.toHaveAttribute("data-active");
    });

    it("swaps the rendered element via the render prop", () => {
      const { container } = render(
        <Sidebar.Root>
          <Sidebar.Item render={<button type="button" />}>Log out</Sidebar.Item>
        </Sidebar.Root>,
      );
      expect(container.querySelector('[data-slot="sidebar-item"]')?.tagName).toBe("BUTTON");
    });
  });
});
