import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { useComboboxStyles } from "./combobox-root";

interface ComboboxLabelProps extends ComboboxPrimitive.Label.Props {
  className?: string;
}

export function ComboboxLabel({ className, ...props }: ComboboxLabelProps) {
  const styles = useComboboxStyles();
  return (
    <ComboboxPrimitive.Label {...props} className={styles.label({ class: className })} data-slot="combobox-label" />
  );
}
