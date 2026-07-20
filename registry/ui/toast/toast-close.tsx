import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import { useToastStyles } from "./toast-root";

interface ToastCloseProps extends ToastPrimitive.Close.Props {
  className?: string;
}

export function ToastClose({ className, ...props }: ToastCloseProps) {
  const styles = useToastStyles();
  return <ToastPrimitive.Close {...props} className={styles.close({ class: className })} data-slot="toast-close" />;
}
