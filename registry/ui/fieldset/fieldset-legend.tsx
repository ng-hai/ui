import { Fieldset as FieldsetPrimitive } from "@base-ui/react/fieldset";
import { useFieldsetStyles } from "./fieldset-root";

interface FieldsetLegendProps extends FieldsetPrimitive.Legend.Props {
  className?: string;
}

export function FieldsetLegend({ className, ...props }: FieldsetLegendProps) {
  const styles = useFieldsetStyles();
  return (
    <FieldsetPrimitive.Legend {...props} className={styles.legend({ class: className })} data-slot="fieldset-legend" />
  );
}
