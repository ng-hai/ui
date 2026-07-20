import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { useComboboxStyles } from "./combobox-root";

interface ComboboxGroupProps extends ComboboxPrimitive.Group.Props {
  className?: string;
}

export function ComboboxGroup({ className, ...props }: ComboboxGroupProps) {
  const styles = useComboboxStyles();
  return (
    <ComboboxPrimitive.Group {...props} className={styles.group({ class: className })} data-slot="combobox-group" />
  );
}
