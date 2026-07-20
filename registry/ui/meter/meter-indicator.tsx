import { Meter as MeterPrimitive } from "@base-ui/react/meter";
import { useMeterStyles } from "./meter-root";

interface MeterIndicatorProps extends MeterPrimitive.Indicator.Props {
  className?: string;
}

export function MeterIndicator({ className, ...props }: MeterIndicatorProps) {
  const styles = useMeterStyles();
  return (
    <MeterPrimitive.Indicator
      {...props}
      className={styles.indicator({ class: className })}
      data-slot="meter-indicator"
    />
  );
}
