import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { useCheckboxStyles } from "./checkbox-root";

interface CheckboxIndicatorProps extends CheckboxPrimitive.Indicator.Props {
  className?: string;
}

export function CheckboxIndicator({ className, ...props }: CheckboxIndicatorProps) {
  const styles = useCheckboxStyles();
  return (
    <CheckboxPrimitive.Indicator
      {...props}
      className={styles.indicator({ class: className })}
      data-slot="checkbox-indicator"
    />
  );
}
