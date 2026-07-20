import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { useMenuStyles } from "./menu-root";

interface MenuArrowProps extends MenuPrimitive.Arrow.Props {
  className?: string;
}

export function MenuArrow({ className, ...props }: MenuArrowProps) {
  const styles = useMenuStyles();
  return <MenuPrimitive.Arrow {...props} className={styles.arrow({ class: className })} data-slot="menu-arrow" />;
}
