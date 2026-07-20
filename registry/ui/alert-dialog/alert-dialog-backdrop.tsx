import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import { useAlertDialogStyles } from "./alert-dialog-root";

interface AlertDialogBackdropProps extends AlertDialogPrimitive.Backdrop.Props {
  className?: string;
}

export function AlertDialogBackdrop({ className, ...props }: AlertDialogBackdropProps) {
  const styles = useAlertDialogStyles();
  return (
    <AlertDialogPrimitive.Backdrop
      {...props}
      className={styles.backdrop({ class: className })}
      data-slot="alert-dialog-backdrop"
    />
  );
}
