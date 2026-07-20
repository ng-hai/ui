import { createTV } from "tailwind-variants";

export const tv = createTV({
  twMerge: true,
  twMergeConfig: {
    extend: {
      classGroups: {},
    },
  },
});

export type { VariantProps } from "tailwind-variants";
