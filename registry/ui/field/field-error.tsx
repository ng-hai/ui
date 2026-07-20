import { Field as FieldPrimitive } from "@base-ui/react/field";
import { useFieldStyles } from "./field-root";

interface FieldErrorProps extends FieldPrimitive.Error.Props {
  className?: string;
}

export function FieldError({ className, ...props }: FieldErrorProps) {
  const styles = useFieldStyles();
  return <FieldPrimitive.Error {...props} className={styles.error({ class: className })} data-slot="field-error" />;
}
