import type { ComponentType } from "react";
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Input as InputParts } from "./index";

// Give the (empty-slot) input styles a real variant so we can see it propagate.
vi.mock("./styles", async () => {
  const { tv } = await import("@/registry/lib/tv-config");
  return {
    inputStyles: tv({
      slots: { root: "", group: "", addon: "" },
      variants: {
        tone: {
          plain: { root: "root-plain", group: "group-plain", addon: "addon-plain" },
          brand: { root: "root-brand", group: "group-brand", addon: "addon-brand" },
        },
      },
    }),
  };
});

// The shipped styles declare no variants; the mock above adds `tone`, so loosen the prop types.
const Input = InputParts as unknown as Record<"Group" | "Root" | "Addon", ComponentType<Record<string, unknown>>>;

const slot = (container: HTMLElement, name: string) => container.querySelector(`[data-slot=${name}]`)!;

describe("Input.Group variants", () => {
  it("carries the group's variant to the group, its addons, and its input", () => {
    const { container } = render(
      <Input.Group tone="brand">
        <Input.Addon>$</Input.Addon>
        <Input.Root />
      </Input.Group>,
    );
    expect(slot(container, "input-group")).toHaveClass("group-brand");
    expect(slot(container, "input-addon")).toHaveClass("addon-brand");
    expect(slot(container, "input")).toHaveClass("root-brand");
  });

  it("lets an input inside a group override with its own variant", () => {
    const { container } = render(
      <Input.Group tone="brand">
        <Input.Root tone="plain" />
      </Input.Group>,
    );
    expect(slot(container, "input")).toHaveClass("root-plain");
    expect(slot(container, "input")).not.toHaveClass("root-brand");
  });

  it("lets an input inside a group take its own styles", () => {
    const { container } = render(
      <Input.Group tone="brand">
        <Input.Root styles={{ root: () => "custom-root" } as never} />
      </Input.Group>,
    );
    expect(slot(container, "input")).toHaveClass("custom-root");
  });

  it("uses the group's styles escape hatch", () => {
    const { container } = render(
      <Input.Group styles={{ group: () => "g", addon: () => "a", root: () => "r" } as never}>
        <Input.Addon>$</Input.Addon>
        <Input.Root />
      </Input.Group>,
    );
    expect(slot(container, "input-group")).toHaveClass("g");
    expect(slot(container, "input-addon")).toHaveClass("a");
    expect(slot(container, "input")).toHaveClass("r");
  });

  it("leaves a standalone input and addon on their own variants", () => {
    const { container } = render(
      <>
        <Input.Root tone="brand" />
        <Input.Addon>$</Input.Addon>
      </>,
    );
    expect(slot(container, "input")).toHaveClass("root-brand");
    expect(slot(container, "input-addon")).not.toHaveClass("addon-brand");
  });
});
