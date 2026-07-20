import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import { useAlertDialogStyles } from "./alert-dialog-root";

interface AlertDialogCloseProps extends AlertDialogPrimitive.Close.Props {
  className?: string;
}

export function AlertDialogClose({ className, ...props }: AlertDialogCloseProps) {
  const styles = useAlertDialogStyles();
  return (
    <AlertDialogPrimitive.Close
      {...props}
      className={styles.close({ class: className })}
      data-slot="alert-dialog-close"
    />
  );
}
