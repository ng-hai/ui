import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field";
import { useNumberFieldStyles } from "./number-field-root";

interface NumberFieldScrubAreaProps extends NumberFieldPrimitive.ScrubArea.Props {
  className?: string;
}

export function NumberFieldScrubArea({ className, ...props }: NumberFieldScrubAreaProps) {
  const styles = useNumberFieldStyles();
  return (
    <NumberFieldPrimitive.ScrubArea
      {...props}
      className={styles.scrubArea({ class: className })}
      data-slot="number-field-scrub-area"
    />
  );
}
