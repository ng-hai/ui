import { Select as SelectPrimitive } from "@base-ui/react/select";
import { useSelectStyles } from "./select-root";

interface SelectBackdropProps extends SelectPrimitive.Backdrop.Props {
  className?: string;
}

export function SelectBackdrop({ className, ...props }: SelectBackdropProps) {
  const styles = useSelectStyles();
  return (
    <SelectPrimitive.Backdrop
      {...props}
      className={styles.backdrop({ class: className })}
      data-slot="select-backdrop"
    />
  );
}
