import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { useMenuStyles } from "./menu-root";

interface MenuSeparatorProps extends MenuPrimitive.Separator.Props {
  className?: string;
}

export function MenuSeparator({ className, ...props }: MenuSeparatorProps) {
  const styles = useMenuStyles();
  return (
    <MenuPrimitive.Separator
      {...props}
      className={styles.separator({ class: className })}
      data-slot="menu-separator"
    />
  );
}
