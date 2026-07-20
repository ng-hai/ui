import { Select as SelectPrimitive } from "@base-ui/react/select";
import { useSelectStyles } from "./select-root";

interface SelectItemTextProps extends SelectPrimitive.ItemText.Props {
  className?: string;
}

export function SelectItemText({ className, ...props }: SelectItemTextProps) {
  const styles = useSelectStyles();
  return (
    <SelectPrimitive.ItemText
      {...props}
      className={styles.itemText({ class: className })}
      data-slot="select-item-text"
    />
  );
}
