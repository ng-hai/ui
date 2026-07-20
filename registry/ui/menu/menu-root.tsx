import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { createStyleContext } from "@/registry/lib/create-style-context";
import { createPropSplitter } from "@/registry/lib/split-variant-props";
import { menuStyles } from "./styles";
import type { VariantProps } from "@/registry/lib/tv.config";

type MenuStyles = ReturnType<typeof menuStyles>;
type MenuVariantProps = VariantProps<typeof menuStyles>;

const { StyleContext, useStyles } = createStyleContext<MenuStyles>("Menu");
const splitProps = createPropSplitter(menuStyles);

export { useStyles as useMenuStyles };

interface MenuRootProps extends MenuPrimitive.Root.Props, MenuVariantProps {
  styles?: MenuStyles;
}

export function MenuRoot(props: MenuRootProps) {
  const [variantProps, { styles, ...htmlProps }] = splitProps(props);
  const s = styles ?? menuStyles(variantProps);
  return (
    <StyleContext value={s}>
      <MenuPrimitive.Root {...htmlProps} />
    </StyleContext>
  );
}
