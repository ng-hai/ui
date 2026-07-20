import { Select as SelectPrimitive } from "@base-ui/react/select";
import { useSelectStyles } from "./select-root";

interface SelectGroupLabelProps extends SelectPrimitive.GroupLabel.Props {
  className?: string;
}

export function SelectGroupLabel({ className, ...props }: SelectGroupLabelProps) {
  const styles = useSelectStyles();
  return (
    <SelectPrimitive.GroupLabel
      {...props}
      className={styles.groupLabel({ class: className })}
      data-slot="select-group-label"
    />
  );
}
