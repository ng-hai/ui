import type { ComponentProps } from "react";
import { createStyleContext } from "@/registry/bare/lib/create-style-context";
import { createPropSplitter } from "@/registry/bare/lib/split-variant-props";
import { sidebarStyles } from "./styles";
import type { VariantProps } from "@/registry/bare/lib/tv.config";

type SidebarStyles = ReturnType<typeof sidebarStyles>;
type SidebarVariantProps = VariantProps<typeof sidebarStyles>;

const { StyleContext, useStyles } = createStyleContext<SidebarStyles>("Sidebar");
const splitProps = createPropSplitter(sidebarStyles);

export { useStyles as useSidebarStyles };

interface SidebarRootProps extends ComponentProps<"aside">, SidebarVariantProps {
  styles?: SidebarStyles;
}

export function SidebarRoot(props: SidebarRootProps) {
  const [variantProps, { className, styles, ...htmlProps }] = splitProps(props);
  const s = styles ?? sidebarStyles(variantProps);
  return (
    <StyleContext value={s}>
      <aside {...htmlProps} className={s.root({ class: className })} data-slot="sidebar" />
    </StyleContext>
  );
}
