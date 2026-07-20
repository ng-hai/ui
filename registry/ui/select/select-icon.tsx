import { Select as SelectPrimitive } from "@base-ui/react/select";
import { useSelectStyles } from "./select-root";

interface SelectIconProps extends SelectPrimitive.Icon.Props {
  className?: string;
}

export function SelectIcon({ className, ...props }: SelectIconProps) {
  const styles = useSelectStyles();
  return <SelectPrimitive.Icon {...props} className={styles.icon({ class: className })} data-slot="select-icon" />;
}
