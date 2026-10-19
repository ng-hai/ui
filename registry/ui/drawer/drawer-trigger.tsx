import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import { useDrawerStyles } from "./drawer-root";

interface DrawerTriggerProps<Payload = unknown> extends DrawerPrimitive.Trigger.Props<Payload> {
  className?: string;
}

export function DrawerTrigger<Payload = unknown>({ className, ...props }: DrawerTriggerProps<Payload>) {
  const styles = useDrawerStyles();
  return (
    <DrawerPrimitive.Trigger {...props} className={styles.trigger({ class: className })} data-slot="drawer-trigger" />
  );
}
