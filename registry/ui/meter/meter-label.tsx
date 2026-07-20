import { Meter as MeterPrimitive } from "@base-ui/react/meter";
import { useMeterStyles } from "./meter-root";

interface MeterLabelProps extends MeterPrimitive.Label.Props {
  className?: string;
}

export function MeterLabel({ className, ...props }: MeterLabelProps) {
  const styles = useMeterStyles();
  return <MeterPrimitive.Label {...props} className={styles.label({ class: className })} data-slot="meter-label" />;
}
