import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import { useDrawerStyles } from "./drawer-root";

interface DrawerSwipeAreaProps extends DrawerPrimitive.SwipeArea.Props {
  className?: string;
}

export function DrawerSwipeArea({ className, ...props }: DrawerSwipeAreaProps) {
  const styles = useDrawerStyles();
  return (
    <DrawerPrimitive.SwipeArea
      {...props}
      className={styles.swipeArea({ class: className })}
      data-slot="drawer-swipe-area"
    />
  );
}
