import { Progress as ProgressPrimitive } from "@base-ui/react/progress";
import { useProgressStyles } from "./progress-root";

interface ProgressLabelProps extends ProgressPrimitive.Label.Props {
  className?: string;
}

export function ProgressLabel({ className, ...props }: ProgressLabelProps) {
  const styles = useProgressStyles();
  return (
    <ProgressPrimitive.Label {...props} className={styles.label({ class: className })} data-slot="progress-label" />
  );
}
