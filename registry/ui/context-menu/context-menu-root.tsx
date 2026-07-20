import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { createStyleContext } from "@/registry/lib/create-style-context";
import { createPropSplitter } from "@/registry/lib/split-variant-props";
import { contextMenuStyles } from "./styles";
import type { VariantProps } from "@/registry/lib/tv.config";

type ContextMenuStyles = ReturnType<typeof contextMenuStyles>;
type ContextMenuVariantProps = VariantProps<typeof contextMenuStyles>;

const { StyleContext, useStyles } = createStyleContext<ContextMenuStyles>("ContextMenu");
const splitProps = createPropSplitter(contextMenuStyles);

export { useStyles as useContextMenuStyles };

interface ContextMenuRootProps extends ContextMenuPrimitive.Root.Props, ContextMenuVariantProps {
  styles?: ContextMenuStyles;
}

export function ContextMenuRoot(props: ContextMenuRootProps) {
  const [variantProps, { styles, ...htmlProps }] = splitProps(props);
  const s = styles ?? contextMenuStyles(variantProps);
  return (
    <StyleContext value={s}>
      <ContextMenuPrimitive.Root {...htmlProps} />
    </StyleContext>
  );
}
