import { Menubar as MenubarPrimitive } from "@base-ui/react/menubar";
import { createPropSplitter } from "@/registry/lib/split-variant-props";
import { menubarStyles } from "./styles";
import type { VariantProps } from "@/registry/lib/tv.config";

type MenubarVariantProps = VariantProps<typeof menubarStyles>;
const splitProps = createPropSplitter(menubarStyles);

interface MenubarRootProps extends MenubarPrimitive.Props, MenubarVariantProps {
  className?: string;
  styles?: ReturnType<typeof menubarStyles>;
}

export function MenubarRoot(props: MenubarRootProps) {
  const [variantProps, { className, styles, ...htmlProps }] = splitProps(props);
  const s = styles ?? menubarStyles(variantProps);
  return <MenubarPrimitive {...htmlProps} className={s.root({ class: className })} data-slot="menubar" />;
}
