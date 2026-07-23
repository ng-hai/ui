/**
 * ui theme generator — turn brand seeds into Radix-style 12-step color
 * scales for the ui token contract. Installed via
 * `shadcn add ng-hai/ui/theme-generator`.
 *
 * Fill in YOUR themes in the THEMES array below (one entry per brand) — this is
 * your slot, like a component's empty `styles.ts`. Then run:
 *
 *   tsx scripts/gen-theme.ts        (or wire it as a package script)
 *
 * Per theme it emits (under ./themes by default — change OUT_DIR):
 *   themes/<name>/<name>.css         — full token contract (drop-in default.css)
 * plus one combined:
 *   themes/tenants.css               — [data-tenant]-scoped, render-blocking; pair
 *                                      with the `theme-brand` lib + neutral `theme`.
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
 * imagery, scrims, and text/icons on colored solids. `black` and `white` are
 * therefore reserved names.
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
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Where generated files are written, relative to where you run the script
// (your project root). Change to taste, e.g. resolve(process.cwd(), "src/styles").
const OUT_DIR = resolve(process.cwd(), "themes");

type Seed = string | { light: string; dark: string };

export type ThemeConfig = {
  name: string; // → [data-tenant="<name>"] and themes/<name>/
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
 * Identity helper for THEMES entries: `semantics` aliases autocomplete from
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

// Status roles the neutral default.css defines and registers utilities for.
// The generator does NOT seed them by itself — semantics are opt-in — but
// tenants.css layers over default.css, so its delta @theme inline must not
// re-register these names.
const CONTRACT_ROLES = ["danger", "warning", "success", "info"];

// ──────────────────────────────────────────────────────────────────────────
// YOUR THEMES — fill this in. One entry per brand.
// ──────────────────────────────────────────────────────────────────────────
const THEMES: ThemeConfig[] = [
  defineTheme({
    name: "example", // → [data-tenant="example"] and themes/example/
    // First key = default accent. Add more entries for extra identity scales,
    // each swappable per subtree via data-accent-color="<key>", e.g.:
    //   accents: { blue: "#2563eb", jade: "#29a383", purple: { light: "#8e4ec6", dark: "#9a5cd0" } },
    accents: { blue: "#2563eb" },
    // Semantic roles are opt-in — omit `semantics` and none are generated.
    // Alias a pool key (zero extra scales) or seed a private one; the Radix
    // step-9 seeds make good starting points:
    //   semantics: { info: "blue", danger: "#e5484d", warning: "#ffc53d", success: "#30a46c" },
  }),
];

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
const RESERVED = new Set(["gray", "accent", "background", "radius", "black", "white"]);

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
  // gray (chrome): the gray side of the main run — no contrast token.
  main.grayScale.forEach((hex, i) => t.set(`gray-${i + 1}`, hex));
  main.grayScaleAlpha.forEach((hex, i) => t.set(`gray-a${i + 1}`, hex));
  t.set("gray-surface", main.graySurface);
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

// ── CSS rendering ────────────────────────────────────────────────────────────
function declarations(built: BuiltTheme, mode: Appearance, indent = "  "): string {
  const tokens = built[mode];
  // Grouped with blank lines between scales for readability.
  const lines: string[] = [];
  let prev = "";
  for (const name of built.valueNames) {
    const group = name.replace(/-(?:a?\d+|contrast|surface)$/, "");
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
// are meaning, not identity — they get no blocks. When `scope` is given
// (tenants.css), blocks are tenant-scoped so a name outside the active tenant's
// pool is a no-op instead of a broken var chain; the second selector covers the
// attribute sitting on <html> itself alongside data-tenant.
function swapBlocks(built: BuiltTheme, scope?: string): string {
  return built.poolNames
    .map((n) => {
      const sel = scope
        ? `${scope} [data-accent-color="${n}"],\n:root${scope}[data-accent-color="${n}"]`
        : `[data-accent-color="${n}"]`;
      return `${sel} {\n${pointerLines("accent", n)}\n}`;
    })
    .join("\n\n");
}

function themeInline(built: BuiltTheme): string {
  const names = [
    ...built.valueNames.filter((n) => n !== "background"),
    ...[...built.aliases.keys()].flatMap((role) => SCALE_SUFFIXES.map((s) => `${role}-${s}`)),
    ...bwNames,
    "background",
  ];
  return names.map((name) => `  --color-${name}: var(--${name});`).join("\n");
}

const RADIUS_BLOCK = `  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);`;

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

  --radius: 0.625rem;

  /* role pointers — mode-independent; they re-resolve under .dark and data-accent-color */
${rolePointers(built)}
}

.dark {
  color-scheme: dark;
${declarations(built, "dark")}
}

${swapBlocks(built)}

@theme inline {
${themeInline(built)}

${RADIUS_BLOCK}
}
`;
}

// Combined render-blocking stylesheet for the whole (fixed) tenant set, scoped by
// [data-tenant]. theme-brand sets <html data-tenant> from the URL. Radius + the
// contract's @theme inline mapping come from the neutral default.css; the delta
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
 *   @import "./styles/ui-tenants.css";  // this file
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
export function main(themes: ThemeConfig[] = THEMES) {
  const builtAll: BuiltTheme[] = [];
  for (const cfg of themes) {
    const built = buildTheme(cfg);
    const outDir = resolve(OUT_DIR, cfg.name);
    mkdirSync(outDir, { recursive: true });

    writeFileSync(resolve(outDir, `${cfg.name}.css`), renderCss(built));

    const roleSummary = [...built.aliases].map(([r, p]) => `${r}→${p}`).join(", ");
    console.log(`\n✓ ${cfg.name}  →  themes/${cfg.name}/${cfg.name}.css  (accents: ${built.poolNames.join(", ")}; ${roleSummary})`);
    verify("light", built, built.light);
    verify("dark", built, built.dark);
    builtAll.push(built);
  }

  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(resolve(OUT_DIR, "tenants.css"), renderTenantsCss(builtAll));
  console.log(`\n✓ tenants.css  →  themes/tenants.css  (${builtAll.length} tenants: ${builtAll.map((b) => b.cfg.name).join(", ")})`);
}

// Run only when invoked directly (so the render helpers can be imported too).
const invokedDirectly = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) main();
