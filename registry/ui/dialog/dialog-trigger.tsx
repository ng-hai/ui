import { use } from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { DialogStyleContext } from "./dialog-root";
import { dialogStyles } from "./styles";

interface DialogTriggerProps<Payload = unknown> extends DialogPrimitive.Trigger.Props<Payload> {
  className?: string;
}

export function DialogTrigger<Payload = unknown>({ className, ...props }: DialogTriggerProps<Payload>) {
  const styles = use(DialogStyleContext) ?? dialogStyles();
  return (
    <DialogPrimitive.Trigger {...props} className={styles.trigger({ class: className })} data-slot="dialog-trigger" />
  );
}
