/**
 * bare-ui theme generator — turn brand seeds into accessible, light/dark token
 * sets for the bare-ui token contract. Installed via
 * `shadcn add ng-hai/bare-ui/theme-generator`.
 *
 * Fill in YOUR tenants in the THEMES array below (one entry per brand) — this is
 * your slot, like a component's empty `styles.ts`. Then run:
 *
 *   tsx scripts/gen-theme.ts        (or wire it as a package script)
 *
 * Per tenant it emits (under ./themes by default — change OUT_DIR):
 *   themes/<name>/<name>.css         — full token contract (drop-in default.css)
 *   themes/<name>/<name>.tokens.json — Tokens Studio file (Figma primitives + semantic)
 * plus one combined:
 *   themes/tenants.css               — [data-tenant]-scoped, render-blocking; pair
 *                                      with the `theme-brand` lib + neutral `theme`.
 *
 * Engine: Adobe Leonardo (contrast-anchored) — `ratios` are target WCAG contrast
 * ratios, so every step is accessible by construction; the printed self-check
 * proves it. Output HEX is converted to oklch() for the CSS via culori.
 * Requires: @adobe/leonardo-contrast-colors, culori (declared by the registry item).
 */
import { Theme, Color, BackgroundColor, type CssColor } from "@adobe/leonardo-contrast-colors";
import { converter, wcagContrast } from "culori";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

// Where generated files are written, relative to where you run the script
// (your project root). Change to taste, e.g. resolve(process.cwd(), "src/styles").
const OUT_DIR = resolve(process.cwd(), "themes");

// ──────────────────────────────────────────────────────────────────────────
// YOUR TENANTS — fill this in. One entry per brand. `brandKeys` is usually the
// only per-tenant difference; neutrals + destructive are typically shared.
// Replace the example below with your real tenants.
// ──────────────────────────────────────────────────────────────────────────
type ThemeConfig = {
  name: string;
  brandKeys: CssColor[]; // 1+ key colors; add a dark anchor to control the dark end's hue
  neutralKeys: CssColor[];
  destructiveKeys: CssColor[];
  ratios: Record<string, number>; // step -> target contrast ratio vs background
  lightness: { light: number; dark: number }; // background lightness 0-100 per mode
};

const RATIOS = {
  "50": 1.05, "100": 1.12, "200": 1.27, "300": 1.55, "400": 2.1,
  "500": 3.0, "600": 4.7, "700": 6.0, "800": 8.0, "900": 11, "950": 14,
};

const THEMES: ThemeConfig[] = [
  {
    name: "example", // → [data-tenant="example"] and themes/example/
    brandKeys: ["#2563EB"], // ← your brand seed (hex)
    neutralKeys: ["#8a8a8a"],
    destructiveKeys: ["#dc2626"],
    ratios: RATIOS,
    lightness: { light: 98, dark: 8 },
  },
];

// ──────────────────────────────────────────────────────────────────────────
// SEMANTIC MAP — token contract -> ramp reference (applied per mode).
// `ref` aliases a ramp step directly. `onOf` derives a readable foreground by
// picking whichever candidate has higher WCAG contrast against the base step.
// ──────────────────────────────────────────────────────────────────────────
type Sem = { ref: string } | { onOf: string; from: [string, string] };
const SEMANTIC: Record<string, Sem> = {
  background: { ref: "neutral.bg" },
  foreground: { ref: "neutral.950" },
  card: { ref: "neutral.50" },
  "card-foreground": { ref: "neutral.950" },
  popover: { ref: "neutral.50" },
  "popover-foreground": { ref: "neutral.950" },
  primary: { ref: "brand.500" }, // the vivid raw brand — derivation picks DARK text to keep AA
  "primary-foreground": { onOf: "brand.500", from: ["neutral.white", "neutral.black"] },
  secondary: { ref: "neutral.100" },
  "secondary-foreground": { ref: "neutral.950" },
  muted: { ref: "neutral.100" },
  "muted-foreground": { ref: "neutral.600" }, // deliberately mid-contrast
  accent: { ref: "neutral.100" },
  "accent-foreground": { ref: "neutral.950" },
  destructive: { ref: "destructive.600" },
  "destructive-foreground": { onOf: "destructive.600", from: ["neutral.white", "neutral.black"] },
  border: { ref: "neutral.200" },
  input: { ref: "neutral.200" },
  ring: { ref: "brand.500" }, // the vivid raw brand — great as a focus ring
};

const STEPS = Object.keys(RATIOS);
const toOklch = converter("oklch");

// hex -> `oklch(L C H)` matching the default.css notation (L is 0–1).
function oklch(hex: string): string {
  const c = toOklch(hex)!;
  const L = +c.l.toFixed(4);
  const C = +(c.c ?? 0).toFixed(4);
  const H = c.h == null || Number.isNaN(c.h) ? 0 : +c.h.toFixed(2);
  return `oklch(${L} ${C} ${H})`;
}

type Ramps = Record<string, Record<string, string>>; // group -> step -> hex

function buildRamps(cfg: ThemeConfig, lightness: number): Ramps {
  const ratios = Object.values(cfg.ratios);
  const neutral = new BackgroundColor({ name: "neutral", colorKeys: cfg.neutralKeys, ratios, colorSpace: "OKLCH" });
  const brand = new Color({ name: "brand", colorKeys: cfg.brandKeys, ratios, colorSpace: "OKLCH" });
  const destructive = new Color({ name: "destructive", colorKeys: cfg.destructiveKeys, ratios, colorSpace: "OKLCH" });
  const theme = new Theme({ colors: [neutral, brand, destructive], backgroundColor: neutral, lightness, output: "HEX" });
  const cc = theme.contrastColors as Array<any>;

  const ramps: Ramps = { neutral: { bg: cc[0].background }, brand: {}, destructive: {} };
  for (const group of cc.slice(1)) {
    group.values.forEach((v: any, i: number) => {
      ramps[group.name][STEPS[i]] = v.value;
    });
  }
  // pure poles for button/foreground derivation (mode-independent, max contrast)
  ramps.neutral.white = "#ffffff";
  ramps.neutral.black = "#0a0a0a";
  return ramps;
}

const refHex = (ramps: Ramps, ref: string) => {
  const [g, s] = ref.split(".");
  return ramps[g][s];
};

// resolve a semantic token -> { hex (for CSS), alias (for tokens.json) }
function resolveSem(ramps: Ramps, sem: Sem): { hex: string; alias: string } {
  if ("ref" in sem) return { hex: refHex(ramps, sem.ref), alias: `{${sem.ref}}` };
  const base = refHex(ramps, sem.onOf);
  const winner = sem.from.reduce((best, cand) =>
    wcagContrast(refHex(ramps, cand), base) > wcagContrast(refHex(ramps, best), base) ? cand : best,
  );
  return { hex: refHex(ramps, winner), alias: `{${winner}}` };
}

// ── CSS output ─────────────────────────────────────────────────────────────
function blockFor(ramps: Ramps): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [token, sem] of Object.entries(SEMANTIC)) out[token] = oklch(resolveSem(ramps, sem).hex);
  return out;
}

type Built = { cfg: ThemeConfig; light: Ramps; dark: Ramps };

// One render-blocking stylesheet for the whole (fixed) tenant set, scoped by
// [data-tenant]. Color tokens only — radius + the @theme inline mapping come
// from the neutral default.css. theme-brand sets <html data-tenant> from the URL.
function renderTenantsCss(built: Built[]): string {
  const order = Object.keys(SEMANTIC);
  const vars = (b: Record<string, string>) => order.map((t) => `  --${t}: ${b[t]};`).join("\n");
  const blocks = built
    .map(({ cfg, light, dark }) => {
      const sel = `:root[data-tenant="${cfg.name}"]`;
      return `${sel} {\n${vars(blockFor(light))}\n}\n\n${sel}.dark {\n${vars(blockFor(dark))}\n}`;
    })
    .join("\n\n");
  return `/**
 * Multi-tenant brand overrides — GENERATED by the bare-ui theme generator.
 * Tenants: ${built.map((b) => b.cfg.name).join(", ")}.
 *
 * Load AFTER the neutral default.css as a render-blocking <link> in <head>, and
 * set <html data-tenant="..."> from the URL (see the theme-brand lib):
 *
 *   @import "tailwindcss";
 *   @import "./styles/bare-ui-theme.css";    // neutral default (login / no tenant)
 *   @import "./styles/bare-ui-tenants.css";  // this file
 *
 * Brand (data-tenant) and mode (.dark) are independent axes; the ".dark" blocks
 * are their cross product. An unknown/absent slug falls back to the default.
 */
${blocks}
`;
}

function renderCss(cfg: ThemeConfig, light: Ramps, dark: Ramps): string {
  const order = Object.keys(SEMANTIC);
  const lb = blockFor(light);
  const db = blockFor(dark);
  const vars = (b: Record<string, string>) => order.map((t) => `  --${t}: ${b[t]};`).join("\n");
  const inline = order.map((t) => `  --color-${t}: var(--${t});`).join("\n");
  return `/**
 * ${cfg.name} theme — GENERATED by the bare-ui theme generator. Do not edit by hand.
 * Brand seed: ${cfg.brandKeys.join(", ")}. Re-run the generator to regenerate.
 * Same token contract as bare-ui's neutral default.css — a drop-in replacement.
 */
@custom-variant dark (&:is(.dark *));

:root {
  color-scheme: light;
${vars(lb)}

  --radius: 0.625rem;
}

.dark {
  color-scheme: dark;
${vars(db)}
}

@theme inline {
${inline}

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}
`;
}

// ── Tokens Studio output ─────────────────────────────────────────────────────
function primitiveSet(ramps: Ramps) {
  const set: Record<string, Record<string, { value: string; type: "color" }>> = {};
  for (const [group, steps] of Object.entries(ramps)) {
    set[group] = {};
    for (const [step, hex] of Object.entries(steps)) set[group][step] = { value: hex, type: "color" };
  }
  return set;
}

function semanticSet(ramps: Ramps) {
  const set: Record<string, { value: string; type: "color" }> = {};
  for (const [token, sem] of Object.entries(SEMANTIC)) set[token] = { value: resolveSem(ramps, sem).alias, type: "color" };
  return set;
}

function renderTokens(light: Ramps, dark: Ramps) {
  // Tokens Studio: a theme GROUP becomes a Figma collection; the themes inside it
  // become that collection's MODES (only when you "Export to Figma → from Themes",
  // which needs Tokens Studio Pro). Two groups → two collections, each Light/Dark.
  // If you're not Pro, build the Figma variables directly via the Plugin API instead.
  return {
    $metadata: { tokenSetOrder: ["primitives-light", "primitives-dark", "semantic-light", "semantic-dark"] },
    $themes: [
      { id: "prim-light", name: "Light", group: "Primitives", selectedTokenSets: { "primitives-light": "enabled" } },
      { id: "prim-dark", name: "Dark", group: "Primitives", selectedTokenSets: { "primitives-dark": "enabled" } },
      { id: "sem-light", name: "Light", group: "Semantic", selectedTokenSets: { "primitives-light": "source", "semantic-light": "enabled" } },
      { id: "sem-dark", name: "Dark", group: "Semantic", selectedTokenSets: { "primitives-dark": "source", "semantic-dark": "enabled" } },
    ],
    "primitives-light": primitiveSet(light),
    "primitives-dark": primitiveSet(dark),
    "semantic-light": semanticSet(light),
    "semantic-dark": semanticSet(dark),
  };
}

// ── contrast self-check (printed, so you SEE the guarantee) ──────────────────
function verify(name: string, ramps: Ramps) {
  const pairs: [string, string, string][] = [
    ["foreground", "background", "body text"],
    ["primary-foreground", "primary", "primary button"],
    ["destructive-foreground", "destructive", "destructive button"],
    ["muted-foreground", "background", "muted text"],
  ];
  console.log(`  ${name} contrast:`);
  for (const [fg, bg, label] of pairs) {
    const r = wcagContrast(resolveSem(ramps, SEMANTIC[fg]).hex, resolveSem(ramps, SEMANTIC[bg]).hex);
    const tag = r >= 4.5 ? "AA ✓" : r >= 3 ? "AA-large" : "FAIL";
    console.log(`    ${label.padEnd(20)} ${r.toFixed(2).padStart(6)}:1  ${tag}`);
  }
}

// ── main ─────────────────────────────────────────────────────────────────────
const origWarn = console.warn;
console.warn = (...a: any[]) => (String(a[0]).includes("deprecated") ? void 0 : origWarn(...a));

const built: Built[] = [];
for (const cfg of THEMES) {
  const light = buildRamps(cfg, cfg.lightness.light);
  const dark = buildRamps(cfg, cfg.lightness.dark);
  const outDir = resolve(OUT_DIR, cfg.name);
  mkdirSync(outDir, { recursive: true });

  writeFileSync(resolve(outDir, `${cfg.name}.css`), renderCss(cfg, light, dark));
  writeFileSync(resolve(outDir, `${cfg.name}.tokens.json`), JSON.stringify(renderTokens(light, dark), null, 2) + "\n");

  console.log(`\n✓ ${cfg.name}  →  themes/${cfg.name}/${cfg.name}.css  +  ${cfg.name}.tokens.json`);
  verify("light", light);
  verify("dark", dark);
  built.push({ cfg, light, dark });
}

// Combined render-blocking stylesheet: every tenant, scoped by [data-tenant].
mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(resolve(OUT_DIR, "tenants.css"), renderTenantsCss(built));
console.log(`\n✓ tenants.css  →  themes/tenants.css  (${built.length} tenants: ${built.map((b) => b.cfg.name).join(", ")})`);

console.warn = origWarn;
