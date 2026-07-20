import { describe, it, expect } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { Field } from "./index";
import { describeSlots } from "@/registry/lib/testing-utils";

describe("Field", () => {
  describe("Root", () => {
    it('renders with data-slot="field"', () => {
      const { container } = render(<Field.Root />);
      expect(container.querySelector('[data-slot="field"]')).toBeInTheDocument();
    });

    it("merges className into slot", () => {
      const { container } = render(<Field.Root className="__test-class__" />);
      expect(container.querySelector('[data-slot="field"]')).toHaveClass("__test-class__");
    });
  });

  describe("Error", () => {
    it('renders with data-slot="field-error" when match={true}', () => {
      cleanup();
      render(
        <Field.Root invalid>
          <Field.Error match={true} />
        </Field.Root>,
      );
      const el = document.querySelector('[data-slot="field-error"]');
      expect(el).toBeInTheDocument();
    });

    it("merges className into slot", () => {
      cleanup();
      render(
        <Field.Root invalid>
          <Field.Error match={true} className="__test-class__" />
        </Field.Root>,
      );
      const el = document.querySelector('[data-slot="field-error"]');
      expect(el).toHaveClass("__test-class__");
    });
  });

  describeSlots(Field, {
    Root: { slot: "field", skipRender: true },
    Label: { slot: "field-label" },
    Error: {
      slot: "field-error",
      // Field.Error requires match={true} or actual validation failure to render.
      // describeSlots cannot pass the match prop, so tested manually below.
      skipRender: true,
    },
    Description: { slot: "field-description" },
    Control: { slot: "field-control" },
    Validity: { slot: "field-validity", skipRender: true },
    Item: { slot: "field-item" },
  }, {
    wrapper: (children) => (
      <Field.Root>{children}</Field.Root>
    ),
  });
});
