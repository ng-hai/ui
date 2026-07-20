import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import { useAlertDialogStyles } from "./alert-dialog-root";

interface AlertDialogPopupProps extends AlertDialogPrimitive.Popup.Props {
  className?: string;
}

export function AlertDialogPopup({ className, ...props }: AlertDialogPopupProps) {
  const styles = useAlertDialogStyles();
  return (
    <AlertDialogPrimitive.Popup
      {...props}
      className={styles.popup({ class: className })}
      data-slot="alert-dialog-popup"
    />
  );
}
