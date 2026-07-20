import { describe } from "vitest";
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
});
