import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import { useToastStyles } from "./toast-root";

interface ToastDescriptionProps extends ToastPrimitive.Description.Props {
  className?: string;
}

export function ToastDescription({ className, ...props }: ToastDescriptionProps) {
  const styles = useToastStyles();
  return (
    <ToastPrimitive.Description
      {...props}
      className={styles.description({ class: className })}
      data-slot="toast-description"
    />
  );
}
