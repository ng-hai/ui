import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { useDialogStyles } from "./dialog-root";

interface DialogViewportProps extends DialogPrimitive.Viewport.Props {
  className?: string;
}

export function DialogViewport({ className, ...props }: DialogViewportProps) {
  const styles = useDialogStyles();
  return (
    <DialogPrimitive.Viewport
      {...props}
      className={styles.viewport({ class: className })}
      data-slot="dialog-viewport"
    />
  );
}
