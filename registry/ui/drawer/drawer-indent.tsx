import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import { useDrawerStyles } from "./drawer-root";

interface DrawerIndentProps extends DrawerPrimitive.Indent.Props {
  className?: string;
}

export function DrawerIndent({ className, ...props }: DrawerIndentProps) {
  const styles = useDrawerStyles();
  return (
    <DrawerPrimitive.Indent {...props} className={styles.indent({ class: className })} data-slot="drawer-indent" />
  );
}
