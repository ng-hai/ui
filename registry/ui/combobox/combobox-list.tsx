import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { useComboboxStyles } from "./combobox-root";

interface ComboboxListProps extends ComboboxPrimitive.List.Props {
  className?: string;
}

export function ComboboxList({ className, ...props }: ComboboxListProps) {
  const styles = useComboboxStyles();
  return <ComboboxPrimitive.List {...props} className={styles.list({ class: className })} data-slot="combobox-list" />;
}
