import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { useMenuStyles } from "./menu-root";

interface MenuLinkItemProps extends MenuPrimitive.LinkItem.Props {
  className?: string;
}

export function MenuLinkItem({ className, ...props }: MenuLinkItemProps) {
  const styles = useMenuStyles();
  return (
    <MenuPrimitive.LinkItem {...props} className={styles.linkItem({ class: className })} data-slot="menu-link-item" />
  );
}
