/// <reference types="node" />
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// `pnpm registry:validate` checks the listed→disk direction: every
// files[].path in registry.json resolves. This test checks the reverse:
// every file on disk under registry/ is listed in some item's files[] —
// otherwise consumers install components whose sibling imports point at
// files that were never delivered.
//
// Files that are deliberately not shipped: colocated tests, test-only
// helpers, and agent docs. Anything new that should stay unshipped must be
// added here consciously.
const UNSHIPPED = [
  /\.test\.(ts|tsx)$/,
  /(^|\/)CLAUDE\.md$/,
  /^registry\/lib\/testing-/,
  /^registry\/theme\/theme\.config\.ts$/, // maintainer config for `pnpm gen:theme`
];

describe("registry coverage", () => {
  it("every file under registry/ is listed in registry.json or deliberately unshipped", () => {
    const registry = JSON.parse(readFileSync("registry.json", "utf8"));
    const listed = new Set<string>(
      registry.items.flatMap((item: { files?: { path: string }[] }) =>
        (item.files ?? []).map((file) => file.path),
      ),
    );

    const onDisk = readdirSync("registry", { recursive: true, withFileTypes: true })
      .filter((entry) => entry.isFile())
      .map((entry) => join(entry.parentPath, entry.name));

    const unlisted = onDisk.filter(
      (path) => !listed.has(path) && !UNSHIPPED.some((pattern) => pattern.test(path)),
    );

    expect(unlisted, "files on disk missing from registry.json").toEqual([]);
  });
});
