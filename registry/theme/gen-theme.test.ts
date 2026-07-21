import { describe, expect, it } from "vitest";
import { buildTheme, defineTheme, renderCss, renderTenantsCss } from "./gen-theme";

// One multi-accent fixture reused across suites (buildTheme runs the color
// engine ~2×(pool + seeded roles) times, so build once at module scope).
const acme = defineTheme({
  name: "acme",
  accents: { blue: "#2563eb", jade: "#29a383", red: "#e5484d" },
  semantics: { danger: "red", premium: "#f59e0b" },
});
const built = buildTheme(acme);
const css = renderCss(built);
const tenants = renderTenantsCss([built]);

const block = (source: string, selector: string) => {
  const match = source.match(new RegExp(`${selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")} \\{([^}]*)\\}`));
  expect(match, `expected a "${selector}" block`).not.toBeNull();
  return match![1];
};

describe("buildTheme", () => {
  it("makes the FIRST accents key the default accent", () => {
    expect(built.aliases.get("accent")).toBe("blue");
  });

  it("aliases a semantic role to a pool key instead of generating a scale", () => {
    expect(built.aliases.get("danger")).toBe("red");
    expect(built.valueNames).not.toContain("danger-1");
  });

  it("generates no scales for undeclared roles (semantics are opt-in)", () => {
    for (const role of ["warning", "success", "info"]) {
      expect(built.seededRoles).not.toContain(role);
      expect(built.valueNames).not.toContain(`${role}-1`);
    }
  });

  it("generates nothing but the pool when semantics is omitted", () => {
    const t = buildTheme(defineTheme({ name: "t", accents: { blue: "#2563eb" } }));
    expect(t.seededRoles).toEqual([]);
    expect([...t.aliases.keys()]).toEqual(["accent"]);
  });

  it("generates custom seeded roles as private scales", () => {
    expect(built.seededRoles).toContain("premium");
    for (const suffix of ["1", "12", "a1", "a12", "contrast", "surface"]) {
      expect(built.valueNames).toContain(`premium-${suffix}`);
    }
  });

  it("emits every pool scale in both modes, pinning step 9 to the seed", () => {
    expect(built.light.get("jade-9")).toBeTruthy();
    expect(built.dark.get("jade-9")).toBeTruthy();
    expect(built.light.get("jade-1")).not.toBe(built.dark.get("jade-1"));
    expect(built.light.get("blue-9")!.toLowerCase()).toBe("#2563eb");
  });

  it("derives the gray pairing from the default (first) accent", () => {
    const jadeFirst = buildTheme(
      defineTheme({ name: "t", accents: { jade: "#29a383", blue: "#2563eb" } }),
    );
    // jade pairs sage, blue pairs slate — swapping the first key changes the chrome.
    expect(jadeFirst.light.get("gray-1")).not.toBe(built.light.get("gray-1"));
  });

  it("treats a semantics string that is not a pool key as a CSS color", () => {
    const t = buildTheme(defineTheme({ name: "t", accents: { blue: "#2563eb" }, semantics: { danger: "tomato" } }));
    expect(t.seededRoles).toContain("danger");
    expect(t.valueNames).toContain("danger-1");
  });
});

describe("validation", () => {
  it("rejects an empty accents pool", () => {
    expect(() => buildTheme({ name: "t", accents: {} })).toThrow(/accents needs at least one entry/);
  });

  it("rejects a pool key that collides with a semantic role", () => {
    expect(() =>
      buildTheme({ name: "t", accents: { danger: "#e5484d" }, semantics: { danger: "#dc2626" } }),
    ).toThrow(/both an accents key and a semantic role/);
  });

  it("rejects a semantics value that is neither a pool key nor a color", () => {
    expect(() => buildTheme({ name: "t", accents: { blue: "#2563eb" }, semantics: { danger: "redd" } })).toThrow(
      /neither an accents key \(blue\) nor a valid CSS color/,
    );
  });

  it("rejects names that are not lowercase kebab-case", () => {
    expect(() => buildTheme({ name: "t", accents: { Blue: "#2563eb" } })).toThrow(/kebab-case/);
  });

  it("rejects reserved contract names", () => {
    expect(() => buildTheme({ name: "t", accents: { accent: "#2563eb" } })).toThrow(/reserved/);
  });
});

describe("renderCss", () => {
  it("points --accent-* at the default pool scale in :root", () => {
    const root = block(css, ":root");
    expect(root).toContain("--accent-9: var(--blue-9);");
    expect(root).toContain("--accent-contrast: var(--blue-contrast);");
  });

  it("points aliased role tokens at their pool scale", () => {
    const root = block(css, ":root");
    expect(root).toContain("--danger-9: var(--red-9);");
    // Aliased roles never emit values of their own.
    expect(css).not.toMatch(/--danger-9: oklch/);
  });

  it("emits one swap block per pool entry, and none for roles", () => {
    for (const name of ["blue", "jade", "red"]) {
      const swap = block(css, `[data-accent-color="${name}"]`);
      expect(swap).toContain(`--accent-1: var(--${name}-1);`);
      expect(swap).toContain(`--accent-surface: var(--${name}-surface);`);
    }
    expect(css).not.toContain('[data-accent-color="danger"]');
    expect(css).not.toContain('[data-accent-color="premium"]');
  });

  it("keeps the .dark block values-only (pointers are mode-independent)", () => {
    expect(block(css, ".dark")).not.toContain("var(--");
  });

  it("maps pool scales, roles, and specials in @theme inline", () => {
    const theme = block(css, "@theme inline");
    for (const line of [
      "--color-gray-1: var(--gray-1);",
      "--color-jade-9: var(--jade-9);",
      "--color-accent-9: var(--accent-9);",
      "--color-danger-9: var(--danger-9);",
      "--color-premium-9: var(--premium-9);",
      "--color-background: var(--background);",
      "--radius-lg: var(--radius);",
    ]) {
      expect(theme).toContain(line);
    }
  });
});

describe("black/white alpha ramps", () => {
  it("emits the fixed ramps once in :root, not per mode", () => {
    const root = block(css, ":root");
    expect(root).toContain("--black-a1: oklch(0 0 0 / 0.05);");
    expect(root).toContain("--white-a12: oklch(1 0 0 / 0.95);");
    expect(block(css, ".dark")).not.toContain("--black-a");
    expect(block(css, ".dark")).not.toContain("--white-a");
  });

  it("registers black/white utilities in @theme inline", () => {
    const theme = block(css, "@theme inline");
    expect(theme).toContain("--color-black-a6: var(--black-a6);");
    expect(theme).toContain("--color-white-a6: var(--white-a6);");
  });

  it("leaves them out of tenants.css (they come from the neutral default.css)", () => {
    expect(tenants).not.toContain("--black-a");
    expect(tenants).not.toContain("--white-a");
  });

  it("reserves black/white as pool and role names", () => {
    expect(() => buildTheme({ name: "t", accents: { black: "#000000" } })).toThrow(/reserved/);
    expect(() =>
      buildTheme({ name: "t", accents: { blue: "#2563eb" }, semantics: { white: "#ffffff" } }),
    ).toThrow(/reserved/);
  });
});

describe("renderTenantsCss", () => {
  it("scopes values + pointers per tenant, dark values separately", () => {
    const base = block(tenants, ':root[data-tenant="acme"]');
    expect(base).toContain("--jade-9: oklch");
    expect(base).toContain("--accent-9: var(--blue-9);");
    expect(block(tenants, ':root[data-tenant="acme"].dark')).not.toContain("var(--");
  });

  it("scopes swap blocks to the tenant, covering the attribute on <html> too", () => {
    expect(tenants).toContain(
      '[data-tenant="acme"] [data-accent-color="jade"],\n:root[data-tenant="acme"][data-accent-color="jade"] {',
    );
  });

  it("registers only tokens the neutral contract does not cover", () => {
    const theme = block(tenants, "@theme inline");
    expect(theme).toContain("--color-jade-9: var(--jade-9);");
    expect(theme).toContain("--color-premium-9: var(--premium-9);");
    // Contract tokens (accent, default roles, radius) come from default.css.
    expect(theme).not.toContain("--color-accent-9");
    expect(theme).not.toContain("--color-danger-9");
    expect(tenants).not.toContain("--radius-sm");
  });
});
