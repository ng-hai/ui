import { Select as SelectPrimitive } from "@base-ui/react/select";
import { useSelectStyles } from "./select-root";

interface SelectItemIndicatorProps extends SelectPrimitive.ItemIndicator.Props {
  className?: string;
}

export function SelectItemIndicator({ className, ...props }: SelectItemIndicatorProps) {
  const styles = useSelectStyles();
  return (
    <SelectPrimitive.ItemIndicator
      {...props}
      className={styles.itemIndicator({ class: className })}
      data-slot="select-item-indicator"
    />
  );
}
