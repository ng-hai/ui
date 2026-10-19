import { describe, expect, it } from "vitest";
import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";
import { PreviewCard } from "./index";
import { describeSlots } from "@/registry/lib/testing-utils";

describe("PreviewCard", () => {
  describeSlots(PreviewCard, {
    Root: { slot: "preview-card", skipRender: true },
    Trigger: { slot: "preview-card-trigger" },
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

    // Compile-time check: a typed handle flows into Root and a detached Trigger.
    it("types the payload across Root and a detached Trigger", () => {
      const handle = PreviewCard.createHandle<{ id: string }>();
      const tree = (
        <>
          <PreviewCard.Trigger handle={handle} payload={{ id: "a" }} />
          {/* @ts-expect-error the payload must match the handle's type */}
          <PreviewCard.Trigger handle={handle} payload={{ id: 1 }} />
          <PreviewCard.Root handle={handle}>{({ payload }) => <output>{payload?.id.toUpperCase()}</output>}</PreviewCard.Root>
        </>
      );
      expect(tree).toBeDefined();
    });
  });
});
