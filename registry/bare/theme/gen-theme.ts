/**
 * bare-ui theme generator — turn brand seeds into Radix-style 12-step color
 * scales for the bare-ui token contract. Installed via
 * `shadcn add ng-hai/bare-ui/theme-generator`.
 *
 * Fill in YOUR tenants in the THEMES array below (one entry per brand) — this is
 * your slot, like a component's empty `styles.ts`. Then run:
 *
 *   tsx scripts/gen-theme.ts        (or wire it as a package script)
 *
 * Per tenant it emits (under ./themes by default — change OUT_DIR):
 *   themes/<name>/<name>.css         — full token contract (drop-in default.css)
 *   themes/<name>/<name>.tokens.json — Tokens Studio file (Figma Light/Dark modes)
 * plus one combined:
 *   themes/tenants.css               — [data-tenant]-scoped, render-blocking; pair
 *                                      with the `theme-brand` lib + neutral `theme`.
 *
 * Engine: Radix Colors' own custom-palette algorithm (`generateRadixColors`,
 * vendored from radix-ui/website, MIT — shipped self-contained as the sibling
 * ./generate-radix-colors in this same scripts/ folder). Given a
 * brand `accent`, a `gray`, and a page `background`, it bends the nearest Radix
 * reference scale toward your brand, pins step 9 to your exact brand color, and
 * returns the full 12-step scale — solid + alpha + a legible `accentContrast`.
 *
 * The 12 steps carry Radix's role semantics (https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale):
 *   1  app background          7  border / focus ring
 *   2  subtle background       8  hovered border
 *   3  component background    9  solid (the pure brand)
 *   4  hovered component       10 solid hover
 *   5  active / selected       11 low-contrast text
 *   6  subtle border           12 high-contrast text
 *
 * Radix optimizes perceptual quality, not WCAG-2 ratios — step 9 is "legible"
 * but not guaranteed AA. The printed self-check VERIFIES every text pair and
 * WARNS (does not fail) when a pair misses AA, so you see it.
 *
 * Requires @radix-ui/colors, colorjs.io, bezier-easing + tsx (declared by the
 * theme-generator registry item). Install: `npx shadcn@latest add ng-hai/bare-ui/theme-generator`.
 */
import Color from "colorjs.io";
import * as RadixColors from "@radix-ui/colors";
import { generateRadixColors } from "./generate-radix-colors";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Where generated files are written, relative to where you run the script
// (your project root). Change to taste, e.g. resolve(process.cwd(), "src/styles").
const OUT_DIR = resolve(process.cwd(), "themes");

// ──────────────────────────────────────────────────────────────────────────
// YOUR TENANTS — fill this in. One entry per brand.
//
// Radix's model is SIX seeds — accent / gray / background, each independent for
// light and dark (https://www.radix-ui.com/colors/custom). So each seed here is
// either a `string` (same in both modes) OR `{ light, dark }` to tune them apart.
// A brand color tuned for a white page often needs brightening on dark; that's
// what the per-mode form is for: `accent: { light: "#2563eb", dark: "#5b7cf0" }`.
//
// `gray` defaults to one of Radix's five tinted gray scales, paired to the accent by
// hue — Radix's "natural pairing" (blue→slate, jade→sage, orange→sand; warm hues→cool
// mauve) — so the neutral carries a clean, calibrated tint instead of a synthesized
// one (a hueless brand gets a near-neutral gray). `background` defaults to that paired
// gray's step 1 (the "app background" role). Pass an explicit gray / background to override.
// ──────────────────────────────────────────────────────────────────────────
type Seed = string | { light: string; dark: string };

export type ThemeConfig = {
  name: string; // → [data-tenant="<name>"] and themes/<name>/
  accent: Seed; // brand seed — becomes accent step 9
  gray?: Seed; // neutral seed — defaults to the Radix gray paired to the accent's hue
  danger?: Seed; // destructive/error seed — defaults to a Radix red
  background?: { light: string; dark: string }; // page bg per mode — defaults to paired gray step 1
};

// Radix-aligned default for the destructive scale (≈ Radix red 9). For a chromatic
// brand the neutral gray + page background come from Radix's own gray scales, picked
// by the accent's hue (see grayPairName / radixGray); a hueless brand uses NEUTRAL_GRAY.
const DEFAULT_DANGER = "#e5484d";

const THEMES: ThemeConfig[] = [
  {
    name: "example", // → [data-tenant="example"] and themes/example/
    accent: "#2563eb", // ← your brand seed; or { light: "...", dark: "..." }
  },
];

// ── scales + token ordering ──────────────────────────────────────────────────
// Three scales make up the contract: gray (neutral chrome), accent (brand),
// danger (destructive). Each ships solid (1–12) + alpha (a1–a12).
const SCALES = ["gray", "accent", "danger"] as const;
type Appearance = "light" | "dark";

// A resolved palette for one mode: token name -> color string (any CSS color).
type ModeTokens = Map<string, string>;

const pick = (seed: Seed, a: Appearance): string => (typeof seed === "string" ? seed : seed[a]);

// Radix's five *tinted* gray scales. We never synthesize a gray — we pick one of
// these by the accent's hue and let generateRadixColors re-light it to the page, so
// the neutral stays as clean as Radix's own (a synthesized gray over-saturates and,
// for warm accents, goes muddy). Radix's *pure* `gray` is intentionally absent: it
// has zero chroma, and generateRadixColors divides 0/0 on a chroma-less seed.
type GrayName = "mauve" | "slate" | "sage" | "olive" | "sand";

// Hueless brands still need a neutral, but a chroma-0 seed crashes the generator (see
// above), so use a barely-tinted neutral — visually pure, numerically safe (≈ Radix gray 9).
const NEUTRAL_GRAY = "#8b8d98";

// Accent OKLCH hue → paired gray scale, or null for a hueless / near-neutral accent
// (→ NEUTRAL_GRAY). These are color families, not exact-hue matches: warm accents
// (red/pink/purple) pair with the cool mauve, never a muddy warm gray.
// https://www.radix-ui.com/colors/docs/palette-composition/composing-a-palette
function grayPairName(accent: string): GrayName | null {
  const c = new Color(accent).to("oklch");
  const h = c.coords[2];
  const chroma = c.coords[1] ?? 0;
  if (h == null || Number.isNaN(h) || chroma < 0.02) return null;
  if (h >= 60 && h < 120) return "sand"; // yellow / amber / orange / brown
  if (h >= 120 && h < 160) return "olive"; // grass / lime
  if (h >= 160 && h < 220) return "sage"; // green / jade / teal / mint
  if (h >= 220 && h < 300) return "slate"; // blue / indigo / cyan / sky
  return "mauve"; // red / pink / crimson / plum / purple / violet (wraps 300→60)
}

// A step (1-based) from a Radix reference gray, in the given appearance. These are
// package constants, so using step 1 as the background seed is NOT circular: the
// value exists before generateRadixColors runs (which then re-lights gray-1 ≈ it).
function radixGray(name: GrayName, a: Appearance, step: number): string {
  const scale = (RadixColors as Record<string, Record<string, string>>)[
    a === "light" ? `${name}P3` : `${name}DarkP3`
  ];
  // Normalize to an sRGB hex seed: generateRadixColors' alpha math expects a plain
  // hex background, and the wide-gamut output is regenerated from the seed anyway.
  return new Color(Object.values(scale)[step - 1]).to("srgb").toString({ format: "hex" });
}

// Resolve the four seeds for one appearance. When the brand is chromatic, gray +
// background default to the paired Radix gray — its step 9 as the gray seed (peak
// chroma, reproduces the scale), its step 1 (the "app background" role) as the page.
// A hueless brand gets NEUTRAL_GRAY on a flat white / near-black page. Both stay
// overridable per tenant via cfg.gray / cfg.background.
function resolveSeeds(cfg: ThemeConfig, a: Appearance) {
  const accent = pick(cfg.accent, a);
  const pair = grayPairName(accent);
  const graySeed = pair ? radixGray(pair, a, 9) : NEUTRAL_GRAY;
  const defaultBg = pair ? radixGray(pair, a, 1) : a === "light" ? "#ffffff" : "#111111";
  return {
    accent,
    gray: cfg.gray ? pick(cfg.gray, a) : graySeed,
    danger: cfg.danger ? pick(cfg.danger, a) : DEFAULT_DANGER,
    background: cfg.background ? cfg.background[a] : defaultBg,
  };
}

// Build every token for one appearance. accent + gray come from one run; danger
// is a second run seeded by the destructive color (its accentScale is our danger).
export function buildModeTokens(cfg: ThemeConfig, appearance: Appearance): ModeTokens {
  const c = resolveSeeds(cfg, appearance);
  const background = c.background;
  const main = generateRadixColors({ appearance, accent: c.accent, gray: c.gray, background });
  const danger = generateRadixColors({ appearance, accent: c.danger, gray: c.gray, background });

  const solid: Record<(typeof SCALES)[number], string[]> = {
    gray: main.grayScale,
    accent: main.accentScale,
    danger: danger.accentScale,
  };
  const alpha: Record<(typeof SCALES)[number], string[]> = {
    gray: main.grayScaleAlpha,
    accent: main.accentScaleAlpha,
    danger: danger.accentScaleAlpha,
  };

  const t: ModeTokens = new Map();
  for (const s of SCALES) {
    solid[s].forEach((hex, i) => t.set(`${s}-${i + 1}`, hex));
    alpha[s].forEach((hex, i) => t.set(`${s}-a${i + 1}`, hex));
  }
  // Step-9 foregrounds (legible text/icon on the solid step).
  t.set("accent-contrast", main.accentContrast);
  t.set("danger-contrast", danger.accentContrast);
  // Translucent panel fills (Radix "surface").
  t.set("gray-surface", main.graySurface);
  t.set("accent-surface", main.accentSurface);
  t.set("danger-surface", danger.accentSurface);
  // App-level specials.
  t.set("background", main.background);
  t.set("overlay", appearance === "light" ? "#00000066" : "#00000099");
  return t;
}

// The ordered token-name list (shared by every mode — names are deterministic).
const TOKEN_ORDER = [...buildModeTokens({ name: "_", accent: "#000" }, "light").keys()];

// ── color formatting ─────────────────────────────────────────────────────────
// Any CSS color (hex6, hex8, rgba(), named) -> `oklch(L C H[ / a])`, L as 0–1 to
// match the notation in default.css.
function oklch(input: string): string {
  const c = new Color(input).to("oklch");
  const [l, ch, h] = c.coords; // achromatic colors report a null hue
  const L = +(l ?? 0).toFixed(4);
  const C = +(ch ?? 0).toFixed(4);
  const H = h == null || Number.isNaN(h) ? 0 : +h.toFixed(2);
  const a = c.alpha;
  const alpha = a != null && a < 1 ? ` / ${+a.toFixed(4)}` : "";
  return `oklch(${L} ${C} ${H}${alpha})`;
}

// ── CSS rendering ────────────────────────────────────────────────────────────
function declarations(tokens: ModeTokens, indent = "  "): string {
  // Grouped with blank lines between scales for readability.
  const lines: string[] = [];
  let prev = "";
  for (const name of TOKEN_ORDER) {
    const group = name.replace(/-a?\d+$/, "").split("-")[0];
    if (prev && group !== prev) lines.push("");
    lines.push(`${indent}--${name}: ${oklch(tokens.get(name)!)};`);
    prev = group;
  }
  return lines.join("\n");
}

function themeInline(): string {
  const lines = TOKEN_ORDER.map((name) => `  --color-${name}: var(--${name});`);
  return lines.join("\n");
}

const RADIUS_BLOCK = `  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);`;

// One standalone stylesheet (same shape as the neutral default.css).
export function renderCss(name: string, light: ModeTokens, dark: ModeTokens, header?: string): string {
  const head =
    header ??
    `/**
 * ${name} theme — GENERATED by the bare-ui theme generator. Do not edit by hand.
 * Radix-style 12-step contract (gray / accent / danger, solid + alpha), same
 * token names as bare-ui's neutral default.css — a drop-in replacement.
 * Re-run the generator to regenerate.
 */`;
  return `${head}
@custom-variant dark (&:is(.dark *));

:root {
  color-scheme: light;
${declarations(light)}

  --radius: 0.625rem;
}

.dark {
  color-scheme: dark;
${declarations(dark)}
}

@theme inline {
${themeInline()}

${RADIUS_BLOCK}
}
`;
}

// Combined render-blocking stylesheet for the whole (fixed) tenant set, scoped by
// [data-tenant]. Color tokens only — radius + the @theme inline mapping come from
// the neutral default.css. theme-brand sets <html data-tenant> from the URL.
function renderTenantsCss(built: Built[]): string {
  const blocks = built
    .map(({ cfg, light, dark }) => {
      const sel = `:root[data-tenant="${cfg.name}"]`;
      return `${sel} {\n${declarations(light)}\n}\n\n${sel}.dark {\n${declarations(dark)}\n}`;
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

// ── Tokens Studio output ─────────────────────────────────────────────────────
function primitiveSet(tokens: ModeTokens) {
  const set: Record<string, Record<string, { value: string; type: "color" }>> = {};
  for (const s of SCALES) set[s] = {};
  const extra: Record<string, { value: string; type: "color" }> = {};
  for (const [name, value] of tokens) {
    const m = name.match(/^(gray|accent|danger)-(a?\d+)$/);
    if (m) set[m[1]][m[2]] = { value, type: "color" };
    else extra[name] = { value, type: "color" };
  }
  return { ...set, tokens: extra };
}

function renderTokens(light: ModeTokens, dark: ModeTokens) {
  // A Tokens Studio GROUP becomes a Figma collection; its themes become that
  // collection's MODES (needs Tokens Studio Pro to "Export to Figma → from
  // Themes"). One Primitives collection here, Light/Dark modes.
  return {
    $metadata: { tokenSetOrder: ["primitives-light", "primitives-dark"] },
    $themes: [
      { id: "prim-light", name: "Light", group: "Primitives", selectedTokenSets: { "primitives-light": "enabled" } },
      { id: "prim-dark", name: "Dark", group: "Primitives", selectedTokenSets: { "primitives-dark": "enabled" } },
    ],
    "primitives-light": primitiveSet(light),
    "primitives-dark": primitiveSet(dark),
  };
}

// ── contrast self-check (printed, so you SEE the guarantee — or its absence) ──
function verify(name: string, tokens: ModeTokens) {
  const ratio = (fg: string, bg: string) =>
    new Color(tokens.get(fg)!).contrast(new Color(tokens.get(bg)!), "WCAG21");
  const pairs: [string, string, string][] = [
    ["gray-12", "gray-1", "body text"],
    ["gray-11", "gray-1", "muted text"],
    ["accent-contrast", "accent-9", "solid accent button"],
    ["danger-contrast", "danger-9", "solid danger button"],
    ["accent-11", "gray-1", "accent text"],
  ];
  console.log(`  ${name} contrast:`);
  for (const [fg, bg, label] of pairs) {
    const r = ratio(fg, bg);
    const tag = r >= 4.5 ? "AA ✓" : r >= 3 ? "AA-large" : "FAIL";
    const warn = r < 4.5 ? "  ⚠ below AA (4.5:1) for normal text" : "";
    console.log(`    ${label.padEnd(22)} ${r.toFixed(2).padStart(6)}:1  ${tag}${warn}`);
  }
}

// ── main ─────────────────────────────────────────────────────────────────────
type Built = { cfg: ThemeConfig; light: ModeTokens; dark: ModeTokens };

export function main(themes: ThemeConfig[] = THEMES) {
  const built: Built[] = [];
  for (const cfg of themes) {
    const light = buildModeTokens(cfg, "light");
    const dark = buildModeTokens(cfg, "dark");
    const outDir = resolve(OUT_DIR, cfg.name);
    mkdirSync(outDir, { recursive: true });

    writeFileSync(resolve(outDir, `${cfg.name}.css`), renderCss(cfg.name, light, dark));
    writeFileSync(resolve(outDir, `${cfg.name}.tokens.json`), JSON.stringify(renderTokens(light, dark), null, 2) + "\n");

    console.log(`\n✓ ${cfg.name}  →  themes/${cfg.name}/${cfg.name}.css  +  ${cfg.name}.tokens.json`);
    verify("light", light);
    verify("dark", dark);
    built.push({ cfg, light, dark });
  }

  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(resolve(OUT_DIR, "tenants.css"), renderTenantsCss(built));
  console.log(`\n✓ tenants.css  →  themes/tenants.css  (${built.length} tenants: ${built.map((b) => b.cfg.name).join(", ")})`);
}

// Run only when invoked directly (so the render helpers can be imported too).
const invokedDirectly = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) main();
