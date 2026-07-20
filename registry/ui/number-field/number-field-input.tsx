import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field";
import { useNumberFieldStyles } from "./number-field-root";

interface NumberFieldInputProps extends NumberFieldPrimitive.Input.Props {
  className?: string;
}

export function NumberFieldInput({ className, ...props }: NumberFieldInputProps) {
  const styles = useNumberFieldStyles();
  return (
    <NumberFieldPrimitive.Input
      {...props}
      className={styles.input({ class: className })}
      data-slot="number-field-input"
    />
  );
}
