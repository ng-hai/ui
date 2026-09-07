---
name: ui
description: "Use when installing, styling, or extending ui components. Triggers: `shadcn add ng-hai/ui/<name>` (GitHub registry); `components/ui/<name>/` with `<name>-root.tsx` + per-part files + `styles.ts` (`tv({ slots })`) + `index.parts.ts`; imports from `@/lib/tv-config`, `@/lib/create-style-context`, or `@/lib/split-variant-props`; `data-slot`/`useStyles`/`StyleContext` usage; preset injection via `styles` prop."
---

# ui

ui is an unstyled component registry built on [@base-ui/react](https://base-ui.com). It is a [shadcn GitHub registry](https://ui.shadcn.com/docs/registry/github): install components with `shadcn add ng-hai/ui/<name>` (no `components.json` setup or namespace needed) and they are copied into your project under `components/ui/<name>/`. There is no npm package — you own the code. Styles are intentionally empty; you fill them in with Tailwind classes.

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
import { tv } from "@/lib/tv-config";

export const buttonStyles = tv({
  slots: {
    root: [""],
  },
});
```

**After (styled with variants):**

```ts
import { tv } from "@/lib/tv-config";

export const buttonStyles = tv({
  slots: {
    root: [
      "inline-flex items-center justify-center gap-2 rounded-md font-medium",
      "transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-8",
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

Focus rings use `outline-focus-8` — `--focus-8` follows the accent and is re-pointed by pool swap blocks, but deliberately **not** by the gray swap, so neutralized subtrees keep the brand focus ring (Radix Themes' exception).

### Add variants

Add a `variants` block and `defaultVariants` to the `tv()` call. `createPropSplitter` in the root component discovers new variant keys at runtime — no changes to `.tsx` files needed. Variant props become available on the root component automatically. Use `VariantProps<typeof componentStyles>` from `@/lib/tv-config` to type variant props in root components:

```tsx
<Button.Root variant="outline" size="lg">Click me</Button.Root>
```

#### Combobox: `trigger` mode

`Combobox.Trigger` plays two roles in Base UI: an **icon** button next to `Combobox.Input` (inside `Combobox.InputGroup`), or a select-like **field** wrapping `Combobox.Value` when the input lives in the popup. Both render the same `trigger` slot, so the registry ships a `trigger` root variant (`"icon"` default, `"field"`) with empty classes. Fill in each mode in `styles.ts` and pick it on the root:

```ts
variants: {
  trigger: {
    icon: { trigger: "size-8 rounded-md text-gray-11 hover:bg-gray-3" },
    field: { trigger: "flex h-10 w-full items-center justify-between rounded-md border border-gray-7 px-3" },
  },
},
```

```tsx
<Combobox.Root trigger="field" items={items}>
  <Combobox.Trigger>
    <Combobox.Value />
    <Combobox.Icon><ChevronDown /></Combobox.Icon>
  </Combobox.Trigger>
  <Combobox.Portal>…<Combobox.Input /> inside the popup…</Combobox.Portal>
</Combobox.Root>
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

Plus specials: `--<scale>-contrast` (legible text on step 9, for `gray`, `accent` and every status scale), `--<scale>-surface` (translucent panels), `--background` (page), and the panel/scrim pointers `--panel-solid` / `--panel-translucent` / `--surface` / `--overlay`. All are exposed to Tailwind via `@theme inline`, so utilities like `bg-accent-9`, `text-gray-11`, `border-gray-6`, `bg-accent-a3`, `text-accent-contrast`, `bg-danger-3` exist.

Pick by role, not by guessing a shade:

```ts
solid:   "bg-accent-9 text-accent-contrast hover:bg-accent-10"   // primary button
soft:    "bg-accent-3 text-accent-11 hover:bg-accent-4"          // tinted button
outline: "border border-gray-7 text-gray-12 hover:bg-gray-3"
ghost:   "text-gray-12 hover:bg-gray-3"
input:   "border border-gray-7 bg-gray-1 placeholder:text-gray-9 focus-visible:outline-focus-8"
card:    "bg-gray-2 text-gray-12 border border-gray-6"
muted:   "text-gray-11"
```

The contract ships **neutral** (accent == a dark gray) via the `theme` preset (`shadcn add ng-hai/ui/theme`). To brand it, install `theme-generator`, drop your brand seeds into its `THEMES` config, and run it — it regenerates the whole contract (pinning step 9 of each scale to its seed) with a printed WCAG self-check. Keep the token *names* stable; only the values change.

### Multiple accents — `data-accent-color`

Generated themes can carry an **accent pool**: the generator's `accents` map holds named scales (first key = the default `--accent-*`), each also emitted as `--<name>-*` tokens, `bg-<name>-9` utilities, and a `[data-accent-color="<name>"]` swap block. Setting that attribute on any element re-points every `accent-*` token (incl. `-contrast`) for its subtree — one slot fill in `accent-*` utilities yields every pool hue, no extra variants:

```tsx
<Badge.Root data-accent-color="jade">Active</Badge.Root>   {/* data-* passes through — no API needed */}
<section data-accent-color="purple">…whole area re-tints…</section>
```

Semantic roles stay meaning, not identity: `semantics: { danger: "red", premium: "jade" }` aliases a role onto a pool scale (zero extra scales) or seeds a private one from a color; roles never swap via the attribute. Style *stateful feedback* (alert, callout, destructive buttons) against role tokens (`bg-danger-9`); style *categorical identity* (badges, avatars, tags, section theming) against `accent-*` + the attribute.

### Gray as accent (neutral buttons)

**Buttons inherit the hue.** `Button.Root` pins no accent: inside a subtree that sets `data-accent-color` it takes that hue, like any other accent-built slot, so an action button inside a red alert reads red. Pass `data-accent-color="gray"` at the call site for a neutral button — the high-contrast neutral below — and a pool key to opt into the brand or any other hue.

`data-accent-color="gray"` is **always available** — `default.css` and every generated theme ship Radix Themes' gray remap (`accent-*` tokens → the theme's `gray-*` ramp; `"gray"` is reserved as a pool key). It neutralizes any accent-built slot per subtree or per element. Gray-9 solids are deliberately muted (below AA in light mode), so the swap block bakes in Radix's high-contrast treatment: `accent-9` → `gray-12`, `accent-10` → `--gray-12-hover`, `accent-contrast` → `gray-1` (alphas and all other steps stay 1:1). A solid built from `bg-accent-9 text-accent-contrast hover:bg-accent-10` therefore renders as a near-black (light) / near-white (dark) neutral at ~16:1 with no extra classes:

```tsx
<Button.Root variant="solid">Save</Button.Root>                            {/* gray by default: high-contrast neutral, 16:1 */}
<Button.Root variant="ghost">Cancel</Button.Root>                          {/* quiet gray chrome */}
<Button.Root variant="solid" data-accent-color="jade">Upgrade</Button.Root> {/* opt into a pool hue — spend the brand sparingly */}
```

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

## Icons

Some components take a glyph — a chevron for `<Select.Icon>`, an X for `<Dialog.Close>`, a check for `<Checkbox.Indicator>`. ui ships no glyphs and depends on no icon library; the icon set is the consuming app's choice. Those parts pass your children straight to the Base UI primitive, so pass the glyph at the call site. Without children, `Dialog.Close` and `Checkbox.Indicator` render empty; `Select.Icon` falls back to Base UI's plain-text `▼`:

```tsx
import { X, ChevronDown } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { Select } from "@/components/ui/select";

<Dialog.Close><X /></Dialog.Close>

<Select.Icon><ChevronDown /></Select.Icon>
```

Keep glyphs out of the component `.tsx` files themselves, so the icon set can change without touching component code.

## Rules

These hold for every ui component. Registry re-adds, the preset-injection path and consumers' CSS hooks all assume them.

- Tailwind classes live in `styles.ts`, not in `.tsx` files; the `className` pass-through for consumer overrides is the one exception. A component's look is then edited in one place and survives a registry re-add.
- Variant props are split by `createPropSplitter`, which reads `variantKeys` at runtime, so adding a variant to `styles.ts` is the whole change. Destructuring variant props by hand in the root breaks that.
- One part per file, named `<component>-<part>.tsx`.
- Every rendered primitive sets `data-slot="<component>"` or `data-slot="<component>-<part>"`; consumers target these from CSS.
- Root components keep their optional `styles` prop; it is the preset-injection path.
- Adding or removing a part means updating `index.parts.ts`. `index.ts` re-exports it and rarely changes.
- `lib/tv-config.ts`, `lib/create-style-context.ts` and `lib/split-variant-props.ts` are shared infrastructure; component work leaves them alone.
- Behaviour and ARIA come from `@base-ui/react` primitives; the primitive API is at [base-ui.com](https://base-ui.com).

## Installing from the registry

ui is a [shadcn GitHub registry](https://ui.shadcn.com/docs/registry/github). For the public `ng-hai/ui` repo there is **no setup and no auth** — install straight from the repo:

```bash
pnpm dlx shadcn@latest add ng-hai/ui/button
```

The first two path segments (`ng-hai/ui`) are the GitHub owner and repo; the rest (`button`) is the registry item. Transitive deps (`ng-hai/ui/tv-config`, `ng-hai/ui/split-variant-props`, `ng-hai/ui/create-style-context`) resolve automatically from the same repo. The CLI reads `registry.json` and the source files directly — there is no pre-built JSON, no `public/r`, and no `components.json` registry entry to configure.

> Use `shadcn@latest`; older CLIs do not understand the `owner/repo/item` form.

### Pin to a ref

A bare `ng-hai/ui/button` tracks the repo's default branch (`main`). Append `#<ref>` — a branch or commit SHA — to lock an install:

```bash
pnpm dlx shadcn@latest add ng-hai/ui/button#c0ffee2   # immutable commit SHA → reproducible
pnpm dlx shadcn@latest add ng-hai/ui/button#main      # explicit default branch
```

There are no version tags; reproducibility comes from pinning a commit SHA (or just committing the installed source into your own repo).

### Private forks

GitHub addresses (`owner/repo/item`) work for **public repos only** — *"Private repositories and GitHub Enterprise hosts are not currently supported by GitHub addresses."* If you fork ui into a private repo, the `ng-hai/ui/<name>` form will not resolve.

For a private fork, serve the registry behind an authenticated URL and reference it as a [namespace with authentication](https://ui.shadcn.com/docs/registry/authentication) in `components.json` — shadcn substitutes `${ENV_VAR}` into headers/params:

```json
{
  "registries": {
    "@ui": {
      "url": "https://your-registry.example.com/r/{name}.json",
      "headers": { "Authorization": "Bearer ${REGISTRY_TOKEN}" }
    }
  }
}
```

Set `REGISTRY_TOKEN` in `.env.local` (gitignored, never commit). Note this requires you to host the registry items yourself — the public-repo GitHub-address path does not apply to private repos.
