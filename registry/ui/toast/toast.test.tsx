import { describe, it, expect } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import { useRef, type ReactNode } from "react";
import { Toast } from "./index";
import { describeSlots } from "@/registry/lib/testing-utils";

/**
 * Toast.Root requires a `toast` object from the toast manager — it cannot be
 * rendered directly. This harness creates a toast via useToastManager and
 * renders Toast.Root so child parts (Title, Description, Close, Action,
 * Content) can access the Toast.Root StyleContext.
 *
 * The ui Portal/Viewport wrappers also call useToastStyles(), so they
 * too must be rendered inside Toast.Root in tests.
 */
function ToastHarness({ children }: { children: ReactNode }) {
  const manager = ToastPrimitive.useToastManager();
  const idRef = useRef<string | undefined>(undefined);
  if (!idRef.current) {
    idRef.current = manager.add({
      title: "Test",
      description: "Desc",
      actionProps: { children: "Action" },
    });
  }
  const toast = manager.toasts.find((t) => t.id === idRef.current);
  if (!toast) return null;
  return <Toast.Root toast={toast}>{children}</Toast.Root>;
}

const withHarness = (children: ReactNode) => (
  <Toast.Provider>
    <ToastHarness>{children}</ToastHarness>
  </Toast.Provider>
);

describe("Toast", () => {
  describe("Provider", () => {
    it("is exported", () => {
      expect(Toast.Provider).toBeDefined();
    });
  });

  // Toast.Root, Positioner, and Arrow all require a `toast` prop from the
  // toast manager, which describeSlots cannot pass. Tested manually below.

  describe("Root", () => {
    it('renders with data-slot="toast"', () => {
      cleanup();
      render(
        <Toast.Provider>
          <ToastHarness>{null}</ToastHarness>
        </Toast.Provider>,
      );
      expect(document.querySelector('[data-slot="toast"]')).toBeInTheDocument();
    });

    it("merges className into slot", () => {
      cleanup();
      function RootWithClass() {
        const manager = ToastPrimitive.useToastManager();
        const idRef = useRef<string | undefined>(undefined);
        if (!idRef.current) idRef.current = manager.add({ title: "t" });
        const toast = manager.toasts.find((t) => t.id === idRef.current);
        if (!toast) return null;
        return <Toast.Root toast={toast} className="__test-class__" />;
      }
      render(
        <Toast.Provider>
          <RootWithClass />
        </Toast.Provider>,
      );
      expect(document.querySelector('[data-slot="toast"]')).toHaveClass("__test-class__");
    });
  });

  describe("Positioner", () => {
    function PositionerHarness({ className }: { className?: string }) {
      const manager = ToastPrimitive.useToastManager();
      const idRef = useRef<string | undefined>(undefined);
      if (!idRef.current) {
        idRef.current = manager.add({
          title: "t",
          positionerProps: { anchor: document.body },
        });
      }
      const toast = manager.toasts.find((t) => t.id === idRef.current);
      if (!toast) return null;
      return (
        <Toast.Root toast={toast}>
          <Toast.Positioner toast={toast} className={className} />
        </Toast.Root>
      );
    }

    it('renders with data-slot="toast-positioner"', () => {
      cleanup();
      render(
        <Toast.Provider>
          <PositionerHarness />
        </Toast.Provider>,
      );
      expect(document.querySelector('[data-slot="toast-positioner"]')).toBeInTheDocument();
    });

    it("merges className into slot", () => {
      cleanup();
      render(
        <Toast.Provider>
          <PositionerHarness className="__test-class__" />
        </Toast.Provider>,
      );
      expect(document.querySelector('[data-slot="toast-positioner"]')).toHaveClass("__test-class__");
    });
  });

  describe("Arrow", () => {
    function ArrowHarness({ className }: { className?: string }) {
      const manager = ToastPrimitive.useToastManager();
      const idRef = useRef<string | undefined>(undefined);
      if (!idRef.current) {
        idRef.current = manager.add({
          title: "t",
          positionerProps: { anchor: document.body },
        });
      }
      const toast = manager.toasts.find((t) => t.id === idRef.current);
      if (!toast) return null;
      return (
        <Toast.Root toast={toast}>
          <Toast.Positioner toast={toast}>
            <Toast.Arrow className={className} />
          </Toast.Positioner>
        </Toast.Root>
      );
    }

    it('renders with data-slot="toast-arrow"', () => {
      cleanup();
      render(
        <Toast.Provider>
          <ArrowHarness />
        </Toast.Provider>,
      );
      expect(document.querySelector('[data-slot="toast-arrow"]')).toBeInTheDocument();
    });

    it("merges className into slot", () => {
      cleanup();
      render(
        <Toast.Provider>
          <ArrowHarness className="__test-class__" />
        </Toast.Provider>,
      );
      expect(document.querySelector('[data-slot="toast-arrow"]')).toHaveClass("__test-class__");
    });
  });

  describeSlots(
    Toast,
    {
      Provider: { slot: "toast-provider", skipRender: true },
      // Need a toast object — tested manually above.
      Root: { slot: "toast", skipRender: true },
      Positioner: { slot: "toast-positioner", skipRender: true },
      Arrow: { slot: "toast-arrow", skipRender: true },
      Portal: {
        slot: "toast-portal",
        wrapper: withHarness,
      },
      Viewport: {
        slot: "toast-viewport",
        wrapper: withHarness,
      },
      Content: {
        slot: "toast-content",
        wrapper: withHarness,
      },
      Title: {
        slot: "toast-title",
        wrapper: withHarness,
      },
      Description: {
        slot: "toast-description",
        wrapper: withHarness,
      },
      Action: {
        slot: "toast-action",
        wrapper: withHarness,
      },
      Close: {
        slot: "toast-close",
        wrapper: withHarness,
      },
    },
    {
      wrapper: (children) => <Toast.Provider>{children}</Toast.Provider>,
    },
  );
});
