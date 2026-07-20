import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import { useDrawerStyles } from "./drawer-root";

interface DrawerCloseProps extends DrawerPrimitive.Close.Props {
  className?: string;
}

export function DrawerClose({ className, ...props }: DrawerCloseProps) {
  const styles = useDrawerStyles();
  return <DrawerPrimitive.Close {...props} className={styles.close({ class: className })} data-slot="drawer-close" />;
}
