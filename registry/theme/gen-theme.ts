/**
 * ui theme generator — turn brand seeds into Radix-style 12-step color
 * scales for the ui token contract. Installed via
 * `shadcn add ng-hai/ui/theme-generator`.
 *
 * Your themes live in a config file, not in this script — it is your slot, like
 * a component's empty `styles.ts`. Run:
 *
 *   tsx scripts/gen-theme.ts [config]     (config defaults to ./theme.config.ts)
 *
 * With no config file it writes a starter `theme.config.ts` and exits non-zero;
 * edit it (one `defineTheme` entry per brand) and run again:
 *
 *   import { defineConfig, defineTheme } from "./scripts/gen-theme";
 *   export default defineConfig({
 *     themes: [defineTheme({ name: "acme", accents: { blue: "#2563eb" } })],
 *     // outDir: "src/styles/themes",  // default: src/styles/themes if ./src exists, else styles/themes
 *     // tenants: true,                // also write tenants.css (see below)
 *   });
 *
 * Per theme it emits <outDir>/<name>/<name>.css — the full token contract, a
 * complete drop-in (no `theme` item needed): `@import "./themes/<name>/<name>.css"`
 * from your CSS. Multi-tenant setups opt in with `tenants: true` for one more file:
 *   <outDir>/tenants.css             — [data-tenant]-scoped, render-blocking; layers
 *                                      over the neutral default.css, so also run
 *                                      `shadcn add ng-hai/ui/theme ng-hai/ui/theme-brand`.
 *
 * ## The model: an accent pool + semantic roles
 *
 * `accents` is a pool of named identity scales. Every entry becomes a full
 * scale (`--<name>-1..12`, `-a1..a12`, `-contrast`, `-surface`), a set of
 * Tailwind utilities (`bg-<name>-9`, …), and a `[data-accent-color="<name>"]`
 * swap block. The FIRST key is the default accent: `--accent-*` points at it,
 * and its hue drives the gray pairing + page background defaults.
 *
 * `--accent-*` stays the component-facing contract. Because utilities are wired
 * through `@theme inline` (they emit `var(--accent-9)` directly), setting
 * `data-accent-color="<name>"` on ANY element re-points `--accent-*` for that
 * subtree — a slot filled once with accent utilities gets every pool hue for
 * free, and Base UI forwards `data-*` props, so no component API is needed:
 *
 *   <Badge.Root data-accent-color="jade">   // a3 fill / a6 rim recipe, now jade
 *
 * Only `accents` keys are valid attribute values; an unknown name is your bug.
 *
 * Every theme also carries the contract's fixed `--black-a1..12` /
 * `--white-a1..12` ramps (Radix blackA/whiteA) — mode-independent tints for
 * imagery, scrims, and text/icons on colored solids — plus the chrome
 * specials: `--gray-contrast` (text on the gray-9 solid) and the panel/scrim
 * pointers `--panel-solid` / `--panel-translucent` / `--surface` / `--overlay`
 * (Radix Themes' recipe: white/whiteA in light; gray-2/gray-a2 + blackA in
 * dark, so dark panels re-tint with the theme gray). `black`, `white`, and the
 * special names are therefore reserved.
 *
 * Every theme also emits Radix Themes' `[data-accent-color="gray"]` remap —
 * gray-as-accent, onto the theme's gray ramp with the high-contrast treatment
 * baked in: solids ride the near-black/near-white gray-12 (`accent-9` →
 * `gray-12`, `accent-10` → `--gray-12-hover`, a per-mode value flattened from
 * Radix's solid high-contrast hover filter, `accent-contrast` → `gray-1`),
 * everything else 1:1 — so `bg-accent-9 text-accent-contrast` stays legible
 * when neutralized instead of landing on the washed-out gray-9. Plus a
 * `--focus-8` focus token that follows the accent: pool swap blocks re-point
 * it, the gray block deliberately does not (a neutral subtree keeps the brand
 * focus ring).
 *
 * `semantics` maps role names to either an `accents` KEY (alias — the role's
 * tokens become pointers to that pool scale; zero extra generation) or a color
 * seed (a private scale — values only: no swap block, no named utilities). A
 * string matching a pool key is an alias; anything else must parse as a CSS
 * color. Roles express meaning and are NOT swappable via data-accent-color —
 * if you want a role's hue as a swappable identity too, put it in the pool and
 * alias it. Roles are OPT-IN: a theme without `semantics` generates the accent
 * pool only — no status scales. danger / warning / success / info are the
 * contract's conventional status roles (good seeds ≈ the named Radix step 9:
 * red #e5484d, amber #ffc53d, green #30a46c, blue #0090ff); custom roles
 * (e.g. `premium: "jade"`) are allowed. Note the standalone per-theme CSS then
 * contains only what you declared — if your components use `text-danger-11`,
 * declare `danger`. Under tenants.css an undeclared role simply falls through
 * to the neutral default.css values it layers over.
 *
 * Radix's seed model applies per scale — every seed is either a `string` (same
 * in both modes) or `{ light, dark }` (https://www.radix-ui.com/colors/custom):
 * a brand tuned for a white page often needs brightening on dark, e.g.
 * `accents: { blue: { light: "#2563eb", dark: "#5b7cf0" } }`.
 *
 * `gray` defaults to one of Radix's five tinted gray scales, paired to the
 * DEFAULT accent by hue — Radix's "natural pairing" (blue→slate, jade→sage,
 * orange→sand; warm hues→cool mauve) — and `background` to that gray's step 1.
 * Both are singular per theme on purpose: every scale in the pool is bent to
 * the same page (that keeps the alpha ramps honest on tinted backgrounds), and
 * one chrome per app is the point of gray. Override per theme to taste.
 *
 * Engine: Radix Colors' own custom-palette algorithm (`generateRadixColors`,
 * vendored from radix-ui/website, MIT — shipped self-contained as the sibling
 * ./generate-radix-colors in this same scripts/ folder). Given an accent seed,
 * a gray, and a page background, it bends the nearest Radix reference scale
 * toward the seed, pins step 9 to it exactly, and returns the full 12-step
 * scale — solid + alpha + a legible contrast color for the step-9 solid.
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
 * theme-generator registry item). Install: `npx shadcn@latest add ng-hai/ui/theme-generator`.
 */
import Color from "colorjs.io";
import * as RadixColors from "@radix-ui/colors";
import { generateRadixColors } from "./generate-radix-colors";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

type Seed = string | { light: string; dark: string };

export type ThemeConfig = {
  name: string; // → [data-tenant="<name>"] and <outDir>/<name>/
  /** Pool of named identity scales. FIRST key = the default accent (--accent-*). */
  accents: Record<string, Seed>;
  /**
   * Role → `accents` key (alias) | color seed (private scale). Opt-in — omit
   * it and no role scales are generated. Conventional names: danger / warning
   * / success / info. A pool key wins over a same-named CSS color; custom
   * roles are allowed.
   */
  semantics?: Record<string, string | Seed>;
  gray?: Seed; // neutral seed — defaults to the Radix gray paired to the default accent
  background?: { light: string; dark: string }; // page bg per mode — defaults to paired gray step 1
};

/**
 * Identity helper for `themes` entries: `semantics` aliases autocomplete from
 * your `accents` keys (any other string is treated as a CSS color at runtime).
 */
export function defineTheme<const A extends Record<string, Seed>>(config: {
  name: string;
  accents: A;
  semantics?: Record<string, (keyof A & string) | (string & {}) | { light: string; dark: string }>;
  gray?: Seed;
  background?: { light: string; dark: string };
}): ThemeConfig {
  return config;
}

export type Config = {
  themes: ThemeConfig[];
  /** Where files are written, relative to cwd. Default: `src/styles/themes` if ./src exists, else `styles/themes`. */
  outDir?: string;
  /** Also write tenants.css (multi-tenant setups; needs the neutral `theme` + `theme-brand` items). Default: false. */
  tenants?: boolean;
};

/** Identity helper for the config file's default export. */
export const defineConfig = (config: Config): Config => config;

// Status roles the neutral default.css defines and registers utilities for.
// The generator does NOT seed them by itself — semantics are opt-in — but
// tenants.css layers over default.css, so its delta @theme inline must not
// re-register these names.
const CONTRACT_ROLES = ["danger", "warning", "success", "info"];

// ── names, roles, validation ─────────────────────────────────────────────────
type Appearance = "light" | "dark";

// A resolved palette for one mode: token name -> color string (any CSS color).
type ModeTokens = Map<string, string>;

const pick = (seed: Seed, a: Appearance): string => (typeof seed === "string" ? seed : seed[a]);

// The 26 tokens of a full scale — shared by value emission, role pointers, and
// data-accent-color swap blocks.
const SCALE_SUFFIXES = [
  ...Array.from({ length: 12 }, (_, i) => `${i + 1}`),
  ...Array.from({ length: 12 }, (_, i) => `a${i + 1}`),
  "contrast",
  "surface",
];

// Pool / role names become CSS vars (--<name>-9) and Tailwind utilities
// (bg-<name>-9), so keep them kebab-safe and away from the contract's own names.
const NAME_RE = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
const RESERVED = new Set([
  "gray", "accent", "background", "black", "white",
  "overlay", "surface", "panel", "panel-solid", "panel-translucent", "focus",
]);

type Roles = {
  aliased: Map<string, string>; // role -> pool name
  seeded: Map<string, Seed>; // role -> own seed (private scale)
};

function resolveRoles(cfg: ThemeConfig): Roles {
  const aliased = new Map<string, string>();
  const seeded = new Map<string, Seed>();
  for (const [role, value] of Object.entries(cfg.semantics ?? {})) {
    if (typeof value === "string" && value in cfg.accents) {
      aliased.set(role, value); // a pool key wins over a same-named CSS color
      continue;
    }
    if (typeof value === "string") {
      try {
        new Color(value);
      } catch {
        throw new Error(
          `theme "${cfg.name}": semantics.${role}: "${value}" is neither an accents key ` +
            `(${Object.keys(cfg.accents).join(", ")}) nor a valid CSS color`,
        );
      }
    }
    seeded.set(role, value);
  }
  return { aliased, seeded };
}

function validate(cfg: ThemeConfig): void {
  const poolNames = Object.keys(cfg.accents);
  if (poolNames.length === 0) {
    throw new Error(`theme "${cfg.name}": accents needs at least one entry — the first key is the default accent`);
  }
  const roleNames = Object.keys(cfg.semantics ?? {});
  for (const n of [...poolNames, ...roleNames]) {
    if (!NAME_RE.test(n)) {
      throw new Error(`theme "${cfg.name}": "${n}" must be lowercase kebab-case (it becomes --${n}-* / bg-${n}-9)`);
    }
    if (RESERVED.has(n)) throw new Error(`theme "${cfg.name}": "${n}" is reserved by the token contract`);
  }
  for (const n of poolNames) {
    if (roleNames.includes(n)) {
      throw new Error(
        `theme "${cfg.name}": "${n}" is both an accents key and a semantic role — the --${n}-* tokens would collide`,
      );
    }
  }
}

// ── seed resolution ──────────────────────────────────────────────────────────
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

// Gray + page background for one appearance — both driven by the DEFAULT accent
// (the pool's first entry) and shared by every scale in the theme. A chromatic
// default pairs a Radix tinted gray (its step 9 as the gray seed, its step 1 —
// the "app background" role — as the page); a hueless one gets NEUTRAL_GRAY on
// a flat white / near-black page. Both stay overridable via cfg.gray / cfg.background.
function resolveChrome(cfg: ThemeConfig, a: Appearance) {
  const defaultAccent = pick(Object.values(cfg.accents)[0], a);
  const pair = grayPairName(defaultAccent);
  return {
    gray: cfg.gray ? pick(cfg.gray, a) : pair ? radixGray(pair, a, 9) : NEUTRAL_GRAY,
    background: cfg.background
      ? cfg.background[a]
      : pair
        ? radixGray(pair, a, 1)
        : a === "light"
          ? "#ffffff"
          : "#111111",
  };
}

// Radix Themes' solid high-contrast hover (base-button.css), flattened to a
// value — a token can't carry a CSS filter. The filter ops run in sRGB:
// contrast, saturate (Rec. 709 luma), brightness, then clamp. Applied to
// gray-12 per mode; the dark filter overshoots on a near-white gray-12 and
// clips to pure white — that's Radix's own hover, not an error.
const HC_HOVER_FILTER: Record<Appearance, [contrast: number, saturate: number, brightness: number]> = {
  light: [0.88, 1.1, 1.1],
  dark: [0.88, 1.3, 1.18],
};
function grayHcHover(gray12: string, a: Appearance): string {
  const [contrast, saturate, brightness] = HC_HOVER_FILTER[a];
  const rgb = new Color(gray12).to("srgb").coords.map((c) => ((c ?? 0) - 0.5) * contrast + 0.5);
  const luma = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  const [r, g, b] = rgb.map((c) => Math.min(1, Math.max(0, (luma + saturate * (c - luma)) * brightness)));
  return new Color("srgb", [r, g, b]).toString({ format: "hex" });
}

// ── build ────────────────────────────────────────────────────────────────────
export type BuiltTheme = {
  cfg: ThemeConfig;
  poolNames: string[]; // accents keys; [0] = default accent
  aliases: Map<string, string>; // role -> pool name ("accent" always first)
  seededRoles: string[]; // roles with a private scale (value tokens)
  valueNames: string[]; // ordered value-token names (identical in both modes)
  light: ModeTokens;
  dark: ModeTokens;
};

// Every value token for one appearance. gray + the default accent come from ONE
// run (gray is its gray side); every other pool entry and every seeded role is
// its own run sharing the app gray + background, so all neutral steps, alphas,
// and surfaces blend with the same page.
function buildModeTokens(cfg: ThemeConfig, roles: Roles, appearance: Appearance): ModeTokens {
  const { gray, background } = resolveChrome(cfg, appearance);
  const run = (accent: string) => generateRadixColors({ appearance, accent, gray, background });

  const poolNames = Object.keys(cfg.accents);
  const main = run(pick(cfg.accents[poolNames[0]], appearance));

  const t: ModeTokens = new Map();
  // A colored scale: solid 1–12 + alpha a1–a12 + step-9 contrast text + surface.
  const emit = (name: string, r: ReturnType<typeof generateRadixColors>) => {
    r.accentScale.forEach((hex, i) => t.set(`${name}-${i + 1}`, hex));
    r.accentScaleAlpha.forEach((hex, i) => t.set(`${name}-a${i + 1}`, hex));
    t.set(`${name}-contrast`, r.accentContrast); // legible text/icon on the solid step
    t.set(`${name}-surface`, r.accentSurface); // translucent panel fill
  };
  // gray (chrome): the gray side of the main run. Its contrast (text on the
  // gray-9 solid) takes one extra run with gray in the accent seat — the
  // engine only computes a contrast color for its accent.
  main.grayScale.forEach((hex, i) => t.set(`gray-${i + 1}`, hex));
  main.grayScaleAlpha.forEach((hex, i) => t.set(`gray-a${i + 1}`, hex));
  t.set("gray-contrast", run(gray).accentContrast);
  t.set("gray-surface", main.graySurface);
  // Hover for the gray-as-accent high-contrast solid (see grayBlock).
  t.set("gray-12-hover", grayHcHover(main.grayScale[11], appearance));
  // the pool: default accent from the main run, the rest one run each.
  emit(poolNames[0], main);
  for (const n of poolNames.slice(1)) emit(n, run(pick(cfg.accents[n], appearance)));
  // private (seeded) roles — same machine.
  for (const [role, seed] of roles.seeded) emit(role, run(pick(seed, appearance)));
  // App-level special.
  t.set("background", main.background);
  return t;
}

export function buildTheme(cfg: ThemeConfig): BuiltTheme {
  validate(cfg);
  const roles = resolveRoles(cfg);
  const poolNames = Object.keys(cfg.accents);
  const aliases = new Map<string, string>([["accent", poolNames[0]], ...roles.aliased]);
  const light = buildModeTokens(cfg, roles, "light");
  const dark = buildModeTokens(cfg, roles, "dark");
  return {
    cfg,
    poolNames,
    aliases,
    seededRoles: [...roles.seeded.keys()],
    valueNames: [...light.keys()],
    light,
    dark,
  };
}

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

// Radix's fixed black/white alpha ramps (@radix-ui/colors blackA / whiteA).
// Mode-independent constants — declared once in :root, never per mode; tenants.css
// skips them entirely (they come from the neutral default.css it layers over).
const BW_SCALES = ["black", "white"] as const;
const bwNames = BW_SCALES.flatMap((n) => Array.from({ length: 12 }, (_, i) => `${n}-a${i + 1}`));
function bwDeclarations(indent = "  "): string {
  return BW_SCALES.map((name) => {
    const ramp = (RadixColors as unknown as Record<string, Record<string, string>>)[`${name}A`];
    return Object.values(ramp)
      .map((v, i) => `${indent}--${name}-a${i + 1}: ${oklch(v)};`)
      .join("\n");
  }).join("\n\n");
}

// Panel & scrim specials — Radix Themes' recipe (radix-ui/themes color.css),
// expressed as per-mode POINTERS: light panels are paper-white constants, dark
// panels ride the theme gray (a panel must sit lighter than the near-black page
// and carry its tint), scrims stay black and never flip with the palette.
// Pointers re-resolve wherever the target values change, so tenants.css never
// re-emits them — they layer in from the neutral default.css.
const SPECIALS: Record<Appearance, [name: string, value: string][]> = {
  light: [
    ["panel-solid", "oklch(1 0 0)"],
    ["panel-translucent", "var(--white-a9)"],
    ["surface", "var(--white-a11)"],
    ["overlay", "var(--black-a6)"],
  ],
  dark: [
    ["panel-solid", "var(--gray-2)"],
    ["panel-translucent", "var(--gray-a2)"],
    ["surface", "var(--black-a4)"],
    ["overlay", "var(--black-a8)"],
  ],
};
const specialLines = (a: Appearance, indent = "  ") =>
  SPECIALS[a].map(([name, value]) => `${indent}--${name}: ${value};`).join("\n");

// ── CSS rendering ────────────────────────────────────────────────────────────
function declarations(built: BuiltTheme, mode: Appearance, indent = "  "): string {
  const tokens = built[mode];
  // Grouped with blank lines between scales for readability.
  const lines: string[] = [];
  let prev = "";
  for (const name of built.valueNames) {
    const group = name.replace(/-(?:a?\d+(?:-hover)?|contrast|surface)$/, "");
    if (prev && group !== prev) lines.push("");
    lines.push(`${indent}--${name}: ${oklch(tokens.get(name)!)};`);
    prev = group;
  }
  return lines.join("\n");
}

// Point every token of a role at a pool scale. Pointers are mode-independent:
// they re-resolve wherever the pool VALUES change (.dark, [data-tenant]).
const pointerLines = (role: string, pool: string, indent = "  ") =>
  SCALE_SUFFIXES.map((s) => `${indent}--${role}-${s}: var(--${pool}-${s});`).join("\n");

function rolePointers(built: BuiltTheme, indent = "  "): string {
  return [...built.aliases]
    .map(([role, pool]) => `${indent}/* ${role} → ${pool} */\n${pointerLines(role, pool, indent)}`)
    .join("\n\n");
}

// One swap block per pool entry: data-accent-color="<name>" on any element
// re-points --accent-* (hence every accent-* utility) for that subtree. Roles
// are meaning, not identity — they get no blocks. Each block also re-points
// --focus-8 so focus rings follow the scoped hue (Radix Themes does the same) —
// the GRAY block below is the deliberate exception. When `scope` is given
// (tenants.css), blocks are tenant-scoped so a name outside the active tenant's
// pool is a no-op instead of a broken var chain; the second selector covers the
// attribute sitting on <html> itself alongside data-tenant.
function swapBlocks(built: BuiltTheme, scope?: string): string {
  return built.poolNames
    .map((n) => {
      const sel = scope
        ? `${scope} [data-accent-color="${n}"],\n:root${scope}[data-accent-color="${n}"]`
        : `[data-accent-color="${n}"]`;
      return `${sel} {\n${pointerLines("accent", n)}\n  --focus-8: var(--${n}-8);\n}`;
    })
    .join("\n\n");
}

// Gray as accent — Radix Themes' [data-accent-color='gray'] remap with the
// high-contrast treatment baked in. Not a pool entry ("gray" is reserved): it
// aliases the theme's own gray ramp instead of generating a scale, so it is
// always available. Gray-9 solids are deliberately muted, so the solid steps
// take Radix's highContrast values instead of the 1:1 remap: 9 → gray-12,
// 10 → the flattened hover (see grayHcHover), contrast → gray-1. Everything
// else — alphas included — stays 1:1. No --focus-8 re-point here: a gray
// subtree keeps the surrounding accent's focus ring (Radix's own exception).
const GRAY_HC = new Map([
  ["9", "gray-12"],
  ["10", "gray-12-hover"],
  ["contrast", "gray-1"],
]);
const grayBlock = () => {
  const lines = SCALE_SUFFIXES.map((s) => `  --accent-${s}: var(--${GRAY_HC.get(s) ?? `gray-${s}`});`).join("\n");
  return `[data-accent-color="gray"] {\n${lines}\n}`;
};

function themeInline(built: BuiltTheme): string {
  const names = [
    ...built.valueNames.filter((n) => n !== "background"),
    ...[...built.aliases.keys()].flatMap((role) => SCALE_SUFFIXES.map((s) => `${role}-${s}`)),
    ...bwNames,
    ...SPECIALS.light.map(([name]) => name),
    "focus-8",
    "background",
  ];
  return names.map((name) => `  --color-${name}: var(--${name});`).join("\n");
}

// One standalone stylesheet (same shape as the neutral default.css, plus the
// accent pool and its data-accent-color swap blocks).
export function renderCss(built: BuiltTheme, header?: string): string {
  const { cfg } = built;
  const head =
    header ??
    `/**
 * ${cfg.name} theme — GENERATED by the ui theme generator. Do not edit by hand.
 * Radix-style 12-step token contract, drop-in for ui's neutral default.css.
 * Accent pool: ${built.poolNames.join(", ")}. Roles: ${[...built.aliases].map(([r, p]) => `${r} → ${p}`).join(", ")}${built.seededRoles.length ? `; ${built.seededRoles.join(", ")} (own scales)` : ""}.
 * data-accent-color="<pool name>" re-points --accent-* for that subtree.
 * Re-run the generator to regenerate.
 */`;
  return `${head}
@custom-variant dark (&:is(.dark *));

:root {
  color-scheme: light;
${declarations(built, "light")}

  /* black/white alpha ramps — Radix blackA/whiteA, mode-independent */
${bwDeclarations()}

  /* role pointers — mode-independent; they re-resolve under .dark and data-accent-color */
${rolePointers(built)}

  /* panel & scrim specials — Radix Themes recipe; the dark side rides the theme gray */
${specialLines("light")}

  /* focus ring — follows the accent; pool swap blocks re-point it, gray does NOT */
  --focus-8: var(--accent-8);
}

.dark {
  color-scheme: dark;
${declarations(built, "dark")}

${specialLines("dark")}

  --focus-8: var(--accent-8);
}

${swapBlocks(built)}

${grayBlock()}

@theme inline {
${themeInline(built)}
}
`;
}

// Combined render-blocking stylesheet for the whole (fixed) tenant set, scoped by
// [data-tenant]. theme-brand sets <html data-tenant> from the URL. The
// contract's @theme inline mapping comes from the neutral default.css; the delta
// @theme inline here registers only what the neutral contract doesn't cover
// (pool scales + custom roles).
export function renderTenantsCss(builtAll: BuiltTheme[]): string {
  const blocks = builtAll
    .map((b) => {
      const sel = `:root[data-tenant="${b.cfg.name}"]`;
      return [
        `${sel} {\n${declarations(b, "light")}\n\n  /* role pointers — mode-independent */\n${rolePointers(b)}\n}`,
        `${sel}.dark {\n${declarations(b, "dark")}\n}`,
        swapBlocks(b, `[data-tenant="${b.cfg.name}"]`),
      ].join("\n\n");
    })
    .join("\n\n");

  const contractRoles = new Set(["accent", ...CONTRACT_ROLES]);
  const extraNames = [
    ...new Set(
      builtAll.flatMap((b) => [
        ...b.poolNames,
        ...[...b.aliases.keys(), ...b.seededRoles].filter((r) => !contractRoles.has(r)),
      ]),
    ),
  ];
  const extraTokens = extraNames.flatMap((n) => SCALE_SUFFIXES.map((s) => `${n}-${s}`));
  const themeBlock = extraTokens.length
    ? `\n@theme inline {\n${extraTokens.map((t) => `  --color-${t}: var(--${t});`).join("\n")}\n}\n`
    : "";

  return `/**
 * Multi-tenant brand overrides — GENERATED by the ui theme generator.
 * Tenants: ${builtAll.map((b) => b.cfg.name).join(", ")}.
 *
 * Load AFTER the neutral default.css as a render-blocking <link> in <head>, and
 * set <html data-tenant="..."> from the URL (see the theme-brand lib):
 *
 *   @import "tailwindcss";
 *   @import "./styles/ui-theme.css";    // neutral default (login / no tenant)
 *   @import "./styles/themes/tenants.css";  // this file
 *
 * Three independent axes: brand ([data-tenant]) × mode (.dark) × accent
 * ([data-accent-color] — swap blocks are scoped per tenant to its own pool, so
 * an unknown name is a no-op). An unknown/absent tenant slug falls back to the
 * default. The trailing @theme inline registers utilities the neutral contract
 * doesn't cover (pool scales + custom roles: bg-<name>-9, …).
 */
${blocks}
${themeBlock}`;
}

// ── contrast self-check (printed, so you SEE the guarantee — or its absence) ──
function verify(mode: string, b: BuiltTheme, t: ModeTokens) {
  const ratio = (fg: string, bg: string) =>
    new Color(t.get(fg)!).contrast(new Color(t.get(bg)!), "WCAG21");
  const rolesOf = new Map<string, string[]>();
  for (const [role, pool] of b.aliases) rolesOf.set(pool, [...(rolesOf.get(pool) ?? []), role]);
  const label = (n: string) => (rolesOf.has(n) ? `${n} (${rolesOf.get(n)!.join(", ")})` : n);
  const pairs: [string, string, string][] = [
    ["gray-12", "gray-1", "body text"],
    ["gray-11", "gray-1", "muted text"],
    // Every pool scale: its solid-button pair + its text-on-page pair.
    ...b.poolNames.flatMap((n): [string, string, string][] => [
      [`${n}-contrast`, `${n}-9`, `solid ${label(n)}`],
      [`${n}-11`, "gray-1", `${label(n)} text`],
    ]),
    // Private roles: the solid pair (Radix amber/red 9 land at AA-large).
    ...b.seededRoles.map((r): [string, string, string] => [`${r}-contrast`, `${r}-9`, `solid ${r}`]),
  ];
  console.log(`  ${mode} contrast:`);
  for (const [fg, bg, lbl] of pairs) {
    const r = ratio(fg, bg);
    const tag = r >= 4.5 ? "AA ✓" : r >= 3 ? "AA-large" : "FAIL";
    const warn = r < 4.5 ? "  ⚠ below AA (4.5:1) for normal text" : "";
    console.log(`    ${lbl.padEnd(26)} ${r.toFixed(2).padStart(6)}:1  ${tag}${warn}`);
  }
}

// ── main ─────────────────────────────────────────────────────────────────────
const CONFIG_FILE = "theme.config.ts";

export const defaultOutDir = (cwd = process.cwd()) =>
  resolve(cwd, existsSync(resolve(cwd, "src")) ? "src/styles/themes" : "styles/themes");

export function main(config: Config, cwd = process.cwd()) {
  const outDir = config.outDir ? resolve(cwd, config.outDir) : defaultOutDir(cwd);
  const shown = (path: string) => relative(cwd, path);
  const builtAll: BuiltTheme[] = [];
  for (const cfg of config.themes) {
    const built = buildTheme(cfg);
    const themeDir = resolve(outDir, cfg.name);
    mkdirSync(themeDir, { recursive: true });

    const file = resolve(themeDir, `${cfg.name}.css`);
    writeFileSync(file, renderCss(built));

    const roleSummary = [...built.aliases].map(([r, p]) => `${r}→${p}`).join(", ");
    console.log(`\n✓ ${cfg.name}  →  ${shown(file)}  (accents: ${built.poolNames.join(", ")}; ${roleSummary})`);
    verify("light", built, built.light);
    verify("dark", built, built.dark);
    builtAll.push(built);
  }

  if (config.tenants) {
    mkdirSync(outDir, { recursive: true });
    const file = resolve(outDir, "tenants.css");
    writeFileSync(file, renderTenantsCss(builtAll));
    console.log(`\n✓ tenants.css  →  ${shown(file)}  (${builtAll.length} tenants: ${builtAll.map((b) => b.cfg.name).join(", ")})`);
  }
}

const starterConfig = (importPath: string) => `import { defineConfig, defineTheme } from "${importPath}";

export default defineConfig({
  themes: [
    defineTheme({
      name: "example", // → <outDir>/example/example.css (and [data-tenant="example"] with tenants: true)
      // First key = default accent. Add more entries for extra identity scales,
      // each swappable per subtree via data-accent-color="<key>", e.g.:
      //   accents: { blue: "#2563eb", jade: "#29a383", purple: { light: "#8e4ec6", dark: "#9a5cd0" } },
      accents: { blue: "#2563eb" },
      // Semantic roles are opt-in — omit \`semantics\` and none are generated.
      // Alias a pool key (zero extra scales) or seed a private one; the Radix
      // step-9 seeds make good starting points:
      //   semantics: { info: "blue", danger: "#e5484d", warning: "#ffc53d", success: "#30a46c" },
    }),
  ],
  // outDir: "src/styles/themes", // default: src/styles/themes if ./src exists, else styles/themes
  // tenants: true, // also write tenants.css — needs \`shadcn add ng-hai/ui/theme ng-hai/ui/theme-brand\`
});
`;

/** CLI: `gen-theme.ts [config]`. Returns the process exit code. */
export async function runCli(args: string[], cwd = process.cwd()): Promise<number> {
  const configPath = resolve(cwd, args[0] ?? `./${CONFIG_FILE}`);
  if (!existsSync(configPath)) {
    const self = relative(cwd, fileURLToPath(import.meta.url)).replace(/\.ts$/, "");
    writeFileSync(configPath, starterConfig(self.startsWith(".") ? self : `./${self}`));
    console.error(`No config found. Wrote a starter to ${relative(cwd, configPath)} — edit it, then run again:\n\n  tsx ${relative(cwd, fileURLToPath(import.meta.url))}${args[0] ? ` ${args[0]}` : ""}`);
    return 1;
  }
  const mod = await import(pathToFileURL(configPath).href);
  main(mod.default, cwd);
  return 0;
}

// Run only when invoked directly (so the render helpers can be imported too).
const invokedDirectly = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) void runCli(process.argv.slice(2)).then((code) => (process.exitCode = code));
