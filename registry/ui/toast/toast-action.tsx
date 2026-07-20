import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import { useToastStyles } from "./toast-root";

interface ToastActionProps extends ToastPrimitive.Action.Props {
  className?: string;
}

export function ToastAction({ className, ...props }: ToastActionProps) {
  const styles = useToastStyles();
  return <ToastPrimitive.Action {...props} className={styles.action({ class: className })} data-slot="toast-action" />;
}
