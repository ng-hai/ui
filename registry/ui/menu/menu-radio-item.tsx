import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { useMenuStyles } from "./menu-root";

interface MenuRadioItemProps extends MenuPrimitive.RadioItem.Props {
  className?: string;
}

export function MenuRadioItem({ className, ...props }: MenuRadioItemProps) {
  const styles = useMenuStyles();
  return (
    <MenuPrimitive.RadioItem
      {...props}
      className={styles.radioItem({ class: className })}
      data-slot="menu-radio-item"
    />
  );
}
