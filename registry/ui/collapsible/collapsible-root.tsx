import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import { createStyleContext } from "@/registry/lib/create-style-context";
import { createPropSplitter } from "@/registry/lib/split-variant-props";
import { collapsibleStyles } from "./styles";
import type { VariantProps } from "@/registry/lib/tv.config";

type CollapsibleStyles = ReturnType<typeof collapsibleStyles>;
type CollapsibleVariantProps = VariantProps<typeof collapsibleStyles>;

const { StyleContext, useStyles } = createStyleContext<CollapsibleStyles>("Collapsible");
const splitProps = createPropSplitter(collapsibleStyles);

export { useStyles as useCollapsibleStyles };

interface CollapsibleRootProps extends CollapsiblePrimitive.Root.Props, CollapsibleVariantProps {
  className?: string;
  styles?: CollapsibleStyles;
}

export function CollapsibleRoot(props: CollapsibleRootProps) {
  const [variantProps, { className, styles, ...htmlProps }] = splitProps(props);
  const s = styles ?? collapsibleStyles(variantProps);
  return (
    <StyleContext value={s}>
      <CollapsiblePrimitive.Root {...htmlProps} className={s.root({ class: className })} data-slot="collapsible" />
    </StyleContext>
  );
}
