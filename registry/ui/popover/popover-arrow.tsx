import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { usePopoverStyles } from "./popover-root";

interface PopoverArrowProps extends PopoverPrimitive.Arrow.Props {
  className?: string;
}

export function PopoverArrow({ className, ...props }: PopoverArrowProps) {
  const styles = usePopoverStyles();
  return <PopoverPrimitive.Arrow {...props} className={styles.arrow({ class: className })} data-slot="popover-arrow" />;
}
