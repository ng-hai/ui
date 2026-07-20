import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import { useDrawerStyles } from "./drawer-root";

interface DrawerPopupProps extends DrawerPrimitive.Popup.Props {
  className?: string;
}

export function DrawerPopup({ className, ...props }: DrawerPopupProps) {
  const styles = useDrawerStyles();
  return <DrawerPrimitive.Popup {...props} className={styles.popup({ class: className })} data-slot="drawer-popup" />;
}
