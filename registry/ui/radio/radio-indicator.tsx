import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { useRadioStyles } from "./radio-root";

interface RadioIndicatorProps extends RadioPrimitive.Indicator.Props {
  className?: string;
}

export function RadioIndicator({ className, ...props }: RadioIndicatorProps) {
  const styles = useRadioStyles();
  return (
    <RadioPrimitive.Indicator
      {...props}
      className={styles.indicator({ class: className })}
      data-slot="radio-indicator"
    />
  );
}
