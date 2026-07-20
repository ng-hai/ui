import { describe, it, expect } from "vitest";
import { getInitialsFromNameOrEmail } from "./get-initials";

describe("getInitialsFromNameOrEmail", () => {
  it("takes first + last letter from a full name", () => {
    expect(getInitialsFromNameOrEmail("Hai Nguyen")).toBe("HN");
  });

  it("takes first + last letter from a middle-named person", () => {
    expect(getInitialsFromNameOrEmail("Ada Mary Lovelace")).toBe("AL");
  });

  it("takes first two letters from a single-word name", () => {
    expect(getInitialsFromNameOrEmail("Cher")).toBe("CH");
  });

  it("uses the part before @ for an email", () => {
    expect(getInitialsFromNameOrEmail("hai@example.com")).toBe("HA");
  });

  it("splits an email local-part on separators like a name", () => {
    expect(getInitialsFromNameOrEmail("hai.nguyen@example.com")).toBe("HN");
    expect(getInitialsFromNameOrEmail("hai_nguyen@example.com")).toBe("HN");
  });

  it("trims surrounding whitespace", () => {
    expect(getInitialsFromNameOrEmail("  Hai Nguyen  ")).toBe("HN");
  });

  it("returns an empty string for empty or whitespace-only input", () => {
    expect(getInitialsFromNameOrEmail("")).toBe("");
    expect(getInitialsFromNameOrEmail("   ")).toBe("");
  });

  it("handles a single character", () => {
    expect(getInitialsFromNameOrEmail("h")).toBe("H");
  });

  it("does not split a surrogate-pair emoji across two code units", () => {
    expect(getInitialsFromNameOrEmail("🚀 Rocket")).toBe("🚀R");
  });
});
