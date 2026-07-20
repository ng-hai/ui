import { Meter as MeterPrimitive } from "@base-ui/react/meter";
import { useMeterStyles } from "./meter-root";

interface MeterValueProps extends MeterPrimitive.Value.Props {
  className?: string;
}

export function MeterValue({ className, ...props }: MeterValueProps) {
  const styles = useMeterStyles();
  return <MeterPrimitive.Value {...props} className={styles.value({ class: className })} data-slot="meter-value" />;
}
