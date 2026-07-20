import { describe } from "vitest";
import { Dialog } from "./index";
import { describeSlots } from "@/registry/lib/testing-utils";

describe("Dialog", () => {
  describeSlots(Dialog, {
    Root: { slot: "dialog", skipRender: true },
    Trigger: { slot: "dialog-trigger" },
    Portal: { slot: "dialog-portal" },
    Backdrop: { slot: "dialog-backdrop" },
    Popup: {
      slot: "dialog-popup",
      wrapper: (children) => (
        <Dialog.Root open>
          <Dialog.Portal>{children}</Dialog.Portal>
        </Dialog.Root>
      ),
    },
    Viewport: {
      slot: "dialog-viewport",
      wrapper: (children) => (
        <Dialog.Root open>
          <Dialog.Portal>{children}</Dialog.Portal>
        </Dialog.Root>
      ),
    },
    Title: { slot: "dialog-title" },
    Description: { slot: "dialog-description" },
    Close: { slot: "dialog-close" },
  }, {
    wrapper: (children) => (
      <Dialog.Root open>{children}</Dialog.Root>
    ),
  });
});
