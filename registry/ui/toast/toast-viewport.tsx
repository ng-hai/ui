import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import { useToastStyles } from "./toast-root";

interface ToastViewportProps extends ToastPrimitive.Viewport.Props {
  className?: string;
}

export function ToastViewport({ className, ...props }: ToastViewportProps) {
  const styles = useToastStyles();
  return (
    <ToastPrimitive.Viewport {...props} className={styles.viewport({ class: className })} data-slot="toast-viewport" />
  );
}
