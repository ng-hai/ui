import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Accordion } from "./index";
import { describeSlots } from "@/registry/lib/testing-utils";

describe("Accordion", () => {
  describe("Root", () => {
    it('renders with data-slot="accordion"', () => {
      const { container } = render(<Accordion.Root />);
      expect(container.querySelector('[data-slot="accordion"]')).toBeInTheDocument();
    });

    it("merges className into slot", () => {
      const { container } = render(<Accordion.Root className="__test-class__" />);
      expect(container.querySelector('[data-slot="accordion"]')).toHaveClass("__test-class__");
    });
  });

  describe("Item", () => {
    it('renders with data-slot="accordion-item"', () => {
      const { container } = render(
        <Accordion.Root>
          <Accordion.Item />
        </Accordion.Root>,
      );
      expect(container.querySelector('[data-slot="accordion-item"]')).toBeInTheDocument();
    });

    it("merges className into slot", () => {
      const { container } = render(
        <Accordion.Root>
          <Accordion.Item className="__test-class__" />
        </Accordion.Root>,
      );
      expect(container.querySelector('[data-slot="accordion-item"]')).toHaveClass("__test-class__");
    });
  });

  describeSlots(Accordion, {
    Root: { slot: "accordion", skipRender: true },
    Item: { slot: "accordion-item", skipRender: true },
    Header: { slot: "accordion-header" },
    Trigger: { slot: "accordion-trigger" },
    Panel: { slot: "accordion-panel" },
  }, {
    wrapper: (children) => (
      <Accordion.Root defaultValue={["a"]}>
        <Accordion.Item value="a">{children}</Accordion.Item>
      </Accordion.Root>
    ),
  });
});
