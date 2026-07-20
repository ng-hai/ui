import { Field as FieldPrimitive } from "@base-ui/react/field";
import { useFieldStyles } from "./field-root";

interface FieldDescriptionProps extends FieldPrimitive.Description.Props {
  className?: string;
}

export function FieldDescription({ className, ...props }: FieldDescriptionProps) {
  const styles = useFieldStyles();
  return (
    <FieldPrimitive.Description
      {...props}
      className={styles.description({ class: className })}
      data-slot="field-description"
    />
  );
}
