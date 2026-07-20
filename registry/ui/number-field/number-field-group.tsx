import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field";
import { useNumberFieldStyles } from "./number-field-root";

interface NumberFieldGroupProps extends NumberFieldPrimitive.Group.Props {
  className?: string;
}

export function NumberFieldGroup({ className, ...props }: NumberFieldGroupProps) {
  const styles = useNumberFieldStyles();
  return (
    <NumberFieldPrimitive.Group
      {...props}
      className={styles.group({ class: className })}
      data-slot="number-field-group"
    />
  );
}
