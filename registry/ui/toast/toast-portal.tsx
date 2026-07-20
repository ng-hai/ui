import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import { useToastStyles } from "./toast-root";

interface ToastPortalProps extends ToastPrimitive.Portal.Props {
  className?: string;
}

export function ToastPortal({ className, ...props }: ToastPortalProps) {
  const styles = useToastStyles();
  return <ToastPrimitive.Portal {...props} className={styles.portal({ class: className })} data-slot="toast-portal" />;
}
