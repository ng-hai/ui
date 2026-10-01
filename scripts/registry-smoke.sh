#!/usr/bin/env bash
# End-to-end install smoke test. Exercises the real consumer path — the shadcn
# CLI resolving ng-hai/ui/* from GitHub, rewriting @/ imports, installing npm
# deps into a minimal scaffold — then typechecks the result. A second scaffold
# brings a foreign (shadcn-style) Tailwind theme to prove components need none of ours.
#
# NOTE: this tests what's on GitHub (`main`, or the ref passed as $1), never
# the local working tree. A local-only fix is not smoke-testable until pushed.
set -euo pipefail

REF="${1:-}"
SUFFIX="${REF:+#$REF}"
ROOT="$(mktemp -d)"
trap 'rm -rf "$ROOT"' EXIT

fail() { echo "FAIL: $*" >&2; exit 1; }

# Minimal consumer project in $ROOT/$1 (cwd on return) with an empty
# src/index.css; Tailwind v4 is installed so either check can compile CSS.
scaffold() {
  mkdir -p "$ROOT/$1/src" && cd "$ROOT/$1" && touch src/index.css

  cat > package.json <<'JSON'
{
  "name": "registry-smoke",
  "private": true,
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@tailwindcss/cli": "^4.3.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "tailwindcss": "^4.3.0",
    "typescript": "^5.7.0"
  }
}
JSON

  # pnpm 11 fails installs with unreviewed build scripts; the Tailwind CLI's
  # file watcher is the only one here and the smoke test never watches.
  printf "allowBuilds:\n  '@parcel/watcher': false\n" > pnpm-workspace.yaml

  cat > tsconfig.json <<'JSON'
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "jsx": "react-jsx",
    "strict": true,
    "skipLibCheck": true,
    "noEmit": true,
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["src"]
}
JSON

  cat > components.json <<'JSON'
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "tsx": true,
  "tailwind": { "css": "src/index.css", "baseColor": "neutral", "cssVariables": true },
  "aliases": {
    "components": "@/components",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "utils": "@/lib/utils",
    "hooks": "@/hooks"
  }
}
JSON
}

# Install ng-hai/ui/$1 into the scaffold from GitHub, then typecheck it.
install() {
  pnpm dlx shadcn@latest add "ng-hai/ui/$1$SUFFIX" --yes
  pnpm install --silent
  pnpm exec tsc --noEmit
}

# 1. A component installs and typechecks on its own.
scaffold select
install select
echo "ok: ng-hai/ui/select installs and typechecks"

# 2. Bring your own theme: a shadcn-style Tailwind theme, no Radix tokens, styles
#    a component through plain className — and nothing of ours leaks in.
scaffold byo-theme
cat > src/index.css <<'CSS'
@import "tailwindcss";
:root { --primary: oklch(0.5 0.2 260); --primary-foreground: oklch(0.98 0 0); }
@theme inline {
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
}
CSS
install button
cat > src/demo.tsx <<'TSX'
import { Button } from "@/components/ui/button";

export const Demo = () => <Button.Root className="bg-primary text-primary-foreground">Go</Button.Root>;
TSX
pnpm exec tsc --noEmit
pnpm exec tailwindcss -i src/index.css -o out.css

grep -Eq '\.bg-primary\s*\{' out.css || fail "compiled CSS has no .bg-primary rule"
grep -A2 -E '\.bg-primary\s*\{' out.css | grep -q 'var(--primary)' || fail ".bg-primary does not resolve to var(--primary)"
[ -z "$(find src -iname '*theme*')" ] || fail "theme files were installed: $(find src -iname '*theme*')"
# Same patterns as registry/bare/token-free.test.ts, so shadcn's own `accent` /
# `accent-foreground` pass. Comments may mention tokens; only code is checked.
scales='accent|gray|danger|warning|success|info|focus'
token_re="\\b($scales)-a?[0-9]{1,2}\\b|--($scales)-|\\b($scales)-contrast\\b|data-accent-color"
tokens="$(grep -rEn "$token_re" src/components src/lib | grep -vE ':[0-9]+:\s*(//|/\*|\*)' || true)"
[ -z "$tokens" ] || fail "Radix token names in installed components:"$'\n'"$tokens"
echo "ok: button works under a foreign theme, no Radix theme installed"
