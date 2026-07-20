import { Field as FieldPrimitive } from "@base-ui/react/field";
import { useFieldStyles } from "./field-root";

interface FieldItemProps extends FieldPrimitive.Item.Props {
  className?: string;
}

export function FieldItem({ className, ...props }: FieldItemProps) {
  const styles = useFieldStyles();
  return <FieldPrimitive.Item {...props} className={styles.item({ class: className })} data-slot="field-item" />;
}
