import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { useComboboxStyles } from "./combobox-root";

interface ComboboxArrowProps extends ComboboxPrimitive.Arrow.Props {
  className?: string;
}

export function ComboboxArrow({ className, ...props }: ComboboxArrowProps) {
  const styles = useComboboxStyles();
  return (
    <ComboboxPrimitive.Arrow {...props} className={styles.arrow({ class: className })} data-slot="combobox-arrow" />
  );
}
