import { Select as SelectPrimitive } from "@base-ui/react/select";
import { useSelectStyles } from "./select-root";

interface SelectListProps extends SelectPrimitive.List.Props {
  className?: string;
}

export function SelectList({ className, ...props }: SelectListProps) {
  const styles = useSelectStyles();
  return <SelectPrimitive.List {...props} className={styles.list({ class: className })} data-slot="select-list" />;
}
