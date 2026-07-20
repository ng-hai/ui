import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { usePopoverStyles } from "./popover-root";

interface PopoverPositionerProps extends PopoverPrimitive.Positioner.Props {
  className?: string;
}

export function PopoverPositioner({ className, ...props }: PopoverPositionerProps) {
  const styles = usePopoverStyles();
  return (
    <PopoverPrimitive.Positioner
      {...props}
      className={styles.positioner({ class: className })}
      data-slot="popover-positioner"
    />
  );
}
