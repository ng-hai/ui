import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { useComboboxStyles } from "./combobox-root";

interface ComboboxItemProps extends ComboboxPrimitive.Item.Props {
  className?: string;
}

export function ComboboxItem({ className, ...props }: ComboboxItemProps) {
  const styles = useComboboxStyles();
  return <ComboboxPrimitive.Item {...props} className={styles.item({ class: className })} data-slot="combobox-item" />;
}
