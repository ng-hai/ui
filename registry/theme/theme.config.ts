// Maintainer-only config for `pnpm gen:theme` — NOT part of any registry item.
// Generates a sample theme into a git-ignored cache dir, to exercise the pipeline.
import { defineConfig, defineTheme } from "./gen-theme";

export default defineConfig({
  themes: [
    defineTheme({
      name: "example",
      accents: { blue: "#2563eb", jade: "#29a383" },
      semantics: { info: "blue", danger: "#e5484d", warning: "#ffc53d", success: "#30a46c" },
    }),
  ],
  outDir: "node_modules/.cache/ui-themes",
  tenants: true,
});
