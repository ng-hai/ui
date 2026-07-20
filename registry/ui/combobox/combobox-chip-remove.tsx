import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { useComboboxStyles } from "./combobox-root";

interface ComboboxChipRemoveProps extends ComboboxPrimitive.ChipRemove.Props {
  className?: string;
}

export function ComboboxChipRemove({ className, ...props }: ComboboxChipRemoveProps) {
  const styles = useComboboxStyles();
  return (
    <ComboboxPrimitive.ChipRemove
      {...props}
      className={styles.chipRemove({ class: className })}
      data-slot="combobox-chip-remove"
    />
  );
}
