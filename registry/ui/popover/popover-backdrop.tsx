import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { usePopoverStyles } from "./popover-root";

interface PopoverBackdropProps extends PopoverPrimitive.Backdrop.Props {
  className?: string;
}

export function PopoverBackdrop({ className, ...props }: PopoverBackdropProps) {
  const styles = usePopoverStyles();
  return (
    <PopoverPrimitive.Backdrop
      {...props}
      className={styles.backdrop({ class: className })}
      data-slot="popover-backdrop"
    />
  );
}
