import { Field as FieldPrimitive } from "@base-ui/react/field";
import { useFieldStyles } from "./field-root";

interface FieldControlProps extends FieldPrimitive.Control.Props {
  className?: string;
}

export function FieldControl({ className, ...props }: FieldControlProps) {
  const styles = useFieldStyles();
  return (
    <FieldPrimitive.Control {...props} className={styles.control({ class: className })} data-slot="field-control" />
  );
}
