import { describe, it, expect } from "vitest";
import { describeSlots } from "./testing-utils";

function FakeRoot({ className }: { className?: string }) {
  return <div data-slot="fake" className={className} />;
}

const FakeComponent = { Root: FakeRoot };

describe("describeSlots helper", () => {
  it("throws if a part name does not exist on the component", () => {
    expect(() => {
      describeSlots(FakeComponent, {
        NonExistent: { slot: "nope" },
      });
    }).toThrow("Component.NonExistent is undefined");
  });
});
