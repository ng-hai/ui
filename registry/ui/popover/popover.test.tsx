import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { Popover } from "./index";
import { describeSlots } from "@/registry/lib/testing-utils";

describe("Popover", () => {
  describeSlots(Popover, {
    Root: { slot: "popover", skipRender: true },
    // A detached Trigger renders outside Root, so the error comes from Base UI, not the style context.
    Trigger: { slot: "popover-trigger", outsideError: "must be either used within" },
    Portal: { slot: "popover-portal" },
    Backdrop: { slot: "popover-backdrop" },
    Positioner: {
      slot: "popover-positioner",
      wrapper: (children) => (
        <Popover.Root open>
          <Popover.Portal>{children}</Popover.Portal>
        </Popover.Root>
      ),
    },
    Popup: {
      slot: "popover-popup",
      wrapper: (children) => (
        <Popover.Root open>
          <Popover.Portal>
            <Popover.Positioner>{children}</Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>
      ),
    },
    Viewport: {
      slot: "popover-viewport",
      wrapper: (children) => (
        <Popover.Root open>
          <Popover.Portal>
            <Popover.Positioner>{children}</Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>
      ),
    },
    Arrow: {
      slot: "popover-arrow",
      wrapper: (children) => (
        <Popover.Root open>
          <Popover.Portal>
            <Popover.Positioner>{children}</Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>
      ),
    },
    Title: { slot: "popover-title" },
    Description: { slot: "popover-description" },
    Close: { slot: "popover-close" },
  }, {
    wrapper: (children) => (
      <Popover.Root open>{children}</Popover.Root>
    ),
  });

  describe("handle", () => {
    it("re-exports the upstream handle API", () => {
      expect(Popover.createHandle).toBe(PopoverPrimitive.createHandle);
      expect(Popover.Handle).toBe(PopoverPrimitive.Handle);
      expect(Popover.createHandle() instanceof Popover.Handle).toBe(true);
    });

    it("renders a detached Trigger outside Root", () => {
      const handle = Popover.createHandle<{ id: string }>();
      render(
        <>
          <Popover.Trigger handle={handle} payload={{ id: "a" }} className="__test-class__">
            Open
          </Popover.Trigger>
          <Popover.Root handle={handle}>{({ payload }) => <output>{payload?.id.toUpperCase()}</output>}</Popover.Root>
        </>,
      );
      const trigger = document.querySelector('[data-slot="popover-trigger"]');
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveClass("__test-class__");
    });

    it("rejects a payload that does not match the handle", () => {
      const handle = Popover.createHandle<{ id: string }>();
      // @ts-expect-error the payload must match the handle's type
      const tree = <Popover.Trigger handle={handle} payload={{ id: 1 }} />;
      expect(tree).toBeDefined();
    });

    it("opens the Root from a detached Trigger and passes it the payload", () => {
      const handle = Popover.createHandle<{ id: string }>();
      render(
        <>
          <Popover.Trigger handle={handle} payload={{ id: "a" }}>
            Open
          </Popover.Trigger>
          <Popover.Root handle={handle}>
            {({ payload }) => (
              <Popover.Portal>
                <Popover.Positioner>
                  <Popover.Popup>{payload?.id.toUpperCase()}</Popover.Popup>
                </Popover.Positioner>
              </Popover.Portal>
            )}
          </Popover.Root>
        </>,
      );
      expect(document.querySelector('[data-slot="popover-popup"]')).not.toBeInTheDocument();
      fireEvent.click(screen.getByText("Open"));
      expect(document.querySelector('[data-slot="popover-popup"]')).toHaveTextContent("A");
    });
  });
});
