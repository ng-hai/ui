import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { useMenuStyles } from "./menu-root";

interface MenuTriggerProps extends MenuPrimitive.Trigger.Props {
  className?: string;
}

export function MenuTrigger({ className, ...props }: MenuTriggerProps) {
  const styles = useMenuStyles();
  return <MenuPrimitive.Trigger {...props} className={styles.trigger({ class: className })} data-slot="menu-trigger" />;
}
