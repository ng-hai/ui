import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { useMenuStyles } from "./menu-root";

interface MenuPositionerProps extends MenuPrimitive.Positioner.Props {
  className?: string;
}

export function MenuPositioner({ className, ...props }: MenuPositionerProps) {
  const styles = useMenuStyles();
  return (
    <MenuPrimitive.Positioner
      {...props}
      className={styles.positioner({ class: className })}
      data-slot="menu-positioner"
    />
  );
}
