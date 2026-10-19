import { Select as SelectPrimitive } from "@base-ui/react/select";
import { useSelectStyles } from "./select-root";

interface SelectScrollDownArrowProps extends SelectPrimitive.ScrollDownArrow.Props {
  className?: string;
}

export function SelectScrollDownArrow({ className, ...props }: SelectScrollDownArrowProps) {
  const styles = useSelectStyles();
  return (
    <SelectPrimitive.ScrollDownArrow
      {...props}
      className={styles.scrollDownArrow({ class: className })}
      data-slot="select-scroll-down-arrow"
    />
  );
}
