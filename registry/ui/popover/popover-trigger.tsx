import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { usePopoverStyles } from "./popover-root";

interface PopoverTriggerProps extends PopoverPrimitive.Trigger.Props {
  className?: string;
}

export function PopoverTrigger({ className, ...props }: PopoverTriggerProps) {
  const styles = usePopoverStyles();
  return (
    <PopoverPrimitive.Trigger {...props} className={styles.trigger({ class: className })} data-slot="popover-trigger" />
  );
}
