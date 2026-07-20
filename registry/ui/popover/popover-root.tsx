import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { createStyleContext } from "@/registry/lib/create-style-context";
import { createPropSplitter } from "@/registry/lib/split-variant-props";
import { popoverStyles } from "./styles";
import type { VariantProps } from "@/registry/lib/tv.config";

type PopoverStyles = ReturnType<typeof popoverStyles>;
type PopoverVariantProps = VariantProps<typeof popoverStyles>;

const { StyleContext, useStyles } = createStyleContext<PopoverStyles>("Popover");
const splitProps = createPropSplitter(popoverStyles);

export { useStyles as usePopoverStyles };

interface PopoverRootProps extends PopoverPrimitive.Root.Props, PopoverVariantProps {
  styles?: PopoverStyles;
}

export function PopoverRoot(props: PopoverRootProps) {
  const [variantProps, { styles, ...htmlProps }] = splitProps(props);
  const s = styles ?? popoverStyles(variantProps);
  return (
    <StyleContext value={s}>
      <PopoverPrimitive.Root {...htmlProps} />
    </StyleContext>
  );
}
