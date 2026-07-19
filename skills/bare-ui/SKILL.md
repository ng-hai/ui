---
name: bare-ui
description: Use when installing, styling, or extending bare-ui components. Triggers: `shadcn add ng-hai/bare-ui/<name>` (GitHub registry); `components/ui/<name>/` with `<name>-root.tsx` + per-part files + `styles.ts` (`tv({ slots })`) + `index.parts.ts`; imports from `@/lib/tv.config`, `@/lib/create-style-context`, or `@/lib/split-variant-props`; `data-slot`/`useStyles`/`StyleContext` usage; preset injection via `styles` prop.
---

# bare-ui

bare-ui is an unstyled component registry built on [@base-ui/react](https://base-ui.com). It is a [shadcn GitHub registry](https://ui.shadcn.com/docs/registry/github): install components with `shadcn add ng-hai/bare-ui/<name>` (no `components.json` setup or namespace needed) and they are copied into your project under `components/ui/<name>/`. There is no npm package — you own the code. Styles are intentionally empty; you fill them in with Tailwind classes.

## Component anatomy

Every component in `components/ui/<name>/` follows the same structure:

| File | Purpose |
|---|---|
| `styles.ts` | Tailwind Variants definition — `tv({ slots, variants })`. Slot arrays are empty by default. |
| `<name>-root.tsx` | Wires up the Base UI primitive. Splits variant props via `createPropSplitter`. For multi-part components, wraps children in a `StyleContext`. |
| `<name>-<part>.tsx` | One file per part. Consumes styles from the root's `StyleContext` via `useStyles()`. Sets `data-slot`. |
| `index.parts.ts` | Re-exports parts under short names (`Root`, `Trigger`, `Popup`, etc.). |
| `index.ts` | Public entry — `export * as <Name> from "./index.parts"` plus `export { <name>Styles }`. |

**Single-part example (button):**

```
components/ui/button/
├── button-root.tsx      ← renders <button> with styles from root slot
├── styles.ts            ← one slot: root
├── index.parts.ts       ← exports Root
└── index.ts             ← export * as Button from "./index.parts"
```

**Multi-part example (select):**

```
components/ui/select/
├── select-root.tsx      ← provides StyleContext to children
├── select-trigger.tsx   ← useSelectStyles().trigger
├── select-popup.tsx     ← useSelectStyles().popup
├── select-item.tsx      ← useSelectStyles().item
├── ...                  ← one file per part
├── styles.ts            ← slots: root, trigger, popup, item, ...
├── index.parts.ts       ← exports Root, Trigger, Popup, Item, ...
└── index.ts             ← export * as Select from "./index.parts"
```

**Usage pattern — all components use namespaced imports:**

```tsx
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";

<Button.Root>Click me</Button.Root>

<Select.Root>
  <Select.Trigger>
    <Select.Value />
  </Select.Trigger>
  <Select.Portal>
    <Select.Positioner>
      <Select.Popup>
        <Select.Item value="a">
          <Select.ItemText>Option A</Select.ItemText>
        </Select.Item>
      </Select.Popup>
    </Select.Positioner>
  </Select.Portal>
</Select.Root>
```

## How to style components

### Fill in slot arrays

Open `styles.ts` and add Tailwind classes to the slot arrays. Each slot maps to a component part — `root` styles the `<Name>.Root`, `trigger` styles `<Name>.Trigger`, etc.

**Before (unstyled):**

```ts
import { tv } from "@/lib/tv.config";

export const buttonStyles = tv({
  slots: {
    root: [""],
  },
});
```

**After (styled with variants):**

```ts
import { tv } from "@/lib/tv.config";

export const buttonStyles = tv({
  slots: {
    root: [
      "inline-flex items-center justify-center gap-2 rounded-default font-medium",
      "transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-8",
      "disabled:pointer-events-none disabled:opacity-50",
    ],
  },
  variants: {
    variant: {
      solid: { root: "bg-accent-9 text-accent-contrast shadow-sm hover:bg-accent-10" },
      outline: { root: "border border-gray-7 text-gray-12 hover:bg-gray-3" },
      ghost: { root: "text-gray-12 hover:bg-gray-3" },
      destructive: { root: "bg-danger-9 text-danger-contrast shadow-sm hover:bg-danger-10" },
    },
    size: {
      sm: { root: "h-8 px-3 text-xs" },
      md: { root: "h-10 px-4 text-sm" },
      lg: { root: "h-12 px-6 text-base" },
    },
  },
  defaultVariants: {
    variant: "solid",
    size: "md",
  },
});
```

### Add variants

Add a `variants` block and `defaultVariants` to the `tv()` call. `createPropSplitter` in the root component discovers new variant keys at runtime — no changes to `.tsx` files needed. Variant props become available on the root component automatically. Use `VariantProps<typeof componentStyles>` from `@/lib/tv.config` to type variant props in root components:

```tsx
<Button.Root variant="outline" size="lg">Click me</Button.Root>
```

### Design tokens — the Radix 12-step contract

The token contract is **not** the shadcn `--primary`/`--secondary`/`--muted` set. It follows [Radix Colors](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale): two tiers of 12-step scales — **base**: `gray` (neutral chrome) + `accent` (brand); **status**: `danger` / `warning` / `success` / `info` (feedback) — each shipping a **solid** ramp (`1`–`12`) and an **alpha** ramp (`a1`–`a12`), in light (`:root`) and dark (`.dark`). Each step has a fixed role:

| Step | Role | Step | Role |
|---|---|---|---|
| 1 | app background | 7 | border / focus ring |
| 2 | subtle background | 8 | hovered border |
| 3 | component background | 9 | **solid** (the pure color) |
| 4 | hovered component | 10 | solid hover |
| 5 | active / selected | 11 | low-contrast text |
| 6 | subtle border / separator | 12 | high-contrast text |

Plus specials: `--<scale>-contrast` (legible text on step 9, for `accent` + every status scale), `--<scale>-surface` (translucent panels), `--background` (page), `--overlay` (scrims). All are exposed to Tailwind via `@theme inline`, so utilities like `bg-accent-9`, `text-gray-11`, `border-gray-6`, `bg-accent-a3`, `text-accent-contrast`, `bg-danger-3` exist.

Pick by role, not by guessing a shade:

```ts
solid:   "bg-accent-9 text-accent-contrast hover:bg-accent-10"   // primary button
soft:    "bg-accent-3 text-accent-11 hover:bg-accent-4"          // tinted button
outline: "border border-gray-7 text-gray-12 hover:bg-gray-3"
ghost:   "text-gray-12 hover:bg-gray-3"
input:   "border border-gray-7 bg-gray-1 placeholder:text-gray-9 focus-visible:outline-accent-8"
card:    "bg-gray-2 text-gray-12 border border-gray-6"
muted:   "text-gray-11"
```

The contract ships **neutral** (accent == a dark gray) via the `theme` preset (`shadcn add ng-hai/bare-ui/theme`). To brand it, install `theme-generator`, drop your brand seeds into its `THEMES` config, and run it — it regenerates the whole contract (pinning step 9 of each scale to its seed) with a printed WCAG self-check. Keep the token *names* stable; only the values change.

### Multiple accents — `data-accent-color`

Generated themes can carry an **accent pool**: the generator's `accents` map holds named scales (first key = the default `--accent-*`), each also emitted as `--<name>-*` tokens, `bg-<name>-9` utilities, and a `[data-accent-color="<name>"]` swap block. Setting that attribute on any element re-points every `accent-*` token (incl. `-contrast`) for its subtree — one slot fill in `accent-*` utilities yields every pool hue, no extra variants:

```tsx
<Badge.Root data-accent-color="jade">Active</Badge.Root>   {/* data-* passes through — no API needed */}
<section data-accent-color="purple">…whole area re-tints…</section>
```

Semantic roles stay meaning, not identity: `semantics: { danger: "red", premium: "jade" }` aliases a role onto a pool scale (zero extra scales) or seeds a private one from a color; roles never swap via the attribute. Style *stateful feedback* (alert, callout, destructive buttons) against role tokens (`bg-danger-9`); style *categorical identity* (badges, avatars, tags, section theming) against `accent-*` + the attribute.

### One-off overrides

Use the `className` prop on any part. It merges with slot styles via `twMerge`:

```tsx
<Button.Root className="mt-4 w-full">Full width button</Button.Root>
```

### Preset injection

Root components accept an optional `styles` prop to inject a pre-computed styles object, bypassing variant resolution:

```tsx
const precomputed = buttonStyles({ variant: "solid", size: "lg" });
<Button.Root styles={precomputed}>Preset button</Button.Root>
```

## How to extend components

To add a new part to an existing multi-part component:

1. **Add a slot** in `styles.ts`:

```ts
export const dialogStyles = tv({
  slots: {
    // ... existing slots
    closeButton: [
      "absolute top-4 right-4 inline-flex items-center justify-center",
      "rounded-sm size-6 text-gray-11 hover:text-gray-12",
      "transition-colors",
    ],
  },
});
```

2. **Create the part file** `components/ui/dialog/dialog-close-button.tsx`:

```tsx
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { useDialogStyles } from "./dialog-root";

interface DialogCloseButtonProps extends DialogPrimitive.Close.Props {
  className?: string;
}

export function DialogCloseButton({ className, children, ...props }: DialogCloseButtonProps) {
  const styles = useDialogStyles();
  return (
    <DialogPrimitive.Close
      {...props}
      className={styles.closeButton({ class: className })}
      data-slot="dialog-close-button"
    >
      {children}
    </DialogPrimitive.Close>
  );
}
```

3. **Export from `index.parts.ts`:**

```ts
// Add to existing exports:
export { DialogCloseButton as CloseButton } from "./dialog-close-button";
```

No changes to `index.ts` — it re-exports everything from `index.parts.ts` via `export * as Dialog from "./index.parts"`.

The pattern for every new part:
- One file per part, named `<component>-<part>.tsx`
- Get styles via `use<Name>Styles()` from the root
- Apply the matching slot: `className={styles.<slotName>({ class: className })}`
- Set `data-slot="<component>-<part>"`
- Export from `index.parts.ts` under a short name

## Icon distribution

Some components need glyphs — a chevron for `<Select.Icon>`, an X for `<Dialog.Close>`, a check for `<Checkbox.Indicator>`. Bare-ui itself ships no glyphs and declares no icon library as a dependency. This is intentional — icons are a design choice, not a behavior choice, and consumers should own that choice.

There are two supported approaches. Components that need a glyph render `children` if provided and fall back to a default (null, or an inline SVG) otherwise. The consumer picks one of:

### Approach 1 — peer-dep an icon library

Consumer installs something like `lucide-react`, `@heroicons/react`, or `@radix-ui/react-icons` and passes icons as children at the call site:

```tsx
import { X, ChevronDown, Check } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { Select } from "@/components/ui/select";

<Dialog.Close><X /></Dialog.Close>

<Select.Icon><ChevronDown /></Select.Icon>
```

**When to choose this.** The consumer already has an icon library, wants a consistent set across their app, and doesn't need to edit individual glyphs. Zero friction at install time — bare-ui has nothing to copy for icons.

**Registry implications.** No `dependencies` entry for the icon library in `registry.json` — bare-ui stays library-agnostic. Document the convention in the component's README or example block, not in the component code.

### Approach 2 — copy-in icon registry

Ship raw SVG files as `registry:file` items and let consumers process them with their own toolchain ([SVGR](https://react-svgr.com), [unplugin-icons](https://github.com/unplugin/unplugin-icons), [vite-plugin-svgr](https://github.com/pd4d10/vite-plugin-svgr)). Each SVG lives in `registry/bare/icons/<name>.svg` and lands in the consumer project at a predictable path:

```json
{
  "name": "icon-chevron-down",
  "type": "registry:file",
  "title": "Chevron Down Icon",
  "description": "Raw SVG for chevron-down glyph",
  "categories": ["icons"],
  "files": [
    {
      "path": "registry/bare/icons/chevron-down.svg",
      "type": "registry:file",
      "target": "assets/icons/chevron-down.svg"
    }
  ]
}
```

Consumers install with `shadcn add ng-hai/bare-ui/icon-chevron-down`, then process via their bundler. Example consumer setup with SVGR + Vite:

```tsx
// svgr turns the SVG import into a React component
import ChevronDown from "@/assets/icons/chevron-down.svg?react";

<Select.Icon><ChevronDown /></Select.Icon>
```

Or with unplugin-icons (works with any icon set, including local SVGs):

```tsx
import ChevronDown from "~icons/bare-ui/chevron-down";
```

**When to choose this.** The consumer wants editable glyphs (path tweaks, custom strokes) without pulling a whole icon library, or wants SVGs as first-class assets (sprite sheets, inline components, both).

**Registry implications.**
- SVGs must use `currentColor` for stroke/fill so Tailwind text colors apply.
- `type: "registry:file"` (not `registry:ui`) — these are raw assets, no TSX wrappers, no `@/` imports to rewrite.
- Use an explicit `target` path so consumers know where the files land.
- Group related icons under a shared `categories: ["icons"]` for discoverability.
- Don't hardcode SVGs inside component `.tsx` files — keep glyphs in the icon registry so consumers can swap them independently.

### Which to recommend

Neither is universally right. Document both in the component's example block so consumers can pick:
- **Starting a new project with an existing design system** → peer-dep (fastest).
- **Tight visual control, custom strokes, or no icon library** → copy-in SVGs.
- **Mixed** → peer-dep for most, copy-in for the 3–5 icons that need custom geometry.

What bare-ui must not do: bundle glyphs inside component `.tsx` files as hardcoded inline SVGs. That locks aesthetic decisions into behavior code and breaks both approaches above.

## Rules

These are invariants. Never break them when modifying bare-ui components.

- **All styling goes in `styles.ts`.** Never put Tailwind classes directly in `.tsx` files. The only exception is the `className` prop pass-through for consumer overrides.
- **Never hand-pluck variant props.** The root component uses `createPropSplitter` which reads `variantKeys` at runtime. When you add variants to `styles.ts`, the root component picks them up automatically. Don't destructure variant props manually.
- **One file per part.** Each component part lives in its own `<name>-<part>.tsx` file. Never combine multiple parts into a single file.
- **Always set `data-slot`.** Every rendered primitive must have `data-slot="<component-name>"` or `data-slot="<component>-<part>"`. Consumers use these as CSS selector hooks.
- **Keep the `styles` prop.** Root components accept an optional `styles` prop for preset injection. Never remove it.
- **Keep barrel exports in sync.** If you add or remove a part, update `index.parts.ts`. The `index.ts` file re-exports from `index.parts.ts` and rarely needs changes.
- **Don't modify shared libs.** `lib/tv.config.ts`, `lib/create-style-context.ts`, and `lib/split-variant-props.ts` are shared infrastructure. Don't edit them when working on a specific component.
- **Use Base UI primitives.** Components wrap `@base-ui/react` primitives for behavior and ARIA. Refer to [base-ui.com](https://base-ui.com) for the primitive API.

## Installing from the registry

bare-ui is a [shadcn GitHub registry](https://ui.shadcn.com/docs/registry/github). For the public `ng-hai/bare-ui` repo there is **no setup and no auth** — install straight from the repo:

```bash
pnpm dlx shadcn@latest add ng-hai/bare-ui/button
```

The first two path segments (`ng-hai/bare-ui`) are the GitHub owner and repo; the rest (`button`) is the registry item. Transitive deps (`ng-hai/bare-ui/tv-config`, `ng-hai/bare-ui/split-variant-props`, `ng-hai/bare-ui/create-style-context`) resolve automatically from the same repo. The CLI reads `registry.json` and the source files directly — there is no pre-built JSON, no `public/r`, and no `components.json` registry entry to configure.

> Requires a recent `shadcn` CLI; the `owner/repo/item` form landed in the 4.x line. Use `shadcn@latest`.

### Pin to a ref

A bare `ng-hai/bare-ui/button` tracks the repo's default branch (`main`). Append `#<ref>` — a branch or commit SHA — to lock an install:

```bash
pnpm dlx shadcn@latest add ng-hai/bare-ui/button#c0ffee2   # immutable commit SHA → reproducible
pnpm dlx shadcn@latest add ng-hai/bare-ui/button#main      # explicit default branch
```

There are no version tags; reproducibility comes from pinning a commit SHA (or just committing the installed source into your own repo).

### Private forks

GitHub addresses (`owner/repo/item`) work for **public repos only** — *"Private repositories and GitHub Enterprise hosts are not currently supported by GitHub addresses."* If you fork bare-ui into a private repo, the `ng-hai/bare-ui/<name>` form will not resolve.

For a private fork, serve the registry behind an authenticated URL and reference it as a [namespace with authentication](https://ui.shadcn.com/docs/registry/authentication) in `components.json` — shadcn substitutes `${ENV_VAR}` into headers/params:

```json
{
  "registries": {
    "@bare-ui": {
      "url": "https://your-registry.example.com/r/{name}.json",
      "headers": { "Authorization": "Bearer ${REGISTRY_TOKEN}" }
    }
  }
}
```

Set `REGISTRY_TOKEN` in `.env.local` (gitignored, never commit). Note this requires you to host the registry items yourself — the public-repo GitHub-address path does not apply to private repos.
