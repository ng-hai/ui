/// <reference types="node" />
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// Components carry no styling at all, so any theme works by construction:
// every tv() slot and variant is empty, and parts take their class names only
// from the style slots (or the consumer's own className), never from a literal.
type TV = { base?: unknown; slots?: unknown; variants?: unknown; compoundSlots?: unknown; compoundVariants?: unknown };

const components = readdirSync("registry/ui", { withFileTypes: true }).filter(
  (entry) => entry.isDirectory() && existsSync(`registry/ui/${entry.name}/styles.ts`),
);
const stylesModules = Object.fromEntries(
  await Promise.all(
    components.map(async ({ name }) => [`registry/ui/${name}/styles.ts`, (await import(`../ui/${name}/styles.ts`)) as Record<string, TV>] as const),
  ),
);

// Every class string reachable from a tv() config. Compound entries also hold
// variant conditions, so only their class/className keys count.
function classStrings(value: unknown, path: string, compound = false): [string, string][] {
  if (typeof value === "string") return [[path, value]];
  if (Array.isArray(value)) return value.flatMap((v, i) => classStrings(v, `${path}[${i}]`, compound));
  if (value && typeof value === "object")
    return Object.entries(value).flatMap(([k, v]) =>
      compound && k !== "class" && k !== "className" ? [] : classStrings(v, `${path}.${k}`, compound),
    );
  return [];
}

const partFiles = readdirSync("registry/ui", { recursive: true, withFileTypes: true })
  .filter((entry) => entry.isFile() && /\.tsx$/.test(entry.name) && !/\.test\.tsx$/.test(entry.name))
  .map((entry) => join(entry.parentPath, entry.name));

// What may follow `className=` / `className:`: a style-slot call that forwards
// the consumer's className, `styles.root({ class: className })`, or a variable
// holding one. Anything else (a quote, a backtick, a helper call) is a literal.
const ALLOWED = /^\{?\s*(\w+\.\w+\(\{ class: className \}\)|\w+\s*\})/;

describe("empty slots", () => {
  it("every styles.ts config is empty", () => {
    expect(Object.keys(stylesModules).length, "styles.ts modules found").toBeGreaterThan(0);

    const filled = Object.entries(stylesModules).flatMap(([file, mod]) =>
      Object.values(mod).flatMap((config) =>
        (["base", "slots", "variants"] as const)
          .flatMap((key) => classStrings(config[key], key))
          .concat(
            classStrings(config.compoundSlots, "compoundSlots", true),
            classStrings(config.compoundVariants, "compoundVariants", true),
          )
          .filter(([, text]) => text.trim() !== "")
          .map(([path, text]) => `${file}: ${path} = ${JSON.stringify(text)}`),
      ),
    );

    expect(filled, "non-empty tv() classes").toEqual([]);
  });

  it("parts take class names only from style slots", () => {
    expect(partFiles.length, "part files found").toBeGreaterThan(0);

    const hits = partFiles.flatMap((path) =>
      readFileSync(path, "utf8")
        .split("\n")
        .flatMap((line, i) => {
          if (/^\s*(\/\/|\/\*|\*)/.test(line)) return [];
          const value = line.match(/\bclassName\s*[=:]\s*(.*)$/)?.[1];
          const literal = value !== undefined && !ALLOWED.test(value);
          const klass = /\bclass:\s*(?!className\b)\S/.test(line);
          const helper = /\b(cn|clsx|twMerge|cva|tv)\(/.test(line);
          return literal || klass || helper ? [`${path}:${i + 1}: ${line.trim()}`] : [];
        }),
    );

    expect(hits, "class names that do not come from a style slot").toEqual([]);
  });
});
