import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { useDialogStyles } from "./dialog-root";

interface DialogPortalProps extends DialogPrimitive.Portal.Props {
  className?: string;
}

export function DialogPortal({ className, ...props }: DialogPortalProps) {
  const styles = useDialogStyles();
  return (
    <DialogPrimitive.Portal {...props} className={styles.portal({ class: className })} data-slot="dialog-portal" />
  );
}
