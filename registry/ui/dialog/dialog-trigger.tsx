import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { useDialogStyles } from "./dialog-root";

interface DialogTriggerProps extends DialogPrimitive.Trigger.Props {
  className?: string;
}

export function DialogTrigger({ className, ...props }: DialogTriggerProps) {
  const styles = useDialogStyles();
  return (
    <DialogPrimitive.Trigger {...props} className={styles.trigger({ class: className })} data-slot="dialog-trigger" />
  );
}
