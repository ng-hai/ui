import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { useComboboxStyles } from "./combobox-root";

interface ComboboxEmptyProps extends ComboboxPrimitive.Empty.Props {
  className?: string;
}

export function ComboboxEmpty({ className, ...props }: ComboboxEmptyProps) {
  const styles = useComboboxStyles();
  return (
    <ComboboxPrimitive.Empty {...props} className={styles.empty({ class: className })} data-slot="combobox-empty" />
  );
}
