import { describe } from "vitest";
import { Toggle } from "./index";
import { describeSlots } from "@/registry/lib/testing-utils";

describe("Toggle", () => {
  describeSlots(Toggle, {
    Root: { slot: "toggle" },
  });
});
