import { Meter as MeterPrimitive } from "@base-ui/react/meter";
import { useMeterStyles } from "./meter-root";

interface MeterTrackProps extends MeterPrimitive.Track.Props {
  className?: string;
}

export function MeterTrack({ className, ...props }: MeterTrackProps) {
  const styles = useMeterStyles();
  return <MeterPrimitive.Track {...props} className={styles.track({ class: className })} data-slot="meter-track" />;
}
