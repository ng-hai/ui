import { Select as SelectPrimitive } from "@base-ui/react/select";
import { useSelectStyles } from "./select-root";

interface SelectScrollUpArrowProps extends SelectPrimitive.ScrollUpArrow.Props {
  className?: string;
}

export function SelectScrollUpArrow({ className, ...props }: SelectScrollUpArrowProps) {
  const styles = useSelectStyles();
  return (
    <SelectPrimitive.ScrollUpArrow
      {...props}
      className={styles.scrollUpArrow({ class: className })}
      data-slot="select-scroll-up-arrow"
    />
  );
}
