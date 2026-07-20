import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import { useDrawerStyles } from "./drawer-root";

interface DrawerTitleProps extends DrawerPrimitive.Title.Props {
  className?: string;
}

export function DrawerTitle({ className, ...props }: DrawerTitleProps) {
  const styles = useDrawerStyles();
  return <DrawerPrimitive.Title {...props} className={styles.title({ class: className })} data-slot="drawer-title" />;
}
