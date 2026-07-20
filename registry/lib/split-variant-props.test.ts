import { describe, it, expect } from "vitest";
import { tv } from "@/registry/lib/tv.config";
import { createPropSplitter } from "./split-variant-props";

const styles = tv({
  slots: { root: [""] },
  variants: {
    size: { sm: { root: "" }, lg: { root: "" } },
    color: { red: { root: "" }, blue: { root: "" } },
  },
});

const splitProps = createPropSplitter(styles);

describe("createPropSplitter", () => {
  it("splits variant keys from HTML props", () => {
    const [variantProps, rest] = splitProps({
      size: "sm",
      color: "red",
      className: "my-class",
      onClick: () => {},
    });
    expect(variantProps).toEqual({ size: "sm", color: "red" });
    expect(rest).toEqual({ className: "my-class", onClick: expect.any(Function) });
  });

  it("returns empty variant props when none match", () => {
    const [variantProps, rest] = splitProps({ className: "test", id: "x" });
    expect(variantProps).toEqual({});
    expect(rest).toEqual({ className: "test", id: "x" });
  });

  it("returns empty rest when all props are variants", () => {
    const [variantProps, rest] = splitProps({ size: "lg", color: "blue" });
    expect(variantProps).toEqual({ size: "lg", color: "blue" });
    expect(rest).toEqual({});
  });

  it("handles empty props", () => {
    const [variantProps, rest] = splitProps({});
    expect(variantProps).toEqual({});
    expect(rest).toEqual({});
  });

  it("works with tv() variantKeys at runtime", () => {
    expect((styles as any).variantKeys).toEqual(expect.arrayContaining(["size", "color"]));
  });
});
