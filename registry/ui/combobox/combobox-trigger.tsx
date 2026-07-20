import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { useComboboxStyles } from "./combobox-root";

interface ComboboxTriggerProps extends ComboboxPrimitive.Trigger.Props {
  className?: string;
}

export function ComboboxTrigger({ className, ...props }: ComboboxTriggerProps) {
  const styles = useComboboxStyles();
  return (
    <ComboboxPrimitive.Trigger
      {...props}
      className={styles.trigger({ class: className })}
      data-slot="combobox-trigger"
    />
  );
}
