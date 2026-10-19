import { describe, expect, it } from "vitest";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
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

  describe("handle", () => {
    it("re-exports the upstream handle API", () => {
      expect(Dialog.createHandle).toBe(DialogPrimitive.createHandle);
      expect(Dialog.Handle).toBe(DialogPrimitive.Handle);
      expect(Dialog.createHandle() instanceof Dialog.Handle).toBe(true);
    });

    // Compile-time check: a typed handle flows into Root and a detached Trigger.
    it("types the payload across Root and a detached Trigger", () => {
      const handle = Dialog.createHandle<{ id: string }>();
      const tree = (
        <>
          <Dialog.Trigger handle={handle} payload={{ id: "a" }} />
          {/* @ts-expect-error the payload must match the handle's type */}
          <Dialog.Trigger handle={handle} payload={{ id: 1 }} />
          <Dialog.Root handle={handle}>{({ payload }) => <output>{payload?.id.toUpperCase()}</output>}</Dialog.Root>
        </>
      );
      expect(tree).toBeDefined();
    });
  });
});
