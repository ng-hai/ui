import { use } from "react";
import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { MenuStyleContext } from "./menu-root";
import { menuStyles } from "./styles";

interface MenuTriggerProps<Payload = unknown> extends MenuPrimitive.Trigger.Props<Payload> {
  className?: string;
}

export function MenuTrigger<Payload = unknown>({ className, ...props }: MenuTriggerProps<Payload>) {
  const styles = use(MenuStyleContext) ?? menuStyles();
  return <MenuPrimitive.Trigger {...props} className={styles.trigger({ class: className })} data-slot="menu-trigger" />;
}
