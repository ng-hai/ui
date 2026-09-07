import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "./index";
import { describeSlots } from "@/registry/lib/testing-utils";

describe("Button", () => {
  describeSlots(Button, {
    Root: { slot: "button" },
  });
});

describe("Button accent", () => {
  it("pins no accent, so the button inherits its subtree's hue", () => {
    const { container } = render(<Button.Root>Save</Button.Root>);
    expect(container.querySelector("button")).not.toHaveAttribute("data-accent-color");
  });

  it("forwards a consumer's data-accent-color", () => {
    const { container } = render(<Button.Root data-accent-color="jade">Upgrade</Button.Root>);
    expect(container.querySelector("button")).toHaveAttribute("data-accent-color", "jade");
  });
});
