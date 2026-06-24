# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

`bare-ui` is a **shadcn registry** of **unstyled** React components built on top of [`@base-ui/react`](https://base-ui.com). Consumers install components via the `shadcn` CLI, and the component code is copied into their project. There is no build output, no published npm package, and no app shell — the components themselves are the product.

The repo ships a single registry:

- **`registry.json`** (root) — the "bare" components under `registry/bare/**`. Styles are intentionally empty slots; consumers fill them in themselves.

This is a [GitHub registry](https://ui.shadcn.com/docs/registry/github): the `shadcn` CLI reads `registry.json` and the referenced source files directly from this repo. Consumers install with `shadcn add ng-hai/bare-ui/<name>` — no `components.json` registry config, no namespace, and no pre-built JSON to host or commit.

## Presets and theme files

Default Tailwind `@theme` CSS files are shipped as `registry:file` items with an explicit `target` path (e.g. `target: "styles/bare-ui-theme.css"`). This is the correct type for plain CSS files that have no `@/` imports to rewrite. Example registry entry:

```json
{
  "name": "theme",
  "type": "registry:file",
  "files": [
    {
      "path": "registry/bare/theme/default.css",
      "type": "registry:file",
      "target": "styles/bare-ui-theme.css"
    }
  ]
}
```

Theme CSS files live under `registry/bare/theme/`. Consumers install via `shadcn add ng-hai/bare-ui/theme` and then `@import` the file in their `globals.css`. They can replace it with their own `@theme` — the separation between tokens (CSS) and styles (`styles.ts`) is intentional.

## Commands

```bash
pnpm registry:validate # shadcn build to a throwaway cache dir → parse registry.json, check every referenced file resolves
pnpm typecheck         # tsc --noEmit (uses the local tsc, not PATH)
pnpm test              # vitest run
```

There is no build step, no lint script, and no dev server. Run `pnpm registry:validate` any time `registry.json` or any file it references changes — it runs `shadcn build` into a throwaway, git-ignored cache dir (`node_modules/.cache/bare-ui-registry`), which parses the registry and verifies every `files[].path` resolves. The output is never committed (the repo still ships no `public/r` artifact). Always run `pnpm typecheck`, not `pnpm tsc …` — the latter falls back to whatever `tsc` is on `PATH` (often an older global install) and will report phantom errors.

## Release process

There is no build artifact and no npm release. The `shadcn` CLI resolves components straight from `registry.json` and the source files on this repo's default branch, so **anything merged to `main` is live**. To ship a change:

1. Edit the component source and/or `registry.json`.
2. `pnpm registry:validate` to confirm the registry parses and every referenced file exists.
3. `pnpm typecheck` to typecheck.
4. Commit the source changes and push to `main`. The change is immediately available via `pnpm dlx shadcn@latest add ng-hai/bare-ui/<name>`.

There are no version tags to cut and no `public/r` artifact to keep in sync. Consumers who want a reproducible install pin to a commit SHA at install time (`shadcn add ng-hai/bare-ui/<name>#<sha>`); the repo itself only maintains `main`.

## Component architecture

Every component follows the same layering, and Claude should preserve it when adding new components:

1. **Primitive** — `@base-ui/react/<component>` provides behavior/ARIA.
2. **Styles (`styles.ts`)** — a `tv({ slots, variants })` call from `@/registry/bare/lib/tv.config`. Slot arrays are empty strings — consumers fill them in after install. Slot names define the public surface (`root`, `trigger`, `popup`, etc.).
3. **Root (`<name>-root.tsx`)** — imports the primitive `Root`, runs `createPropSplitter(styles)` to separate TV variant props from HTML props, resolves styles via `styles ?? componentStyles(variantProps)`, and renders `<Primitive.Root className={s.root({ class: className })} data-slot="<name>" />`. For multi-part components it wraps children in `<StyleContext value={s}>` from `createStyleContext<StylesType>("Name")`.
4. **Parts (`<name>-<part>.tsx`, one file per part)** — each sibling part lives in its own file named `<name>-<part>.tsx` (e.g. `select-trigger.tsx`, `dialog-popup.tsx`), calls `useStyles()` from the root's style context, and applies the matching slot, e.g. `className={styles.trigger({ class: className })}`. All parts must set `data-slot` for consumer CSS hooks. Don't combine multiple parts into a single `<name>-parts.tsx` file.
5. **Barrels**
   - `index.parts.ts` — re-exports each part under its short name (`Root`, `Trigger`, `Popup`, etc.), aliased from the full component export (`SelectTrigger as Trigger`). This is the namespaced surface.
   - `index.ts` — the public export consumed by shadcn. Does `export * as <Name> from "./index.parts"` plus `export { <name>Styles } from "./styles"`. Consumers use it as `<Select.Root>`, `<Select.Trigger>`, etc.

Every component — including single-part ones like `button` and `input` — follows this barrel pattern so the public API is uniform (`<Button.Root>`, `<Input.Root>`). Single-part components still skip the style-context; their `index.parts.ts` just exports `Root`.

### Invariants to keep

- **Every component goes through `createPropSplitter`.** Don't hand-pluck variant props — `variantKeys` comes from the TV config at runtime, so the splitter stays in sync when variants change.
- **Every rendered primitive sets `data-slot="..."`** matching the component/part name (kebab-case). This is the consumer-visible styling hook.
- **Multi-part components use `createStyleContext`, not prop drilling.** `checkbox-root.tsx` and `select-root.tsx` are the reference implementations; the root exports `useStyles` as `use<Name>Styles` for siblings.
- **Bare components must stay unstyled.** `styles.ts` slot arrays should be `[""]` or empty. Consumers fill them in after install.
- **`styles` prop escape hatch.** Root accepts an optional `styles?: ReturnType<typeof componentStyles>` so consumers can inject a preset without recomputing variants — preserve this.

## Adding or modifying a component

1. Create files under `registry/bare/ui/<name>/` following the structure of a sibling (use `dialog/` or `select/` for multi-part — one file per part, `button/` for single-part). Every component ships both `index.ts` and `index.parts.ts`.
2. Add an entry to **`registry.json`**:
   - `type: "registry:ui"` for components, `registry:lib` for shared utils.
   - `registryDependencies` uses the full GitHub item address `ng-hai/bare-ui/<dep>` (e.g. `ng-hai/bare-ui/tv-config`, `ng-hai/bare-ui/split-variant-props`, and — for multi-part — `ng-hai/bare-ui/create-style-context`). That is how same-repo dependencies are referenced in a GitHub registry; don't use the old `@bare-ui/<dep>` namespace form or raw GitHub URLs.
   - `dependencies: ["@base-ui/react@^1.5.0"]` — write the npm range inline. Convention: **floor at the minor you build against**, mirroring `package.json` as a caret (e.g. `@base-ui/react@^1.5.0`, `tailwind-variants@^3.2.0`) — the lowest version actually validated, no looser. A transitive peer is the exception: floor it at what its requirer needs, not the version that happened to resolve (e.g. `tailwind-merge@^3.0.0`, the range `tailwind-variants` itself requires, even though the repo has 3.6 installed). No build step derives these from `package.json`, so what you type here ships verbatim.
   - `categories: [...]` for discoverability (`form`, `overlay`, `display`, `navigation`, `disclosure`, etc.).
   - List every file in the component folder under `files` (including `index.parts.ts`), each with `type: "registry:ui"` (so shadcn places them in `components/ui/` in consumer projects).
3. Run `pnpm registry:validate` and `pnpm typecheck`, then commit `registry.json` together with the new source files.

## Path aliases

`tsconfig.json` maps `@/*` to the repo root. Component source uses `@/registry/bare/lib/...` — the `shadcn` CLI rewrites these imports to the consumer's aliases when it installs, so don't flatten them to relative paths.
