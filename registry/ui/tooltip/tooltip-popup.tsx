import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { useTooltipStyles } from "./tooltip-root";

interface TooltipPopupProps extends TooltipPrimitive.Popup.Props {
  className?: string;
}

export function TooltipPopup({ className, ...props }: TooltipPopupProps) {
  const styles = useTooltipStyles();
  return <TooltipPrimitive.Popup {...props} className={styles.popup({ class: className })} data-slot="tooltip-popup" />;
}
