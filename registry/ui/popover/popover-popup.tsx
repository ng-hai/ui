import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { usePopoverStyles } from "./popover-root";

interface PopoverPopupProps extends PopoverPrimitive.Popup.Props {
  className?: string;
}

export function PopoverPopup({ className, ...props }: PopoverPopupProps) {
  const styles = usePopoverStyles();
  return <PopoverPrimitive.Popup {...props} className={styles.popup({ class: className })} data-slot="popover-popup" />;
}
