import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { useDialogStyles } from "./dialog-root";

interface DialogDescriptionProps extends DialogPrimitive.Description.Props {
  className?: string;
}

export function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  const styles = useDialogStyles();
  return (
    <DialogPrimitive.Description
      {...props}
      className={styles.description({ class: className })}
      data-slot="dialog-description"
    />
  );
}
