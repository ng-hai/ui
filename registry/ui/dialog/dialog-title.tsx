import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { useDialogStyles } from "./dialog-root";

interface DialogTitleProps extends DialogPrimitive.Title.Props {
  className?: string;
}

export function DialogTitle({ className, ...props }: DialogTitleProps) {
  const styles = useDialogStyles();
  return <DialogPrimitive.Title {...props} className={styles.title({ class: className })} data-slot="dialog-title" />;
}
