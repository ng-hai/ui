import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { usePopoverStyles } from "./popover-root";

interface PopoverPortalProps extends PopoverPrimitive.Portal.Props {
  className?: string;
}

export function PopoverPortal({ className, ...props }: PopoverPortalProps) {
  const styles = usePopoverStyles();
  return (
    <PopoverPrimitive.Portal {...props} className={styles.portal({ class: className })} data-slot="popover-portal" />
  );
}
