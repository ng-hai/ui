import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import { useToastStyles } from "./toast-root";

interface ToastPositionerProps extends ToastPrimitive.Positioner.Props {
  className?: string;
}

export function ToastPositioner({ className, ...props }: ToastPositionerProps) {
  const styles = useToastStyles();
  return (
    <ToastPrimitive.Positioner
      {...props}
      className={styles.positioner({ class: className })}
      data-slot="toast-positioner"
    />
  );
}
