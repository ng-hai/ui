import { Select as SelectPrimitive } from "@base-ui/react/select";
import { useSelectStyles } from "./select-root";

interface SelectLabelProps extends SelectPrimitive.Label.Props {
  className?: string;
}

export function SelectLabel({ className, ...props }: SelectLabelProps) {
  const styles = useSelectStyles();
  return <SelectPrimitive.Label {...props} className={styles.label({ class: className })} data-slot="select-label" />;
}
