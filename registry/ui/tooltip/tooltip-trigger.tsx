import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { useTooltipStyles } from "./tooltip-root";

interface TooltipTriggerProps extends TooltipPrimitive.Trigger.Props {
  className?: string;
}

export function TooltipTrigger({ className, ...props }: TooltipTriggerProps) {
  const styles = useTooltipStyles();
  return (
    <TooltipPrimitive.Trigger {...props} className={styles.trigger({ class: className })} data-slot="tooltip-trigger" />
  );
}
