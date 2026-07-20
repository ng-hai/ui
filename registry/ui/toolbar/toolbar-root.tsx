import { Toolbar as ToolbarPrimitive } from "@base-ui/react/toolbar";
import { createStyleContext } from "@/registry/lib/create-style-context";
import { createPropSplitter } from "@/registry/lib/split-variant-props";
import { toolbarStyles } from "./styles";
import type { VariantProps } from "@/registry/lib/tv.config";

type ToolbarStyles = ReturnType<typeof toolbarStyles>;
type ToolbarVariantProps = VariantProps<typeof toolbarStyles>;

const { StyleContext, useStyles } = createStyleContext<ToolbarStyles>("Toolbar");
const splitProps = createPropSplitter(toolbarStyles);

export { useStyles as useToolbarStyles };

interface ToolbarRootProps extends ToolbarPrimitive.Root.Props, ToolbarVariantProps {
  className?: string;
  styles?: ToolbarStyles;
}

export function ToolbarRoot(props: ToolbarRootProps) {
  const [variantProps, { className, styles, ...htmlProps }] = splitProps(props);
  const s = styles ?? toolbarStyles(variantProps);
  return (
    <StyleContext value={s}>
      <ToolbarPrimitive.Root {...htmlProps} className={s.root({ class: className })} data-slot="toolbar" />
    </StyleContext>
  );
}
