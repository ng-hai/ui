import { describe, it, expect } from "vitest";
import { render, cleanup } from "@testing-library/react";
import type { ReactNode } from "react";

interface SlotConfig {
  /** The expected data-slot attribute value */
  slot: string;
  /** If true, this part doesn't render a DOM element (context provider, render prop, etc.) */
  skipRender?: boolean;
  /** Per-slot wrapper override for parts needing deeper nesting (e.g. Arrow inside Positioner) */
  wrapper?: (children: ReactNode) => ReactNode;
}

interface DescribeSlotsOptions {
  /** Wrapper that provides required parent context (e.g. <Dialog.Root open>) */
  wrapper?: (children: ReactNode) => ReactNode;
}

/**
 * Generates standard tests for a ui component's parts:
 * - data-slot attribute presence
 * - className merge into slot
 * - Context error when rendered outside wrapper (multi-part only)
 *
 * Queries `document` instead of `container` so portal-rendered
 * content (Popup, Positioner, Arrow, etc.) is found.
 */
export function describeSlots(
  Component: Record<string, any>,
  slots: Record<string, SlotConfig>,
  options?: DescribeSlotsOptions,
) {
  const { wrapper: globalWrapper } = options ?? {};

  for (const [partName, config] of Object.entries(slots)) {
    const Part = Component[partName];
    if (!Part) {
      throw new Error(`Component.${partName} is undefined — check index.parts.ts exports`);
    }

    const wrapper = config.wrapper ?? globalWrapper;

    describe(partName, () => {
      if (config.skipRender) {
        it.skip("skipped (no DOM element)", () => {});
        return;
      }

      it(`renders with data-slot="${config.slot}"`, () => {
        cleanup();
        const ui = <Part />;
        render(wrapper ? (wrapper(ui) as any) : ui);
        const el = document.querySelector(`[data-slot="${config.slot}"]`);
        expect(el).toBeInTheDocument();
      });

      it("merges className into slot", () => {
        cleanup();
        const ui = <Part className="__test-class__" />;
        render(wrapper ? (wrapper(ui) as any) : ui);
        const el = document.querySelector(`[data-slot="${config.slot}"]`);
        expect(el).toHaveClass("__test-class__");
      });

      if (globalWrapper) {
        it("throws when rendered outside Root", () => {
          expect(() => render(<Part />)).toThrow("must be used within");
        });
      }
    });
  }
}
