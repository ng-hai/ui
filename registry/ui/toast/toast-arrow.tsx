import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import { useToastStyles } from "./toast-root";

interface ToastArrowProps extends ToastPrimitive.Arrow.Props {
  className?: string;
}

export function ToastArrow({ className, ...props }: ToastArrowProps) {
  const styles = useToastStyles();
  return <ToastPrimitive.Arrow {...props} className={styles.arrow({ class: className })} data-slot="toast-arrow" />;
}
