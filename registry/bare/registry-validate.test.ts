/// <reference types="node" />
import { describe, it, expect } from "vitest";
import { execSync } from "node:child_process";

describe("registry integrity", () => {
  it("registry.json validates and every referenced file exists", () => {
    // `shadcn registry validate` parses registry.json, resolves includes, and
    // checks that every files[].path exists. It exits non-zero (which makes
    // execSync throw) on any invalid item or missing source file, so a clean
    // exit is the assertion.
    expect(() => execSync("pnpm registry:validate", { stdio: "pipe" })).not.toThrow();
  }, 60_000);
});
