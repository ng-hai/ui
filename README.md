# bare-ui

A [shadcn](https://ui.shadcn.com) registry of **unstyled** React components built on [`@base-ui/react`](https://base-ui.com). You install components into your project with the `shadcn` CLI, own the source, and bring your own styles.

Every component ships with an empty Tailwind Variants slot config — the behavior, ARIA, and composition are baked in; the look is yours.

## Install a component

This repo is a [GitHub registry](https://ui.shadcn.com/docs/registry/github). There's no `components.json` setup, no namespace, and no registry URL to configure — install straight from the repo with the `shadcn` CLI:

```bash
pnpm dlx shadcn@latest add ng-hai/bare-ui/button
```

The first two path segments (`ng-hai/bare-ui`) are the GitHub owner and repo; the rest (`button`) is the registry item. This copies the component source into `components/ui/button/` and the shared helpers (`tv.config.ts`, `split-variant-props.ts`, and — for multi-part components — `create-style-context.ts`) into `lib/`. Transitive dependencies (`ng-hai/bare-ui/tv-config`, `ng-hai/bare-ui/split-variant-props`, etc.) resolve automatically from the same repo.

> GitHub registries require a recent `shadcn` CLI (the `owner/repo/item` form landed in the 4.x line). Using `shadcn@latest` as above always works.

Available components: `accordion`, `alert-dialog`, `autocomplete`, `avatar`, `button`, `checkbox`, `checkbox-group`, `collapsible`, `combobox`, `context-menu`, `dialog`, `drawer`, `field`, `fieldset`, `form`, `input`, `menu`, `menubar`, `meter`, `navigation-menu`, `number-field`, `otp-field`, `popover`, `preview-card`, `progress`, `radio`, `scroll-area`, `select`, `separator`, `slider`, `switch`, `tabs`, `toast`, `toggle`, `toggle-group`, `toolbar`, `tooltip`. The shared libs each component needs (`tv-config`, `split-variant-props`, `create-style-context`) are pulled in automatically as dependencies. The `theme` preset is **not** a dependency — components ship unstyled and reference no tokens. It's an *optional* starting palette (a Radix-style token contract + the Tailwind `@theme` wiring our styling examples use); install it with `shadcn add ng-hai/bare-ui/theme`, or skip it and style the components with your own tokens.

### Pin to a specific version (optional)

A bare `ng-hai/bare-ui/button` tracks the repo's default branch (`main`) — every merge is immediately installable. To lock an install to an exact point in history, append `#<ref>`, where `<ref>` is a branch or commit SHA:

```bash
pnpm dlx shadcn@latest add ng-hai/bare-ui/button#c0ffee2   # pin to a commit
pnpm dlx shadcn@latest add ng-hai/bare-ui/button#main      # explicit default branch
```

Commit SHAs are immutable, so pinning to one gives a fully reproducible install. Transitive dependencies resolve at the same ref, so the whole component tree stays consistent. Commit the resulting source into your repo — that, not a version string, is your record of what you installed.

## Use it

Components are exposed as namespaces — the root and every part are accessed as dotted members. A single-part component still uses `.Root`:

```tsx
import { Button } from "@/components/ui/button";

export function Example() {
  return <Button.Root onClick={() => console.log("clicked")}>Save</Button.Root>;
}
```

Multi-part components compose from the same namespace:

```tsx
import { Checkbox } from "@/components/ui/checkbox";

<Checkbox.Root>
  <Checkbox.Indicator />
</Checkbox.Root>;
```

```tsx
import { Select } from "@/components/ui/select";

<Select.Root>
  <Select.Trigger>
    <Select.Value />
    <Select.Icon />
  </Select.Trigger>
  <Select.Portal>
    <Select.Positioner>
      <Select.Popup>
        <Select.Item value="a">
          <Select.ItemText>A</Select.ItemText>
        </Select.Item>
      </Select.Popup>
    </Select.Positioner>
  </Select.Portal>
</Select.Root>;
```

Out of the box every component renders with no classes. Styling happens in one place: the component's own `styles.ts`.

## Styling

Each installed component folder contains a `styles.ts` file with a `tv({ slots, variants })` call. Fill in the slot arrays and add variants:

```ts
// components/ui/button/styles.ts
import { tv } from "@/lib/tv.config";

export const buttonStyles = tv({
  slots: {
    root: "inline-flex items-center justify-center rounded-md text-sm font-medium",
  },
  variants: {
    variant: {
      solid: { root: "bg-accent-9 text-accent-contrast hover:bg-accent-10" },
      ghost: { root: "text-gray-12 hover:bg-gray-3" },
    },
    size: {
      sm: { root: "h-8 px-3" },
      md: { root: "h-9 px-4" },
    },
  },
  defaultVariants: { variant: "solid", size: "md" },
});
```

Variant props are inferred automatically — `<Button.Root variant="ghost" size="sm" />` just works because the root uses `createPropSplitter` to separate variants from HTML props at runtime.

For multi-part components, add a slot per part and the matching root will publish them via context so every part picks up its slot automatically:

```ts
// components/ui/checkbox/styles.ts
export const checkboxStyles = tv({
  slots: {
    root: "h-4 w-4 rounded border border-gray-7",
    indicator: "flex items-center justify-center text-accent-9",
  },
});
```

Every rendered element also emits a `data-slot="<name>"` attribute, so you can reach parts from global CSS too:

```css
[data-slot="checkbox"][data-checked] {
  background: var(--accent-9);
}
```

## Per-instance style override

Every root accepts an optional `styles` prop — a pre-computed TV result — that replaces the styles for a single instance. Every component also exports its `*Styles` object alongside the component, so you can compose from it.

**Lock in a variant** by calling the exported styles with the variant you want and passing the result:

```tsx
import { Button, buttonStyles } from "@/components/ui/button";

const large = buttonStyles({ size: "lg" });

<Button.Root styles={large}>Save</Button.Root>;
```

**Extend** by creating a new TV instance off the existing one — add slots, add variants, or append classes — then call it and pass the result:

```tsx
import { tv } from "@/lib/tv.config";
import { Button, buttonStyles } from "@/components/ui/button";

const danger = tv({
  extend: buttonStyles,
  slots: {
    root: "bg-danger-9 text-danger-contrast hover:bg-danger-10",
  },
});

<Button.Root styles={danger()}>Delete</Button.Root>;
```

When `styles` is passed, the root's own variant resolution is skipped — variant props on the element won't be re-evaluated, so bake them into the call above.

## Set up the Claude Code skill (optional)

bare-ui ships a [Claude Code skill](https://docs.claude.com/en/docs/claude-code/skills) — `skills/bare-ui/SKILL.md` — that teaches Claude the conventions of this registry: the root/parts layering, `createPropSplitter`, `StyleContext`, the `styles` prop escape hatch, private-registry auth, and common pitfalls. With it installed, Claude Code can add, extend, and style bare-ui components idiomatically without you pasting context every time.

### Install

> You only need `.claude/skills/bare-ui/SKILL.md` in your project — don't recreate the `skills/` directory you see in this repo. That's bare-ui's internal layout, kept so the file is browsable on GitHub; the consumer-side path is dictated by Claude Code, not by us.

Drop the skill into your project's [`.claude/skills/`](https://docs.claude.com/en/docs/claude-code/skills) directory — that's the path Claude Code scans for project-scoped skills. It's picked up automatically on the next session.

```bash
mkdir -p .claude/skills/bare-ui
curl -fsSL https://raw.githubusercontent.com/ng-hai/bare-ui/main/skills/bare-ui/SKILL.md \
  -o .claude/skills/bare-ui/SKILL.md
```

Commit the file so your whole team gets it:

```bash
git add .claude/skills/bare-ui/SKILL.md
git commit -m "chore: add bare-ui Claude Code skill"
```

### Private registry repo

If `ng-hai/bare-ui` is a fork in a private org, `curl` needs an auth token. Use the GitHub CLI:

```bash
gh api repos/<org>/bare-ui/contents/skills/bare-ui/SKILL.md \
  -H "Accept: application/vnd.github.raw" \
  > .claude/skills/bare-ui/SKILL.md
```

### Stay in sync (optional)

If you want updates to flow automatically, add the upstream as a sparse git subtree instead of a one-time copy:

```bash
git subtree add --prefix=.claude/skills/bare-ui \
  https://github.com/ng-hai/bare-ui.git main --squash
# later, to pull updates:
git subtree pull --prefix=.claude/skills/bare-ui \
  https://github.com/ng-hai/bare-ui.git main --squash
```

Subtree pulls the whole repo under the prefix, so pair it with a sparse-checkout or prefer the `curl` route if you only want the single `SKILL.md`.

### Verify

Open Claude Code in your project and run `/skills` — you should see `bare-ui` in the list with the description `Rules for working with bare-ui unstyled components …`. Next time you ask Claude to add or style a bare-ui component, it will invoke the skill automatically.

## License

MIT
