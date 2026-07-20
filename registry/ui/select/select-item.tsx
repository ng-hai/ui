import { Select as SelectPrimitive } from "@base-ui/react/select";
import { useSelectStyles } from "./select-root";

interface SelectItemProps extends SelectPrimitive.Item.Props {
  className?: string;
}

export function SelectItem({ className, ...props }: SelectItemProps) {
  const styles = useSelectStyles();
  return <SelectPrimitive.Item {...props} className={styles.item({ class: className })} data-slot="select-item" />;
}
