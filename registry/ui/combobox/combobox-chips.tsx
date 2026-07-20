import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { useComboboxStyles } from "./combobox-root";

interface ComboboxChipsProps extends ComboboxPrimitive.Chips.Props {
  className?: string;
}

export function ComboboxChips({ className, ...props }: ComboboxChipsProps) {
  const styles = useComboboxStyles();
  return (
    <ComboboxPrimitive.Chips {...props} className={styles.chips({ class: className })} data-slot="combobox-chips" />
  );
}
