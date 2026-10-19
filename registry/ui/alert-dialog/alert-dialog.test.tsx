import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import { AlertDialog } from "./index";
import { describeSlots } from "@/registry/lib/testing-utils";

describe("AlertDialog", () => {
  describeSlots(AlertDialog, {
    Root: { slot: "alert-dialog", skipRender: true },
    Trigger: { slot: "alert-dialog-trigger" },
    Portal: { slot: "alert-dialog-portal" },
    Backdrop: { slot: "alert-dialog-backdrop" },
    Popup: {
      slot: "alert-dialog-popup",
      wrapper: (children) => (
        <AlertDialog.Root open>
          <AlertDialog.Portal>{children}</AlertDialog.Portal>
        </AlertDialog.Root>
      ),
    },
    Viewport: {
      slot: "alert-dialog-viewport",
      wrapper: (children) => (
        <AlertDialog.Root open>
          <AlertDialog.Portal>{children}</AlertDialog.Portal>
        </AlertDialog.Root>
      ),
    },
    Title: { slot: "alert-dialog-title" },
    Description: { slot: "alert-dialog-description" },
    Close: { slot: "alert-dialog-close" },
  }, {
    wrapper: (children) => (
      <AlertDialog.Root open>{children}</AlertDialog.Root>
    ),
  });

  describe("handle", () => {
    it("re-exports the upstream handle API", () => {
      expect(AlertDialog.createHandle).toBe(AlertDialogPrimitive.createHandle);
      expect(AlertDialog.Handle).toBe(AlertDialogPrimitive.Handle);
      expect(AlertDialog.createHandle() instanceof AlertDialog.Handle).toBe(true);
    });

    it("renders a detached Trigger outside Root", () => {
      const handle = AlertDialog.createHandle<{ id: string }>();
      render(
        <>
          <AlertDialog.Trigger handle={handle} payload={{ id: "a" }} className="__test-class__">
            Open
          </AlertDialog.Trigger>
          <AlertDialog.Root handle={handle}>{({ payload }) => <output>{payload?.id.toUpperCase()}</output>}</AlertDialog.Root>
        </>,
      );
      const trigger = document.querySelector('[data-slot="alert-dialog-trigger"]');
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveClass("__test-class__");
    });

    it("rejects a payload that does not match the handle", () => {
      const handle = AlertDialog.createHandle<{ id: string }>();
      // @ts-expect-error the payload must match the handle's type
      const tree = <AlertDialog.Trigger handle={handle} payload={{ id: 1 }} />;
      expect(tree).toBeDefined();
    });
  });
});
