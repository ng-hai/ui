import { Select as SelectPrimitive } from "@base-ui/react/select";
import { useSelectStyles } from "./select-root";

interface SelectPositionerProps extends SelectPrimitive.Positioner.Props {
  className?: string;
}

export function SelectPositioner({ className, ...props }: SelectPositionerProps) {
  const styles = useSelectStyles();
  return (
    <SelectPrimitive.Positioner
      {...props}
      className={styles.positioner({ class: className })}
      data-slot="select-positioner"
    />
  );
}
