import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { useComboboxStyles } from "./combobox-root";

interface ComboboxPositionerProps extends ComboboxPrimitive.Positioner.Props {
  className?: string;
}

export function ComboboxPositioner({ className, ...props }: ComboboxPositionerProps) {
  const styles = useComboboxStyles();
  return (
    <ComboboxPrimitive.Positioner
      {...props}
      className={styles.positioner({ class: className })}
      data-slot="combobox-positioner"
    />
  );
}
