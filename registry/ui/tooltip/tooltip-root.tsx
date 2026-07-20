import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { createStyleContext } from "@/registry/lib/create-style-context";
import { createPropSplitter } from "@/registry/lib/split-variant-props";
import { tooltipStyles } from "./styles";
import type { VariantProps } from "@/registry/lib/tv.config";

type TooltipStyles = ReturnType<typeof tooltipStyles>;
type TooltipVariantProps = VariantProps<typeof tooltipStyles>;

const { StyleContext, useStyles } = createStyleContext<TooltipStyles>("Tooltip");
const splitProps = createPropSplitter(tooltipStyles);

export { useStyles as useTooltipStyles };

interface TooltipRootProps extends TooltipPrimitive.Root.Props, TooltipVariantProps {
  styles?: TooltipStyles;
}

export function TooltipRoot(props: TooltipRootProps) {
  const [variantProps, { styles, ...htmlProps }] = splitProps(props);
  const s = styles ?? tooltipStyles(variantProps);
  return (
    <StyleContext value={s}>
      <TooltipPrimitive.Root {...htmlProps} />
    </StyleContext>
  );
}
