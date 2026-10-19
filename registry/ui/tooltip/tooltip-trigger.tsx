import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { useTooltipStyles } from "./tooltip-root";

interface TooltipTriggerProps<Payload = unknown> extends TooltipPrimitive.Trigger.Props<Payload> {
  className?: string;
}

export function TooltipTrigger<Payload = unknown>({ className, ...props }: TooltipTriggerProps<Payload>) {
  const styles = useTooltipStyles();
  return (
    <TooltipPrimitive.Trigger {...props} className={styles.trigger({ class: className })} data-slot="tooltip-trigger" />
  );
}
