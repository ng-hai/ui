import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";
import { createStyleContext } from "@/registry/lib/create-style-context";
import { createPropSplitter } from "@/registry/lib/split-variant-props";
import { scrollAreaStyles } from "./styles";
import type { VariantProps } from "@/registry/lib/tv.config";

type ScrollAreaStyles = ReturnType<typeof scrollAreaStyles>;
type ScrollAreaVariantProps = VariantProps<typeof scrollAreaStyles>;

const { StyleContext, useStyles } = createStyleContext<ScrollAreaStyles>("ScrollArea");
const splitProps = createPropSplitter(scrollAreaStyles);

export { useStyles as useScrollAreaStyles };

interface ScrollAreaRootProps extends ScrollAreaPrimitive.Root.Props, ScrollAreaVariantProps {
  className?: string;
  styles?: ScrollAreaStyles;
}

export function ScrollAreaRoot(props: ScrollAreaRootProps) {
  const [variantProps, { className, styles, ...htmlProps }] = splitProps(props);
  const s = styles ?? scrollAreaStyles(variantProps);
  return (
    <StyleContext value={s}>
      <ScrollAreaPrimitive.Root {...htmlProps} className={s.root({ class: className })} data-slot="scroll-area" />
    </StyleContext>
  );
}
