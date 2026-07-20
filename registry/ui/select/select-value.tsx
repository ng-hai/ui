import { Select as SelectPrimitive } from "@base-ui/react/select";
import { useSelectStyles } from "./select-root";

interface SelectValueProps extends SelectPrimitive.Value.Props {
  className?: string;
}

export function SelectValue({ className, ...props }: SelectValueProps) {
  const styles = useSelectStyles();
  return <SelectPrimitive.Value {...props} className={styles.value({ class: className })} data-slot="select-value" />;
}
