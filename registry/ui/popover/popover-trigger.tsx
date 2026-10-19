import { use } from "react";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { PopoverStyleContext } from "./popover-root";
import { popoverStyles } from "./styles";

interface PopoverTriggerProps<Payload = unknown> extends PopoverPrimitive.Trigger.Props<Payload> {
  className?: string;
}

export function PopoverTrigger<Payload = unknown>({ className, ...props }: PopoverTriggerProps<Payload>) {
  const styles = use(PopoverStyleContext) ?? popoverStyles();
  return (
    <PopoverPrimitive.Trigger {...props} className={styles.trigger({ class: className })} data-slot="popover-trigger" />
  );
}
