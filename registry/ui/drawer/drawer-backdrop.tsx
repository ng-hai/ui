import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import { useDrawerStyles } from "./drawer-root";

interface DrawerBackdropProps extends DrawerPrimitive.Backdrop.Props {
  className?: string;
}

export function DrawerBackdrop({ className, ...props }: DrawerBackdropProps) {
  const styles = useDrawerStyles();
  return (
    <DrawerPrimitive.Backdrop
      {...props}
      className={styles.backdrop({ class: className })}
      data-slot="drawer-backdrop"
    />
  );
}
