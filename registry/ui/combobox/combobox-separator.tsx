import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { useComboboxStyles } from "./combobox-root";

interface ComboboxSeparatorProps extends ComboboxPrimitive.Separator.Props {
  className?: string;
}

export function ComboboxSeparator({ className, ...props }: ComboboxSeparatorProps) {
  const styles = useComboboxStyles();
  return (
    <ComboboxPrimitive.Separator
      {...props}
      className={styles.separator({ class: className })}
      data-slot="combobox-separator"
    />
  );
}
