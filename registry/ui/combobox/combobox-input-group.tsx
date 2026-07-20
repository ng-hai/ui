import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { useComboboxStyles } from "./combobox-root";

interface ComboboxInputGroupProps extends ComboboxPrimitive.InputGroup.Props {
  className?: string;
}

export function ComboboxInputGroup({ className, ...props }: ComboboxInputGroupProps) {
  const styles = useComboboxStyles();
  return (
    <ComboboxPrimitive.InputGroup
      {...props}
      className={styles.inputGroup({ class: className })}
      data-slot="combobox-input-group"
    />
  );
}
