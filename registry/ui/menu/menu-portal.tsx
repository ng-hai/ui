import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { useMenuStyles } from "./menu-root";

interface MenuPortalProps extends MenuPrimitive.Portal.Props {
  className?: string;
}

export function MenuPortal({ className, ...props }: MenuPortalProps) {
  const styles = useMenuStyles();
  return <MenuPrimitive.Portal {...props} className={styles.portal({ class: className })} data-slot="menu-portal" />;
}
