import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { useDialogStyles } from "./dialog-root";

interface DialogPopupProps extends DialogPrimitive.Popup.Props {
  className?: string;
}

export function DialogPopup({ className, ...props }: DialogPopupProps) {
  const styles = useDialogStyles();
  return <DialogPrimitive.Popup {...props} className={styles.popup({ class: className })} data-slot="dialog-popup" />;
}
