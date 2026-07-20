import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { useComboboxStyles } from "./combobox-root";

interface ComboboxRowProps extends ComboboxPrimitive.Row.Props {
  className?: string;
}

export function ComboboxRow({ className, ...props }: ComboboxRowProps) {
  const styles = useComboboxStyles();
  return <ComboboxPrimitive.Row {...props} className={styles.row({ class: className })} data-slot="combobox-row" />;
}
