import { describe } from "vitest";
import { Separator } from "./index";
import { describeSlots } from "@/registry/lib/testing-utils";

describe("Separator", () => {
  describeSlots(Separator, {
    Root: { slot: "separator" },
  });
});
