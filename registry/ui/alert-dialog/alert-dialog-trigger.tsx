import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import { useAlertDialogStyles } from "./alert-dialog-root";

interface AlertDialogTriggerProps<Payload = unknown> extends AlertDialogPrimitive.Trigger.Props<Payload> {
  className?: string;
}

export function AlertDialogTrigger<Payload = unknown>({ className, ...props }: AlertDialogTriggerProps<Payload>) {
  const styles = useAlertDialogStyles();
  return (
    <AlertDialogPrimitive.Trigger
      {...props}
      className={styles.trigger({ class: className })}
      data-slot="alert-dialog-trigger"
    />
  );
}
