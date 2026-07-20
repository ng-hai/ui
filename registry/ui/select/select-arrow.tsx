import { Select as SelectPrimitive } from "@base-ui/react/select";
import { useSelectStyles } from "./select-root";

interface SelectArrowProps extends SelectPrimitive.Arrow.Props {
  className?: string;
}

export function SelectArrow({ className, ...props }: SelectArrowProps) {
  const styles = useSelectStyles();
  return <SelectPrimitive.Arrow {...props} className={styles.arrow({ class: className })} data-slot="select-arrow" />;
}
