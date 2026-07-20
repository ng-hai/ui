import { Progress as ProgressPrimitive } from "@base-ui/react/progress";
import { useProgressStyles } from "./progress-root";

interface ProgressTrackProps extends ProgressPrimitive.Track.Props {
  className?: string;
}

export function ProgressTrack({ className, ...props }: ProgressTrackProps) {
  const styles = useProgressStyles();
  return (
    <ProgressPrimitive.Track {...props} className={styles.track({ class: className })} data-slot="progress-track" />
  );
}
