import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { useDialogStyles } from "./dialog-root";

interface DialogTriggerProps<Payload = unknown> extends DialogPrimitive.Trigger.Props<Payload> {
  className?: string;
}

export function DialogTrigger<Payload = unknown>({ className, ...props }: DialogTriggerProps<Payload>) {
  const styles = useDialogStyles();
  return (
    <DialogPrimitive.Trigger {...props} className={styles.trigger({ class: className })} data-slot="dialog-trigger" />
  );
}
