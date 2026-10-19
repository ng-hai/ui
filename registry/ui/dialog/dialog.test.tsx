import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
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

    it("renders a detached Trigger outside Root", () => {
      const handle = Dialog.createHandle<{ id: string }>();
      render(
        <>
          <Dialog.Trigger handle={handle} payload={{ id: "a" }} className="__test-class__">
            Open
          </Dialog.Trigger>
          <Dialog.Root handle={handle}>{({ payload }) => <output>{payload?.id.toUpperCase()}</output>}</Dialog.Root>
        </>,
      );
      const trigger = document.querySelector('[data-slot="dialog-trigger"]');
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveClass("__test-class__");
    });

    it("rejects a payload that does not match the handle", () => {
      const handle = Dialog.createHandle<{ id: string }>();
      // @ts-expect-error the payload must match the handle's type
      const tree = <Dialog.Trigger handle={handle} payload={{ id: 1 }} />;
      expect(tree).toBeDefined();
    });
  });
});
