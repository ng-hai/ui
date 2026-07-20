import { Field as FieldPrimitive } from "@base-ui/react/field";
import { useFieldStyles } from "./field-root";

interface FieldLabelProps extends FieldPrimitive.Label.Props {
  className?: string;
}

export function FieldLabel({ className, ...props }: FieldLabelProps) {
  const styles = useFieldStyles();
  return <FieldPrimitive.Label {...props} className={styles.label({ class: className })} data-slot="field-label" />;
}
