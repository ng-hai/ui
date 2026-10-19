import { use } from "react";
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import { DrawerStyleContext } from "./drawer-root";
import { drawerStyles } from "./styles";

interface DrawerTriggerProps<Payload = unknown> extends DrawerPrimitive.Trigger.Props<Payload> {
  className?: string;
}

export function DrawerTrigger<Payload = unknown>({ className, ...props }: DrawerTriggerProps<Payload>) {
  const styles = use(DrawerStyleContext) ?? drawerStyles();
  return (
    <DrawerPrimitive.Trigger {...props} className={styles.trigger({ class: className })} data-slot="drawer-trigger" />
  );
}
