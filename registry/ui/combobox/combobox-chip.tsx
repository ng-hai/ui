import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { useComboboxStyles } from "./combobox-root";

interface ComboboxChipProps extends ComboboxPrimitive.Chip.Props {
  className?: string;
}

export function ComboboxChip({ className, ...props }: ComboboxChipProps) {
  const styles = useComboboxStyles();
  return <ComboboxPrimitive.Chip {...props} className={styles.chip({ class: className })} data-slot="combobox-chip" />;
}
