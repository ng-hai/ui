import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { usePopoverStyles } from "./popover-root";

interface PopoverViewportProps extends PopoverPrimitive.Viewport.Props {
  className?: string;
}

export function PopoverViewport({ className, ...props }: PopoverViewportProps) {
  const styles = usePopoverStyles();
  return (
    <PopoverPrimitive.Viewport
      {...props}
      className={styles.viewport({ class: className })}
      data-slot="popover-viewport"
    />
  );
}
