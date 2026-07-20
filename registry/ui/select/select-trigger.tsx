import { Select as SelectPrimitive } from "@base-ui/react/select";
import { useSelectStyles } from "./select-root";

interface SelectTriggerProps extends SelectPrimitive.Trigger.Props {
  className?: string;
}

export function SelectTrigger({ className, ...props }: SelectTriggerProps) {
  const styles = useSelectStyles();
  return (
    <SelectPrimitive.Trigger {...props} className={styles.trigger({ class: className })} data-slot="select-trigger" />
  );
}
