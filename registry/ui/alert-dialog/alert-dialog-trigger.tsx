import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import { useAlertDialogStyles } from "./alert-dialog-root";

interface AlertDialogTriggerProps extends AlertDialogPrimitive.Trigger.Props {
  className?: string;
}

export function AlertDialogTrigger({ className, ...props }: AlertDialogTriggerProps) {
  const styles = useAlertDialogStyles();
  return (
    <AlertDialogPrimitive.Trigger
      {...props}
      className={styles.trigger({ class: className })}
      data-slot="alert-dialog-trigger"
    />
  );
}
