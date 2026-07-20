import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { useMenuStyles } from "./menu-root";

interface MenuGroupLabelProps extends MenuPrimitive.GroupLabel.Props {
  className?: string;
}

export function MenuGroupLabel({ className, ...props }: MenuGroupLabelProps) {
  const styles = useMenuStyles();
  return (
    <MenuPrimitive.GroupLabel
      {...props}
      className={styles.groupLabel({ class: className })}
      data-slot="menu-group-label"
    />
  );
}
