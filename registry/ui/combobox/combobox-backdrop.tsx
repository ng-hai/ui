import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { useComboboxStyles } from "./combobox-root";

interface ComboboxBackdropProps extends ComboboxPrimitive.Backdrop.Props {
  className?: string;
}

export function ComboboxBackdrop({ className, ...props }: ComboboxBackdropProps) {
  const styles = useComboboxStyles();
  return (
    <ComboboxPrimitive.Backdrop
      {...props}
      className={styles.backdrop({ class: className })}
      data-slot="combobox-backdrop"
    />
  );
}
