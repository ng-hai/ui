import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { useDialogStyles } from "./dialog-root";

interface DialogCloseProps extends DialogPrimitive.Close.Props {
  className?: string;
}

export function DialogClose({ className, ...props }: DialogCloseProps) {
  const styles = useDialogStyles();
  return <DialogPrimitive.Close {...props} className={styles.close({ class: className })} data-slot="dialog-close" />;
}
