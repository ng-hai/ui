import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { usePopoverStyles } from "./popover-root";

interface PopoverDescriptionProps extends PopoverPrimitive.Description.Props {
  className?: string;
}

export function PopoverDescription({ className, ...props }: PopoverDescriptionProps) {
  const styles = usePopoverStyles();
  return (
    <PopoverPrimitive.Description
      {...props}
      className={styles.description({ class: className })}
      data-slot="popover-description"
    />
  );
}
