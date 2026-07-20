import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import { useToastStyles } from "./toast-root";

interface ToastContentProps extends ToastPrimitive.Content.Props {
  className?: string;
}

export function ToastContent({ className, ...props }: ToastContentProps) {
  const styles = useToastStyles();
  return (
    <ToastPrimitive.Content {...props} className={styles.content({ class: className })} data-slot="toast-content" />
  );
}
