import { describe } from "vitest";
import { Input } from "./index";
import { describeSlots } from "@/registry/lib/testing-utils";

describe("Input", () => {
  describeSlots(Input, {
    Root: { slot: "input" },
  });
});
