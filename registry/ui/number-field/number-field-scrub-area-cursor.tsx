import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field";
import { useNumberFieldStyles } from "./number-field-root";

interface NumberFieldScrubAreaCursorProps extends NumberFieldPrimitive.ScrubAreaCursor.Props {
  className?: string;
}

export function NumberFieldScrubAreaCursor({ className, ...props }: NumberFieldScrubAreaCursorProps) {
  const styles = useNumberFieldStyles();
  return (
    <NumberFieldPrimitive.ScrubAreaCursor
      {...props}
      className={styles.scrubAreaCursor({ class: className })}
      data-slot="number-field-scrub-area-cursor"
    />
  );
}
