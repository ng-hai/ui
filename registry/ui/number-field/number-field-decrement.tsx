import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field";
import { useNumberFieldStyles } from "./number-field-root";

interface NumberFieldDecrementProps extends NumberFieldPrimitive.Decrement.Props {
  className?: string;
}

export function NumberFieldDecrement({ className, ...props }: NumberFieldDecrementProps) {
  const styles = useNumberFieldStyles();
  return (
    <NumberFieldPrimitive.Decrement
      {...props}
      className={styles.decrement({ class: className })}
      data-slot="number-field-decrement"
    />
  );
}
