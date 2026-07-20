import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { useMenuStyles } from "./menu-root";

interface MenuSubmenuTriggerProps extends MenuPrimitive.SubmenuTrigger.Props {
  className?: string;
}

export function MenuSubmenuTrigger({ className, ...props }: MenuSubmenuTriggerProps) {
  const styles = useMenuStyles();
  return (
    <MenuPrimitive.SubmenuTrigger
      {...props}
      className={styles.submenuTrigger({ class: className })}
      data-slot="menu-submenu-trigger"
    />
  );
}
