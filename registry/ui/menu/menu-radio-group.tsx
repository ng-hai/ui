import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { useMenuStyles } from "./menu-root";

interface MenuRadioGroupProps extends MenuPrimitive.RadioGroup.Props {
  className?: string;
}

export function MenuRadioGroup({ className, ...props }: MenuRadioGroupProps) {
  const styles = useMenuStyles();
  return (
    <MenuPrimitive.RadioGroup
      {...props}
      className={styles.radioGroup({ class: className })}
      data-slot="menu-radio-group"
    />
  );
}
