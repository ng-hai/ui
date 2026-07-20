import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import { useAlertDialogStyles } from "./alert-dialog-root";

interface AlertDialogPortalProps extends AlertDialogPrimitive.Portal.Props {
  className?: string;
}

export function AlertDialogPortal({ className, ...props }: AlertDialogPortalProps) {
  const styles = useAlertDialogStyles();
  return (
    <AlertDialogPrimitive.Portal
      {...props}
      className={styles.portal({ class: className })}
      data-slot="alert-dialog-portal"
    />
  );
}
