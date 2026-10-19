import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { useTooltipStyles } from "./tooltip-root";

interface TooltipViewportProps extends TooltipPrimitive.Viewport.Props {
  className?: string;
}

export function TooltipViewport({ className, ...props }: TooltipViewportProps) {
  const styles = useTooltipStyles();
  return (
    <TooltipPrimitive.Viewport
      {...props}
      className={styles.viewport({ class: className })}
      data-slot="tooltip-viewport"
    />
  );
}
