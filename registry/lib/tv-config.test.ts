import { describe, it, expect } from "vitest";
import { tv, twMergeTheme } from "./tv-config";

describe("tv config", () => {
  it("returns a function with variantKeys property", () => {
    const styles = tv({
      slots: { root: [""] },
      variants: { size: { sm: { root: "" } } },
    });
    expect((styles as any).variantKeys).toContain("size");
  });

  it("slot functions merge class via { class } option", () => {
    const styles = tv({
      slots: { root: ["base-class"] },
    });
    const s = styles();
    expect(s.root({ class: "extra" })).toContain("extra");
  });

  it("resolves conflicting Tailwind classes via twMerge", () => {
    const styles = tv({
      slots: { root: ["p-2"] },
    });
    const s = styles();
    const result = s.root({ class: "p-4" });
    expect(result).toContain("p-4");
    expect(result).not.toContain("p-2");
  });

  it("exports twMergeTheme with the five scales tailwind-merge only knows t-shirt names for", () => {
    expect(Object.keys(twMergeTheme).sort()).toEqual(
      ["drop-shadow", "inset-shadow", "shadow", "text", "text-shadow"],
    );
  });
});
