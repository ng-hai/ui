import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { useTooltipStyles } from "./tooltip-root";

interface TooltipPositionerProps extends TooltipPrimitive.Positioner.Props {
  className?: string;
}

export function TooltipPositioner({ className, ...props }: TooltipPositionerProps) {
  const styles = useTooltipStyles();
  return (
    <TooltipPrimitive.Positioner
      {...props}
      className={styles.positioner({ class: className })}
      data-slot="tooltip-positioner"
    />
  );
}
