import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { useMenuStyles } from "./menu-root";

interface MenuCheckboxItemIndicatorProps extends MenuPrimitive.CheckboxItemIndicator.Props {
  className?: string;
}

export function MenuCheckboxItemIndicator({ className, ...props }: MenuCheckboxItemIndicatorProps) {
  const styles = useMenuStyles();
  return (
    <MenuPrimitive.CheckboxItemIndicator
      {...props}
      className={styles.checkboxItemIndicator({ class: className })}
      data-slot="menu-checkbox-item-indicator"
    />
  );
}
