import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { useMenuStyles } from "./menu-root";

interface MenuViewportProps extends MenuPrimitive.Viewport.Props {
  className?: string;
}

export function MenuViewport({ className, ...props }: MenuViewportProps) {
  const styles = useMenuStyles();
  return (
    <MenuPrimitive.Viewport {...props} className={styles.viewport({ class: className })} data-slot="menu-viewport" />
  );
}
