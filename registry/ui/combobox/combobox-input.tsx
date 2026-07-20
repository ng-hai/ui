import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { useComboboxStyles } from "./combobox-root";

interface ComboboxInputProps extends ComboboxPrimitive.Input.Props {
  className?: string;
}

export function ComboboxInput({ className, ...props }: ComboboxInputProps) {
  const styles = useComboboxStyles();
  return (
    <ComboboxPrimitive.Input {...props} className={styles.input({ class: className })} data-slot="combobox-input" />
  );
}
