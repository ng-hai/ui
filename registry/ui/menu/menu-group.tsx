import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { useMenuStyles } from "./menu-root";

interface MenuGroupProps extends MenuPrimitive.Group.Props {
  className?: string;
}

export function MenuGroup({ className, ...props }: MenuGroupProps) {
  const styles = useMenuStyles();
  return <MenuPrimitive.Group {...props} className={styles.group({ class: className })} data-slot="menu-group" />;
}
