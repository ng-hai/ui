import { Select as SelectPrimitive } from "@base-ui/react/select";
import { useSelectStyles } from "./select-root";

interface SelectSeparatorProps extends SelectPrimitive.Separator.Props {
  className?: string;
}

export function SelectSeparator({ className, ...props }: SelectSeparatorProps) {
  const styles = useSelectStyles();
  return (
    <SelectPrimitive.Separator
      {...props}
      className={styles.separator({ class: className })}
      data-slot="select-separator"
    />
  );
}
