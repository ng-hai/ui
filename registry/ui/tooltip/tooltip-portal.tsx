import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { useTooltipStyles } from "./tooltip-root";

interface TooltipPortalProps extends TooltipPrimitive.Portal.Props {
  className?: string;
}

export function TooltipPortal({ className, ...props }: TooltipPortalProps) {
  const styles = useTooltipStyles();
  return (
    <TooltipPrimitive.Portal {...props} className={styles.portal({ class: className })} data-slot="tooltip-portal" />
  );
}
