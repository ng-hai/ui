import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { useMenuStyles } from "./menu-root";

interface MenuItemProps extends MenuPrimitive.Item.Props {
  className?: string;
}

export function MenuItem({ className, ...props }: MenuItemProps) {
  const styles = useMenuStyles();
  return <MenuPrimitive.Item {...props} className={styles.item({ class: className })} data-slot="menu-item" />;
}
