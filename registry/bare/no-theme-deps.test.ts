/// <reference types="node" />
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// Components must install without any theme. Walk every registry:ui item's
// registryDependencies transitively and fail if one reaches an item in the
// "theme" category, so a new theme item is covered the day it is tagged.
type Item = { name: string; type: string; categories?: string[]; registryDependencies?: string[] };

const items: Item[] = JSON.parse(readFileSync("registry.json", "utf8")).items;
const byName = new Map(items.map((item) => [item.name, item]));
const isTheme = (item: Item) => item.categories?.includes("theme") ?? false;

// Every dependency path from `name` that ends at a theme item.
function themePaths(name: string, trail: string[] = []): string[][] {
  const item = byName.get(name);
  if (!item || trail.includes(name)) return [];
  const path = [...trail, name];
  if (isTheme(item)) return [path];
  return (item.registryDependencies ?? []).flatMap((dep) => themePaths(dep.replace(/^ng-hai\/ui\//, ""), path));
}

describe("theme-free dependency graph", () => {
  it("no registry:ui item depends, even transitively, on a theme item", () => {
    const paths = items.filter((item) => item.type === "registry:ui").flatMap((item) => themePaths(item.name));

    expect(paths.map((path) => path.join(" → ")), "components reaching a theme item").toEqual([]);
  });
});
