import { use } from "react";
import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import { AlertDialogStyleContext } from "./alert-dialog-root";
import { alertDialogStyles } from "./styles";

interface AlertDialogTriggerProps<Payload = unknown> extends AlertDialogPrimitive.Trigger.Props<Payload> {
  className?: string;
}

export function AlertDialogTrigger<Payload = unknown>({ className, ...props }: AlertDialogTriggerProps<Payload>) {
  const styles = use(AlertDialogStyleContext) ?? alertDialogStyles();
  return (
    <AlertDialogPrimitive.Trigger
      {...props}
      className={styles.trigger({ class: className })}
      data-slot="alert-dialog-trigger"
    />
  );
}
