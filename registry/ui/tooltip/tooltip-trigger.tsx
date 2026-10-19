import { use } from "react";
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { TooltipStyleContext } from "./tooltip-root";
import { tooltipStyles } from "./styles";

interface TooltipTriggerProps<Payload = unknown> extends TooltipPrimitive.Trigger.Props<Payload> {
  className?: string;
}

export function TooltipTrigger<Payload = unknown>({ className, ...props }: TooltipTriggerProps<Payload>) {
  const styles = use(TooltipStyleContext) ?? tooltipStyles();
  return (
    <TooltipPrimitive.Trigger {...props} className={styles.trigger({ class: className })} data-slot="tooltip-trigger" />
  );
}
