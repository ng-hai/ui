import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import { useDrawerStyles } from "./drawer-root";

interface DrawerViewportProps extends DrawerPrimitive.Viewport.Props {
  className?: string;
}

export function DrawerViewport({ className, ...props }: DrawerViewportProps) {
  const styles = useDrawerStyles();
  return (
    <DrawerPrimitive.Viewport
      {...props}
      className={styles.viewport({ class: className })}
      data-slot="drawer-viewport"
    />
  );
}
