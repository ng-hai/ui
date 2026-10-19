import { describe, expect, it } from "vitest";
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

    // Compile-time check: a typed handle flows into Root and a detached Trigger.
    it("types the payload across Root and a detached Trigger", () => {
      const handle = AlertDialog.createHandle<{ id: string }>();
      const tree = (
        <>
          <AlertDialog.Trigger handle={handle} payload={{ id: "a" }} />
          {/* @ts-expect-error the payload must match the handle's type */}
          <AlertDialog.Trigger handle={handle} payload={{ id: 1 }} />
          <AlertDialog.Root handle={handle}>{({ payload }) => <output>{payload?.id.toUpperCase()}</output>}</AlertDialog.Root>
        </>
      );
      expect(tree).toBeDefined();
    });
  });
});
