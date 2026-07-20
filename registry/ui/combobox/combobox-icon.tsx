import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { useComboboxStyles } from "./combobox-root";

interface ComboboxIconProps extends ComboboxPrimitive.Icon.Props {
  className?: string;
}

export function ComboboxIcon({ className, ...props }: ComboboxIconProps) {
  const styles = useComboboxStyles();
  return <ComboboxPrimitive.Icon {...props} className={styles.icon({ class: className })} data-slot="combobox-icon" />;
}
