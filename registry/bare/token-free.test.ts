/// <reference types="node" />
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// Component code is theme-free: slots, variants, data-slot and state
// attributes only. Theme tokens (accent/gray/role scales, focus ring, the
// data-accent-color swap) belong to the optional theme adapter and to
// consumers' styles, never to registry/ui/**.
const SCALES = "accent|gray|danger|warning|success|info|focus";
const TOKENS = [
  new RegExp(`\\b(${SCALES})-a?\\d{1,2}\\b`),
  new RegExp(`--(${SCALES})-`),
  new RegExp(`\\b(${SCALES})-contrast\\b`),
  /data-accent-color/,
];
// Comments may mention tokens (e.g. how a call site picks a hue); only code is checked.
const COMMENT = /^\s*(\/\/|\/\*|\*)/;

describe("token-free components", () => {
  it("registry/ui/** references no theme tokens", () => {
    const sources = readdirSync("registry/ui", { recursive: true, withFileTypes: true })
      .filter((entry) => entry.isFile() && !entry.name.startsWith(".") && !/\.test\.(ts|tsx)$/.test(entry.name))
      .map((entry) => join(entry.parentPath, entry.name));

    const hits = sources.flatMap((path) =>
      readFileSync(path, "utf8")
        .split("\n")
        .flatMap((line, i) => (!COMMENT.test(line) && TOKENS.some((re) => re.test(line)) ? [`${path}:${i + 1}: ${line.trim()}`] : [])),
    );

    expect(hits, "theme tokens in component code").toEqual([]);
  });
});
