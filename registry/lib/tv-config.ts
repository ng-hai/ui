import { createTV } from "tailwind-variants";

// Register every non-t-shirt name your `@theme` defines for these scales
// (`--text-body-2` → `"body-2"`), or tailwind-merge reads the class as a colour
// and drops it; `scripts/check-tv-config.ts` checks the list against your CSS.
export const twMergeTheme = {
  text: [] as string[],
  shadow: [] as string[],
  "inset-shadow": [] as string[],
  "drop-shadow": [] as string[],
  "text-shadow": [] as string[],
};

export const tv = createTV({
  twMerge: true,
  twMergeConfig: {
    extend: {
      theme: twMergeTheme,
      classGroups: {},
    },
  },
});

export type { VariantProps } from "tailwind-variants";
