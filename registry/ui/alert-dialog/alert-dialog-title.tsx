import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import { useAlertDialogStyles } from "./alert-dialog-root";

interface AlertDialogTitleProps extends AlertDialogPrimitive.Title.Props {
  className?: string;
}

export function AlertDialogTitle({ className, ...props }: AlertDialogTitleProps) {
  const styles = useAlertDialogStyles();
  return (
    <AlertDialogPrimitive.Title
      {...props}
      className={styles.title({ class: className })}
      data-slot="alert-dialog-title"
    />
  );
}
