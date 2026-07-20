import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { useComboboxStyles } from "./combobox-root";

interface ComboboxStatusProps extends ComboboxPrimitive.Status.Props {
  className?: string;
}

export function ComboboxStatus({ className, ...props }: ComboboxStatusProps) {
  const styles = useComboboxStyles();
  return (
    <ComboboxPrimitive.Status {...props} className={styles.status({ class: className })} data-slot="combobox-status" />
  );
}
