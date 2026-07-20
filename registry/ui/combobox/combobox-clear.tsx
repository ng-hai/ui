import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { useComboboxStyles } from "./combobox-root";

interface ComboboxClearProps extends ComboboxPrimitive.Clear.Props {
  className?: string;
}

export function ComboboxClear({ className, ...props }: ComboboxClearProps) {
  const styles = useComboboxStyles();
  return (
    <ComboboxPrimitive.Clear {...props} className={styles.clear({ class: className })} data-slot="combobox-clear" />
  );
}
