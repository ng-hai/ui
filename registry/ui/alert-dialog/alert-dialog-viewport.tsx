import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import { useAlertDialogStyles } from "./alert-dialog-root";

interface AlertDialogViewportProps extends AlertDialogPrimitive.Viewport.Props {
  className?: string;
}

export function AlertDialogViewport({ className, ...props }: AlertDialogViewportProps) {
  const styles = useAlertDialogStyles();
  return (
    <AlertDialogPrimitive.Viewport
      {...props}
      className={styles.viewport({ class: className })}
      data-slot="alert-dialog-viewport"
    />
  );
}
