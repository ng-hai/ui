import { describe } from "vitest";
import { Button } from "./index";
import { describeSlots } from "@/registry/lib/testing-utils";

describe("Button", () => {
  describeSlots(Button, {
    Root: { slot: "button" },
  });
});
