import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import { createStyleContext } from "@/registry/lib/create-style-context";
import { createPropSplitter } from "@/registry/lib/split-variant-props";
import { drawerStyles } from "./styles";
import type { VariantProps } from "@/registry/lib/tv-config";

type DrawerStyles = ReturnType<typeof drawerStyles>;
type DrawerVariantProps = VariantProps<typeof drawerStyles>;

const { StyleContext, useStyles } = createStyleContext<DrawerStyles>("Drawer");
const splitProps = createPropSplitter(drawerStyles);

export { useStyles as useDrawerStyles };

interface DrawerRootProps<Payload = unknown> extends DrawerPrimitive.Root.Props<Payload>, DrawerVariantProps {
  styles?: DrawerStyles;
}

export function DrawerRoot<Payload = unknown>(props: DrawerRootProps<Payload>) {
  const [variantProps, { styles, ...htmlProps }] = splitProps(props);
  const s = styles ?? drawerStyles(variantProps);
  return (
    <StyleContext value={s}>
      <DrawerPrimitive.Root {...htmlProps} />
    </StyleContext>
  );
}
