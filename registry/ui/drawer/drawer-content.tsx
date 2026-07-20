import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import { useDrawerStyles } from "./drawer-root";

interface DrawerContentProps extends DrawerPrimitive.Content.Props {
  className?: string;
}

export function DrawerContent({ className, ...props }: DrawerContentProps) {
  const styles = useDrawerStyles();
  return (
    <DrawerPrimitive.Content {...props} className={styles.content({ class: className })} data-slot="drawer-content" />
  );
}
