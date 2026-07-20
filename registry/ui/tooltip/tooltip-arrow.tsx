import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { useTooltipStyles } from "./tooltip-root";

interface TooltipArrowProps extends TooltipPrimitive.Arrow.Props {
  className?: string;
}

export function TooltipArrow({ className, ...props }: TooltipArrowProps) {
  const styles = useTooltipStyles();
  return <TooltipPrimitive.Arrow {...props} className={styles.arrow({ class: className })} data-slot="tooltip-arrow" />;
}
