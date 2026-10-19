import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { usePopoverStyles } from "./popover-root";

interface PopoverTriggerProps<Payload = unknown> extends PopoverPrimitive.Trigger.Props<Payload> {
  className?: string;
}

export function PopoverTrigger<Payload = unknown>({ className, ...props }: PopoverTriggerProps<Payload>) {
  const styles = usePopoverStyles();
  return (
    <PopoverPrimitive.Trigger {...props} className={styles.trigger({ class: className })} data-slot="popover-trigger" />
  );
}
