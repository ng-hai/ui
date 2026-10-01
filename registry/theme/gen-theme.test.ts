import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  buildTheme,
  defaultOutDir,
  defineConfig,
  defineTheme,
  main,
  renderCss,
  renderTenantsCss,
  runCli,
} from "./gen-theme";

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

  it("keeps role pointers out of .dark (they are mode-independent)", () => {
    const dark = block(css, ".dark");
    expect(dark).not.toContain("--accent-9: var(");
    expect(dark).not.toContain("--danger-9: var(");
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
    ]) {
      expect(theme).toContain(line);
    }
    // The radius scale left the contract — apps own their own radii.
    expect(theme).not.toContain("--radius");
  });
});

describe("black/white alpha ramps", () => {
  it("emits the fixed ramps once in :root, not per mode", () => {
    const root = block(css, ":root");
    expect(root).toContain("--black-a1: oklch(0 0 0 / 0.05);");
    expect(root).toContain("--white-a12: oklch(1 0 0 / 0.95);");
    // No ramp *declarations* in .dark — references like var(--black-a8) are fine.
    expect(block(css, ".dark")).not.toMatch(/--(?:black|white)-a\d+:/);
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

describe("panel & scrim specials", () => {
  it("emits gray-contrast as a per-mode value", () => {
    expect(built.valueNames).toContain("gray-contrast");
    expect(block(css, ":root")).toContain("--gray-contrast: oklch");
    expect(block(css, ".dark")).toContain("--gray-contrast: oklch");
  });

  it("emits the specials as per-mode pointers (Radix Themes recipe)", () => {
    const root = block(css, ":root");
    expect(root).toContain("--panel-solid: oklch(1 0 0);");
    expect(root).toContain("--panel-translucent: var(--white-a9);");
    expect(root).toContain("--surface: var(--white-a11);");
    expect(root).toContain("--overlay: var(--black-a6);");
    const dark = block(css, ".dark");
    expect(dark).toContain("--panel-solid: var(--gray-2);");
    expect(dark).toContain("--panel-translucent: var(--gray-a2);");
    expect(dark).toContain("--surface: var(--black-a4);");
    expect(dark).toContain("--overlay: var(--black-a8);");
  });

  it("registers the special utilities in @theme inline", () => {
    const theme = block(css, "@theme inline");
    for (const line of [
      "--color-gray-contrast: var(--gray-contrast);",
      "--color-panel-solid: var(--panel-solid);",
      "--color-panel-translucent: var(--panel-translucent);",
      "--color-surface: var(--surface);",
      "--color-overlay: var(--overlay);",
    ]) {
      expect(theme).toContain(line);
    }
  });

  it("leaves the pointers out of tenants.css (they re-resolve through tenant values)", () => {
    expect(tenants).not.toContain("--panel-");
    expect(tenants).not.toContain("--overlay");
    expect(tenants).not.toMatch(/--surface:/);
  });

  it("reserves the special names as pool and role names", () => {
    expect(() => buildTheme({ name: "t", accents: { overlay: "#000000" } })).toThrow(/reserved/);
    expect(() =>
      buildTheme({ name: "t", accents: { blue: "#2563eb" }, semantics: { surface: "#ffffff" } }),
    ).toThrow(/reserved/);
  });
});

describe("gray accent & focus ring", () => {
  it("emits the Radix gray remap block in every standalone theme", () => {
    const gray = block(css, '[data-accent-color="gray"]');
    expect(gray).toContain("--accent-1: var(--gray-1);");
    expect(gray).toContain("--accent-8: var(--gray-8);");
    expect(gray).toContain("--accent-surface: var(--gray-surface);");
  });

  it("bakes the high-contrast treatment into the gray remap solid steps", () => {
    const gray = block(css, '[data-accent-color="gray"]');
    expect(gray).toContain("--accent-9: var(--gray-12);");
    expect(gray).toContain("--accent-10: var(--gray-12-hover);");
    expect(gray).toContain("--accent-contrast: var(--gray-1);");
    // Alphas stay 1:1 — only the solid steps get the high-contrast values.
    expect(gray).toContain("--accent-a9: var(--gray-a9);");
    expect(gray).toContain("--accent-a10: var(--gray-a10);");
  });

  it("emits gray-12-hover per mode (Radix's HC hover filter, flattened)", () => {
    expect(built.valueNames).toContain("gray-12-hover");
    // The dark filter overshoots on a near-white gray-12 and clips to white.
    expect(built.dark.get("gray-12-hover")).toMatch(/^#f{3}(?:f{3})?$/i);
    expect(built.light.get("gray-12-hover")).not.toBe(built.dark.get("gray-12-hover"));
    expect(block(css, "@theme inline")).toContain("--color-gray-12-hover: var(--gray-12-hover);");
  });

  it("re-points --focus-8 in pool swap blocks but not in the gray block", () => {
    expect(block(css, '[data-accent-color="jade"]')).toContain("--focus-8: var(--jade-8);");
    expect(block(css, '[data-accent-color="gray"]')).not.toContain("--focus-8");
  });

  it("declares --focus-8 per mode and registers its utility", () => {
    expect(block(css, ":root")).toContain("--focus-8: var(--accent-8);");
    expect(block(css, ".dark")).toContain("--focus-8: var(--accent-8);");
    expect(block(css, "@theme inline")).toContain("--color-focus-8: var(--focus-8);");
  });

  it("keeps the gray block and per-mode focus declarations out of tenants.css", () => {
    // Both layer in from the neutral default.css; tenant swap blocks still
    // re-point focus to their scoped hue.
    expect(tenants).not.toContain('[data-accent-color="gray"]');
    expect(block(tenants, ':root[data-tenant="acme"]')).not.toContain("--focus-8");
    expect(tenants).toContain("--focus-8: var(--jade-8);");
  });

  it("reserves gray and focus as pool and role names", () => {
    expect(() => buildTheme({ name: "t", accents: { gray: "#8b8d98" } })).toThrow(/reserved/);
    expect(() => buildTheme({ name: "t", accents: { focus: "#2563eb" } })).toThrow(/reserved/);
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
    // Contract tokens (accent, default roles) come from default.css.
    expect(theme).not.toContain("--color-accent-9");
    expect(theme).not.toContain("--color-danger-9");
    expect(tenants).not.toContain("--radius-sm");
  });
});

describe("config, output, and CLI", () => {
  const dirs: string[] = [];
  // Under the repo (not os.tmpdir) so vite can import the config file in the CLI test.
  const cache = join(process.cwd(), "node_modules/.cache");
  const project = (...subdirs: string[]) => {
    mkdirSync(cache, { recursive: true });
    const dir = mkdtempSync(join(cache, "gen-theme-"));
    dirs.push(dir);
    for (const d of subdirs) mkdirSync(join(dir, d));
    return dir;
  };
  afterEach(() => {
    vi.restoreAllMocks();
    for (const d of dirs.splice(0)) rmSync(d, { recursive: true, force: true });
  });
  const quiet = () => {
    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  };
  const config = defineConfig({ themes: [defineTheme({ name: "t", accents: { blue: "#2563eb" } })] });

  it("defaults outDir to src/styles/themes when ./src exists, else styles/themes", () => {
    const withSrc = project("src");
    const without = project();
    expect(defaultOutDir(withSrc)).toBe(join(withSrc, "src/styles/themes"));
    expect(defaultOutDir(without)).toBe(join(without, "styles/themes"));
  });

  it("writes the theme to the default outDir and skips tenants.css unless asked", () => {
    quiet();
    const cwd = project("src");
    main(config, cwd);
    expect(existsSync(join(cwd, "src/styles/themes/t/t.css"))).toBe(true);
    expect(existsSync(join(cwd, "src/styles/themes/tenants.css"))).toBe(false);
  });

  it("writes tenants.css when tenants is true, into a custom outDir", () => {
    quiet();
    const cwd = project();
    main({ ...config, tenants: true, outDir: "out" }, cwd);
    expect(existsSync(join(cwd, "out/t/t.css"))).toBe(true);
    expect(existsSync(join(cwd, "out/tenants.css"))).toBe(true);
  });

  it("prints the real output path", () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    main(config, project("src"));
    expect(log.mock.calls.flat().join("\n")).toContain("src/styles/themes/t/t.css");
  });

  it("writes a starter config, generates nothing, and exits non-zero when the config is missing", async () => {
    quiet();
    const cwd = project();
    expect(await runCli([], cwd)).toBe(1);
    const starter = readFileSync(join(cwd, "theme.config.ts"), "utf8");
    expect(starter).toContain("defineConfig");
    expect(starter).toContain('from "');
    expect(existsSync(join(cwd, "styles"))).toBe(false);
    expect(existsSync(join(cwd, "src"))).toBe(false);
  });

  it("loads the config file and generates from it", async () => {
    quiet();
    const cwd = project();
    const file = join(cwd, "custom.config.ts");
    writeFileSync(
      file,
      `export default { themes: [${JSON.stringify({ name: "c", accents: { jade: "#29a383" } })}], outDir: "gen" };`,
    );
    expect(await runCli(["custom.config.ts"], cwd)).toBe(0);
    expect(existsSync(join(cwd, "gen/c/c.css"))).toBe(true);
    expect(existsSync(join(cwd, "gen/tenants.css"))).toBe(false);
  });
});
