import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { useComboboxStyles } from "./combobox-root";

interface ComboboxGroupLabelProps extends ComboboxPrimitive.GroupLabel.Props {
  className?: string;
}

export function ComboboxGroupLabel({ className, ...props }: ComboboxGroupLabelProps) {
  const styles = useComboboxStyles();
  return (
    <ComboboxPrimitive.GroupLabel
      {...props}
      className={styles.groupLabel({ class: className })}
      data-slot="combobox-group-label"
    />
  );
}
