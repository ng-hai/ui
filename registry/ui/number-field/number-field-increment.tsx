import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field";
import { useNumberFieldStyles } from "./number-field-root";

interface NumberFieldIncrementProps extends NumberFieldPrimitive.Increment.Props {
  className?: string;
}

export function NumberFieldIncrement({ className, ...props }: NumberFieldIncrementProps) {
  const styles = useNumberFieldStyles();
  return (
    <NumberFieldPrimitive.Increment
      {...props}
      className={styles.increment({ class: className })}
      data-slot="number-field-increment"
    />
  );
}
