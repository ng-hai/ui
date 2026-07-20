import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { useMenuStyles } from "./menu-root";

interface MenuBackdropProps extends MenuPrimitive.Backdrop.Props {
  className?: string;
}

export function MenuBackdrop({ className, ...props }: MenuBackdropProps) {
  const styles = useMenuStyles();
  return (
    <MenuPrimitive.Backdrop {...props} className={styles.backdrop({ class: className })} data-slot="menu-backdrop" />
  );
}
