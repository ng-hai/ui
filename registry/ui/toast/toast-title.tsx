import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import { useToastStyles } from "./toast-root";

interface ToastTitleProps extends ToastPrimitive.Title.Props {
  className?: string;
}

export function ToastTitle({ className, ...props }: ToastTitleProps) {
  const styles = useToastStyles();
  return <ToastPrimitive.Title {...props} className={styles.title({ class: className })} data-slot="toast-title" />;
}
