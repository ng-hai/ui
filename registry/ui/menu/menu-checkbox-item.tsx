import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { useMenuStyles } from "./menu-root";

interface MenuCheckboxItemProps extends MenuPrimitive.CheckboxItem.Props {
  className?: string;
}

export function MenuCheckboxItem({ className, ...props }: MenuCheckboxItemProps) {
  const styles = useMenuStyles();
  return (
    <MenuPrimitive.CheckboxItem
      {...props}
      className={styles.checkboxItem({ class: className })}
      data-slot="menu-checkbox-item"
    />
  );
}
