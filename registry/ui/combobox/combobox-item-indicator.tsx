import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { useComboboxStyles } from "./combobox-root";

interface ComboboxItemIndicatorProps extends ComboboxPrimitive.ItemIndicator.Props {
  className?: string;
}

export function ComboboxItemIndicator({ className, ...props }: ComboboxItemIndicatorProps) {
  const styles = useComboboxStyles();
  return (
    <ComboboxPrimitive.ItemIndicator
      {...props}
      className={styles.itemIndicator({ class: className })}
      data-slot="combobox-item-indicator"
    />
  );
}
