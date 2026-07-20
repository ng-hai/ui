# Contributing

This doc is written to be executable by both humans and AI assistants.

## Distribution model

ui is a [shadcn GitHub registry](https://ui.shadcn.com/docs/registry/github). There is **no build artifact and no npm release**. The `shadcn` CLI reads `registry.json` and the referenced source files directly from this repo, so:

- **`main` is the only channel.** Anything merged is immediately installable via `shadcn add ng-hai/ui/<name>`.
- **No version tags.** Consumers who want a reproducible install pin to a commit SHA at install time — `shadcn add ng-hai/ui/<name>#<sha>` — so the repo never needs to cut or maintain release tags.
- **Nothing to regenerate.** Editing component source and `registry.json` is the whole change; there is no `public/r` output to rebuild or commit.

## Add or modify a component

The component architecture (layering, barrels, `createPropSplitter`, `createStyleContext`, the `styles` prop, invariants) is documented in **`CLAUDE.md`** — follow it. In short:

1. Create files under `registry/ui/<name>/`, mirroring a sibling (`dialog/` or `select/` for multi-part, `button/` for single-part). Every component ships both `index.ts` and `index.parts.ts`.
2. Add an entry to **`registry.json`**:
   - `type: "registry:ui"` for components, `registry:lib` for shared utils.
   - `registryDependencies` uses the full GitHub item address `ng-hai/ui/<dep>` (e.g. `ng-hai/ui/tv-config`, `ng-hai/ui/split-variant-props`, `ng-hai/ui/create-style-context`). Don't use the old `@ui/<dep>` namespace form or raw GitHub URLs.
   - `dependencies: ["@base-ui/react"]` for runtime npm packages.
   - `categories: [...]` for discoverability.
   - List every file in the folder under `files` (including `index.parts.ts`), each `type: "registry:ui"`.

## Before you commit

```bash
pnpm registry:validate   # parse registry.json, verify every referenced file exists
pnpm typecheck           # tsc --noEmit (always pnpm typecheck, never a global tsc)
pnpm test                # vitest run
```

All three must pass. Then commit the source changes and `registry.json` together and push to `main` — the change is live on the next install.

## AI assistant guardrails

- **Don't reintroduce a build step, `public/r`, or release tags.** The registry resolves from source on `main`; there is no artifact to generate and no tag to cut.
- **Don't use `pnpm tsc`.** Use `pnpm typecheck` so the local `tsc` (not a global one on `PATH`) runs.
- **Keep bare components unstyled.** `styles.ts` slot arrays stay empty — consumers fill them in.
- **Never push a commit where `registry.json` references a file that doesn't exist.** `pnpm registry:validate` is the gate; run it before every push.
