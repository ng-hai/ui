import { describe } from "vitest";
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
});
