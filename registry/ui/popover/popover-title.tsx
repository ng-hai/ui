import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { usePopoverStyles } from "./popover-root";

interface PopoverTitleProps extends PopoverPrimitive.Title.Props {
  className?: string;
}

export function PopoverTitle({ className, ...props }: PopoverTitleProps) {
  const styles = usePopoverStyles();
  return <PopoverPrimitive.Title {...props} className={styles.title({ class: className })} data-slot="popover-title" />;
}
