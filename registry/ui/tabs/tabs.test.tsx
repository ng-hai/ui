import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Tabs } from "./index";
import { describeSlots } from "@/registry/lib/testing-utils";

describe("Tabs", () => {
  describe("Root", () => {
    it('renders with data-slot="tabs"', () => {
      const { container } = render(<Tabs.Root />);
      expect(container.querySelector('[data-slot="tabs"]')).toBeInTheDocument();
    });

    it("merges className into slot", () => {
      const { container } = render(<Tabs.Root className="__test-class__" />);
      expect(container.querySelector('[data-slot="tabs"]')).toHaveClass("__test-class__");
    });
  });

  describeSlots(Tabs, {
    Root: { slot: "tabs", skipRender: true },
    List: { slot: "tabs-list" },
    Tab: {
      slot: "tabs-tab",
      wrapper: (children) => (
        <Tabs.Root defaultValue="a">
          <Tabs.List>{children}</Tabs.List>
        </Tabs.Root>
      ),
    },
    Indicator: {
      slot: "tabs-indicator",
      wrapper: (children) => (
        <Tabs.Root defaultValue="a">
          <Tabs.List>
            <Tabs.Tab value="a">A</Tabs.Tab>
            {children}
          </Tabs.List>
        </Tabs.Root>
      ),
    },
    Panel: {
      slot: "tabs-panel",
      // Panel only renders when its value matches the active tab.
      // describeSlots can't pass value prop, so tested manually below.
      skipRender: true,
    },
  }, {
    wrapper: (children) => (
      <Tabs.Root defaultValue="a">{children}</Tabs.Root>
    ),
  });

  describe("Tab", () => {
    it('renders with data-slot="tabs-tab"', () => {
      const { container } = render(
        <Tabs.Root defaultValue="a">
          <Tabs.List>
            <Tabs.Tab value="a">A</Tabs.Tab>
          </Tabs.List>
        </Tabs.Root>,
      );
      expect(container.querySelector('[data-slot="tabs-tab"]')).toBeInTheDocument();
    });
  });

  describe("Indicator", () => {
    it('renders with data-slot="tabs-indicator"', () => {
      const { container } = render(
        <Tabs.Root defaultValue="a">
          <Tabs.List>
            <Tabs.Tab value="a">A</Tabs.Tab>
            <Tabs.Indicator />
          </Tabs.List>
        </Tabs.Root>,
      );
      expect(container.querySelector('[data-slot="tabs-indicator"]')).toBeInTheDocument();
    });
  });

  describe("Panel", () => {
    it('renders with data-slot="tabs-panel"', () => {
      const { container } = render(
        <Tabs.Root defaultValue="a">
          <Tabs.Panel value="a">Content</Tabs.Panel>
        </Tabs.Root>,
      );
      expect(container.querySelector('[data-slot="tabs-panel"]')).toBeInTheDocument();
    });
  });
});
