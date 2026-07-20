import { Select as SelectPrimitive } from "@base-ui/react/select";
import { useSelectStyles } from "./select-root";

interface SelectGroupProps extends SelectPrimitive.Group.Props {
  className?: string;
}

export function SelectGroup({ className, ...props }: SelectGroupProps) {
  const styles = useSelectStyles();
  return <SelectPrimitive.Group {...props} className={styles.group({ class: className })} data-slot="select-group" />;
}
