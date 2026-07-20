import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { useDialogStyles } from "./dialog-root";

interface DialogBackdropProps extends DialogPrimitive.Backdrop.Props {
  className?: string;
}

export function DialogBackdrop({ className, ...props }: DialogBackdropProps) {
  const styles = useDialogStyles();
  return (
    <DialogPrimitive.Backdrop
      {...props}
      className={styles.backdrop({ class: className })}
      data-slot="dialog-backdrop"
    />
  );
}
