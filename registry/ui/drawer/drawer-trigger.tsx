import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import { useDrawerStyles } from "./drawer-root";

interface DrawerTriggerProps extends DrawerPrimitive.Trigger.Props {
  className?: string;
}

export function DrawerTrigger({ className, ...props }: DrawerTriggerProps) {
  const styles = useDrawerStyles();
  return (
    <DrawerPrimitive.Trigger {...props} className={styles.trigger({ class: className })} data-slot="drawer-trigger" />
  );
}
