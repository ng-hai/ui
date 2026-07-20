import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { useMenuStyles } from "./menu-root";

interface MenuRadioItemIndicatorProps extends MenuPrimitive.RadioItemIndicator.Props {
  className?: string;
}

export function MenuRadioItemIndicator({ className, ...props }: MenuRadioItemIndicatorProps) {
  const styles = useMenuStyles();
  return (
    <MenuPrimitive.RadioItemIndicator
      {...props}
      className={styles.radioItemIndicator({ class: className })}
      data-slot="menu-radio-item-indicator"
    />
  );
}
