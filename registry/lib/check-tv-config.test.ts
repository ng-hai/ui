import { describe, it, expect, afterAll } from "vitest";
import { createTV } from "tailwind-variants";
import { mkdtempSync, writeFileSync, symlinkSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { findThemeNames, missingNames, isEntry } from "./check-tv-config";

const names = (css: string) => findThemeNames(css).map((f) => `${f.scale}:${f.name}`);

describe("findThemeNames", () => {
  it("finds all five scales in @theme", () => {
    const css = `@theme {
  --text-body-2: 1rem;
  --shadow-lv2: 0 1px black;
  --inset-shadow-pressed: inset 0 1px black;
  --drop-shadow-card: 0 1px black;
  --text-shadow-glow: 0 0 4px red;
}`;
    expect(names(css)).toEqual([
      "text:body-2",
      "shadow:lv2",
      "inset-shadow:pressed",
      "drop-shadow:card",
      "text-shadow:glow",
    ]);
  });

  it("finds them in @theme inline too", () => {
    expect(names("@theme inline {\n  --text-h4: 2rem;\n  --shadow-lv1: 0 0 black;\n}")).toEqual([
      "text:h4",
      "shadow:lv1",
    ]);
  });

  it("does not misread text-shadow as text", () => {
    expect(names("@theme { --text-shadow-glow: 0 0 red; }")).toEqual(["text-shadow:glow"]);
  });

  it("skips t-shirt names", () => {
    const css = "@theme { --text-xs: 1px; --text-2xl: 1px; --text-3.5xl: 1px; --shadow-md: 0; --shadow-xl: 0; }";
    expect(names(css)).toEqual([]);
  });

  it("counts a name once across companion sub-properties", () => {
    const css = "@theme { --text-body-2: 1rem; --text-body-2--line-height: 1.5; --text-body-2--font-weight: 500; }";
    expect(names(css)).toEqual(["text:body-2"]);
  });

  it("skips namespace resets", () => {
    expect(names("@theme { --text-*: initial; --shadow-*: initial; --text-shadow-*: initial; }")).toEqual([]);
  });

  it("ignores variables outside @theme", () => {
    const css = `:root { --text-body-2: 1rem; }
@theme { --shadow-lv2: 0 0 black; }
.dark { --shadow-lv3: 0 0 black; }`;
    expect(names(css)).toEqual(["shadow:lv2"]);
  });

  it("ends a block at its matching brace, through nested rules", () => {
    const css = `@theme {
  @keyframes spin { to { transform: none; } }
  --text-h4: 2rem;
}
:root { --text-h5: 1rem; }`;
    expect(names(css)).toEqual(["text:h4"]);
  });

  it("ignores comments and reports file lines", () => {
    const css = `/* --text-ghost: 1px; */
@theme {
  --text-body-2: 1rem;
}`;
    expect(findThemeNames(css)).toEqual([{ scale: "text", name: "body-2", line: 3 }]);
  });
});

describe("missingNames", () => {
  const found = findThemeNames("@theme { --text-body-2: 1rem; --shadow-lv2: 0; --text-shadow-glow: 0; }");

  it("reports every name when nothing is registered", () => {
    expect(missingNames(found, {}).map((f) => f.name)).toEqual(["body-2", "lv2", "glow"]);
  });

  it("drops registered names, per scale", () => {
    const theme = { text: ["body-2"], shadow: ["glow"] };
    expect(missingNames(found, theme).map((f) => `${f.scale}:${f.name}`)).toEqual([
      "shadow:lv2",
      "text-shadow:glow",
    ]);
  });

  it("is empty when everything is registered", () => {
    expect(missingNames(found, { text: ["body-2"], shadow: ["lv2"], "text-shadow": ["glow"] })).toEqual([]);
  });
});

describe("isEntry", () => {
  const tempDir = mkdtempSync(join(tmpdir(), "check-tv-config-"));
  const realPath = join(tempDir, "real.ts");
  const linkPath = join(tempDir, "link.ts");

  writeFileSync(realPath, "export const test = 1;");
  symlinkSync(realPath, linkPath);

  afterAll(() => {
    rmSync(tempDir, { recursive: true });
  });

  it("returns true when argv1 is a symlink to the url", () => {
    expect(isEntry(linkPath, pathToFileURL(realPath).href)).toBe(true);
  });

  it("returns true when argv1 is the real file path", () => {
    expect(isEntry(realPath, pathToFileURL(realPath).href)).toBe(true);
  });

  it("returns false when argv1 is undefined", () => {
    expect(isEntry(undefined, pathToFileURL(realPath).href)).toBe(false);
  });

  it("returns false when argv1 is a missing file", () => {
    expect(isEntry(join(tempDir, "missing.ts"), pathToFileURL(realPath).href)).toBe(false);
  });
});

describe("tailwind-merge wiring", () => {
  const tv = createTV({
    twMerge: true,
    twMergeConfig: { extend: { theme: { text: ["body-2"], shadow: ["lv1", "lv2"] } } },
  });
  const merge = (base: string, extra: string) => tv({ slots: { root: base } })().root({ class: extra });

  it("keeps a registered size next to a colour", () => {
    expect(merge("text-body-2", "text-fg")).toBe("text-body-2 text-fg");
  });

  it("keeps a registered shadow next to a shadow colour", () => {
    expect(merge("shadow-lv2", "shadow-black")).toBe("shadow-lv2 shadow-black");
  });

  it("still collapses two registered shadows", () => {
    expect(merge("shadow-lv1", "shadow-lv2")).toBe("shadow-lv2");
  });
});
