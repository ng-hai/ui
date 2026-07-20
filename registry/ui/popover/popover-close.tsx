import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { usePopoverStyles } from "./popover-root";

interface PopoverCloseProps extends PopoverPrimitive.Close.Props {
  className?: string;
}

export function PopoverClose({ className, ...props }: PopoverCloseProps) {
  const styles = usePopoverStyles();
  return <PopoverPrimitive.Close {...props} className={styles.close({ class: className })} data-slot="popover-close" />;
}
