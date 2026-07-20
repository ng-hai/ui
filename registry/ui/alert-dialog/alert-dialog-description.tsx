import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import { useAlertDialogStyles } from "./alert-dialog-root";

interface AlertDialogDescriptionProps extends AlertDialogPrimitive.Description.Props {
  className?: string;
}

export function AlertDialogDescription({ className, ...props }: AlertDialogDescriptionProps) {
  const styles = useAlertDialogStyles();
  return (
    <AlertDialogPrimitive.Description
      {...props}
      className={styles.description({ class: className })}
      data-slot="alert-dialog-description"
    />
  );
}
