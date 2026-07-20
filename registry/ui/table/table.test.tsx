import { describe, it, expect } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { Table } from "./index";
import { describeSlots } from "@/registry/lib/testing-utils";

describe("Table", () => {
  describe("Root", () => {
    it('renders with data-slot="table"', () => {
      const { container } = render(<Table.Root />);
      expect(container.querySelector('[data-slot="table"]')).toBeInTheDocument();
    });

    it("merges className into slot", () => {
      const { container } = render(<Table.Root className="__test-class__" />);
      expect(container.querySelector('[data-slot="table"]')).toHaveClass("__test-class__");
    });
  });

  describeSlots(Table, {
    Root: { slot: "table", skipRender: true },
    Caption: { slot: "table-caption" },
    Header: { slot: "table-header" },
    Body: { slot: "table-body" },
    Footer: { slot: "table-footer" },
    Row: { slot: "table-row" },
    HeaderCell: { slot: "table-header-cell" },
    Cell: { slot: "table-cell" },
    RowGroup: { slot: "table-row-group" },
    ExpandTrigger: {
      slot: "table-expand-trigger",
      wrapper: (children) => (
        <Table.Root>
          <Table.RowGroup>{children}</Table.RowGroup>
        </Table.Root>
      ),
    },
    PanelRow: {
      slot: "table-panel-row",
      wrapper: (children) => (
        <Table.Root>
          <Table.RowGroup defaultOpen>{children}</Table.RowGroup>
        </Table.Root>
      ),
    },
    PanelCell: { slot: "table-panel-cell" },
  }, {
    wrapper: (children) => <Table.Root>{children}</Table.Root>,
  });

  describe("expandable rows", () => {
    it("renders RowGroup as a tbody and toggles the panel row via the trigger", () => {
      const { container, getByRole } = render(
        <Table.Root>
          <Table.RowGroup>
            <Table.Row>
              <Table.Cell>Invoice #42</Table.Cell>
              <Table.Cell>
                <Table.ExpandTrigger>Toggle</Table.ExpandTrigger>
              </Table.Cell>
            </Table.Row>
            <Table.PanelRow>
              <Table.PanelCell colSpan={2}>Detail</Table.PanelCell>
            </Table.PanelRow>
          </Table.RowGroup>
        </Table.Root>,
      );

      const rowGroup = container.querySelector('[data-slot="table-row-group"]');
      expect(rowGroup?.tagName).toBe("TBODY");

      const trigger = getByRole("button");
      expect(trigger).toHaveAttribute("aria-expanded", "false");
      expect(container.querySelector('[data-slot="table-panel-row"]')).not.toBeInTheDocument();

      fireEvent.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "true");
      const panelRow = container.querySelector('[data-slot="table-panel-row"]');
      expect(panelRow).toBeInTheDocument();
      expect(panelRow?.tagName).toBe("TR");
    });
  });
});
