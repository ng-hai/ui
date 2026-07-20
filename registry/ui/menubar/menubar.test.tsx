import { describe } from "vitest";
import { Menubar } from "./index";
import { describeSlots } from "@/registry/lib/testing-utils";

describe("Menubar", () => {
  describeSlots(Menubar, {
    Root: { slot: "menubar" },
  });
});
