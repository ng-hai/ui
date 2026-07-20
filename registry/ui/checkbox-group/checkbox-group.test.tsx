import { describe } from "vitest";
import { CheckboxGroup } from "./index";
import { describeSlots } from "@/registry/lib/testing-utils";

describe("CheckboxGroup", () => {
  describeSlots(CheckboxGroup, {
    Root: { slot: "checkbox-group" },
  });
});
