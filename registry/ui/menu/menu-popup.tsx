import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { useMenuStyles } from "./menu-root";

interface MenuPopupProps extends MenuPrimitive.Popup.Props {
  className?: string;
}

export function MenuPopup({ className, ...props }: MenuPopupProps) {
  const styles = useMenuStyles();
  return <MenuPrimitive.Popup {...props} className={styles.popup({ class: className })} data-slot="menu-popup" />;
}
