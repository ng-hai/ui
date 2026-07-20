import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import { useDrawerStyles } from "./drawer-root";

interface DrawerPortalProps extends DrawerPrimitive.Portal.Props {
  className?: string;
}

export function DrawerPortal({ className, ...props }: DrawerPortalProps) {
  const styles = useDrawerStyles();
  return (
    <DrawerPrimitive.Portal {...props} className={styles.portal({ class: className })} data-slot="drawer-portal" />
  );
}
