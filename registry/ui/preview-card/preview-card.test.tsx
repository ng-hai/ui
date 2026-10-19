import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";
import { PreviewCard } from "./index";
import { describeSlots } from "@/registry/lib/testing-utils";

describe("PreviewCard", () => {
  describeSlots(PreviewCard, {
    Root: { slot: "preview-card", skipRender: true },
    // A detached Trigger renders outside Root, so the error comes from Base UI, not the style context.
    Trigger: { slot: "preview-card-trigger", outsideError: "must be either used within" },
    Portal: { slot: "preview-card-portal" },
    Backdrop: { slot: "preview-card-backdrop" },
    Positioner: {
      slot: "preview-card-positioner",
      wrapper: (children) => (
        <PreviewCard.Root open>
          <PreviewCard.Portal>{children}</PreviewCard.Portal>
        </PreviewCard.Root>
      ),
    },
    Popup: {
      slot: "preview-card-popup",
      wrapper: (children) => (
        <PreviewCard.Root open>
          <PreviewCard.Portal>
            <PreviewCard.Positioner>{children}</PreviewCard.Positioner>
          </PreviewCard.Portal>
        </PreviewCard.Root>
      ),
    },
    Arrow: {
      slot: "preview-card-arrow",
      wrapper: (children) => (
        <PreviewCard.Root open>
          <PreviewCard.Portal>
            <PreviewCard.Positioner>{children}</PreviewCard.Positioner>
          </PreviewCard.Portal>
        </PreviewCard.Root>
      ),
    },
    Viewport: {
      slot: "preview-card-viewport",
      wrapper: (children) => (
        <PreviewCard.Root open>
          <PreviewCard.Portal>
            <PreviewCard.Positioner>{children}</PreviewCard.Positioner>
          </PreviewCard.Portal>
        </PreviewCard.Root>
      ),
    },
  }, {
    wrapper: (children) => (
      <PreviewCard.Root open>{children}</PreviewCard.Root>
    ),
  });

  describe("handle", () => {
    it("re-exports the upstream handle API", () => {
      expect(PreviewCard.createHandle).toBe(PreviewCardPrimitive.createHandle);
      expect(PreviewCard.Handle).toBe(PreviewCardPrimitive.Handle);
      expect(PreviewCard.createHandle() instanceof PreviewCard.Handle).toBe(true);
    });

    it("renders a detached Trigger outside Root", () => {
      const handle = PreviewCard.createHandle<{ id: string }>();
      render(
        <>
          <PreviewCard.Trigger handle={handle} payload={{ id: "a" }} className="__test-class__">
            Open
          </PreviewCard.Trigger>
          <PreviewCard.Root handle={handle}>{({ payload }) => <output>{payload?.id.toUpperCase()}</output>}</PreviewCard.Root>
        </>,
      );
      const trigger = document.querySelector('[data-slot="preview-card-trigger"]');
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveClass("__test-class__");
    });

    it("rejects a payload that does not match the handle", () => {
      const handle = PreviewCard.createHandle<{ id: string }>();
      // @ts-expect-error the payload must match the handle's type
      const tree = <PreviewCard.Trigger handle={handle} payload={{ id: 1 }} />;
      expect(tree).toBeDefined();
    });
  });
});
