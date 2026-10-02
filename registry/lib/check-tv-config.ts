/**
 * tv-config check — verify `twMergeTheme` lists every custom text size and
 * shadow your `@theme` defines. Installed via `shadcn add ng-hai/ui/tv-config-check`.
 *
 * tailwind-merge only treats t-shirt names (xs … xl, 2xl, …) as sizes for the
 * `text`, `shadow`, `inset-shadow`, `drop-shadow` and `text-shadow` scales. Any
 * other name (`text-body-2`, `shadow-lv2`) is read as a colour, and when it meets
 * a real colour class one of the two is silently dropped. Register those names
 * in `twMergeTheme` (lib/tv-config.ts); this script fails when one is missing:
 *
 *   tsx scripts/check-tv-config.ts [--config <path>] [css files…]
 *
 * The config defaults to the first of src/lib/tv-config.ts and lib/tv-config.ts;
 * the CSS defaults to every *.css under the cwd containing `@theme`. Run it in CI.
 */
import { existsSync, readdirSync, readFileSync, realpathSync } from "node:fs";
import { relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

// Longest prefix first, so `--text-shadow-glow` is a text-shadow, not a text.
export const SCALES = ["text-shadow", "inset-shadow", "drop-shadow", "shadow", "text"] as const;
export type Scale = (typeof SCALES)[number];
export type Theme = Partial<Record<Scale, string[]>>;
export type Found = { scale: Scale; name: string; line: number };

// What tailwind-merge already treats as a size.
const TSHIRT = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
// `--<scale>-<name>`, optionally followed by a companion `--line-height`-style suffix.
const DECLARATION = new RegExp(`(?<![\\w-])--(${SCALES.join("|")})-([a-z0-9][\\w.-]*?)(?:--[\\w-]+)?\\s*:`, "g");

const SKIP_DIRS = new Set(["node_modules", ".git", "dist", "build", ".next", "out"]);

const lineAt = (css: string, index: number) => css.slice(0, index).split("\n").length;

// Blank out comments, keeping newlines so line numbers stay true.
const stripComments = (css: string) => css.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "));

/** CSS → the custom size/shadow names declared inside `@theme … { }` blocks. */
export function findThemeNames(source: string): Found[] {
  const css = stripComments(source);
  const found = new Map<string, Found>();
  for (const open of css.matchAll(/@theme\b[^{;]*\{/g)) {
    const start = open.index + open[0].length;
    let depth = 1;
    let end = start;
    while (end < css.length && depth > 0) {
      if (css[end] === "{") depth++;
      else if (css[end] === "}") depth--;
      end++;
    }
    const block = css.slice(start, end);
    for (const m of block.matchAll(DECLARATION)) {
      const [, scale, name] = m;
      if (TSHIRT.test(name)) continue;
      const key = `${scale}/${name}`;
      if (!found.has(key)) found.set(key, { scale: scale as Scale, name, line: lineAt(css, start + m.index) });
    }
  }
  return [...found.values()];
}

/** Found names the theme doesn't register. */
export const missingNames = (found: Found[], theme: Theme): Found[] =>
  found.filter(({ scale, name }) => !theme[scale]?.includes(name));

function findCss(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const path = resolve(dir, e.name);
    if (e.isDirectory()) return SKIP_DIRS.has(e.name) ? [] : findCss(path);
    return e.name.endsWith(".css") && readFileSync(path, "utf8").includes("@theme") ? [path] : [];
  });
}

/** CLI: `check-tv-config.ts [--config <path>] [css files…]`. Returns the process exit code. */
export async function runCli(args: string[], cwd = process.cwd()): Promise<number> {
  let config: string | undefined;
  const files: string[] = [];
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--config") config = args[++i];
    else files.push(args[i]);
  }
  const configPath = config
    ? resolve(cwd, config)
    : ["src/lib/tv-config.ts", "lib/tv-config.ts"].map((p) => resolve(cwd, p)).find(existsSync);
  if (!configPath || !existsSync(configPath)) {
    console.error("No tv-config found. Pass --config <path> (looked for src/lib/tv-config.ts and lib/tv-config.ts).");
    return 1;
  }
  const mod = await import(pathToFileURL(configPath).href);
  if (!mod.twMergeTheme) {
    console.error(`${relative(cwd, configPath)} does not export twMergeTheme — re-add ng-hai/ui/tv-config.`);
    return 1;
  }

  const shown = (path: string) => relative(cwd, path);
  const cssFiles = files.length ? files.map((f) => resolve(cwd, f)) : findCss(cwd);
  const found = cssFiles.map((file) => ({ file, names: findThemeNames(readFileSync(file, "utf8")) }));
  const missing = found.flatMap(({ file, names }) =>
    missingNames(names, mod.twMergeTheme).map((f) => ({ ...f, file })),
  );
  const total = found.reduce((n, f) => n + f.names.length, 0);

  if (!missing.length) {
    console.log(`✓ ${total} custom size/shadow names in @theme, all registered in twMergeTheme`);
    return 0;
  }
  console.error(`✗ ${missing.length} name${missing.length > 1 ? "s" : ""} missing from twMergeTheme — tailwind-merge reads them as colours and may drop them:\n`);
  for (const m of missing) console.error(`  ${m.scale} "${m.name}"  ${shown(m.file)}:${m.line}`);
  console.error(`\nFix: add to twMergeTheme in ${shown(configPath)}:\n`);
  // twMergeTheme's key order, for the printed fix.
  const THEME_ORDER: Scale[] = ["text", "shadow", "inset-shadow", "drop-shadow", "text-shadow"];
  for (const scale of THEME_ORDER) {
    const names = missing.filter((m) => m.scale === scale).map((m) => `"${m.name}"`);
    if (names.length) {
      const key = scale.includes("-") ? JSON.stringify(scale) : scale;
      console.error(`  ${key}: [${names.join(", ")}],`);
    }
  }
  return 1;
}

/** True when `argv1` names this module, through symlinks (macOS /var → /private/var). */
export function isEntry(argv1: string | undefined, url: string): boolean {
  if (!argv1) return false;
  try {
    return realpathSync(resolve(argv1)) === realpathSync(fileURLToPath(url));
  } catch {
    return false;
  }
}

if (isEntry(process.argv[1], import.meta.url)) void runCli(process.argv.slice(2)).then((code) => (process.exitCode = code));
