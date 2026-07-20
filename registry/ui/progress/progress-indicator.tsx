import { Progress as ProgressPrimitive } from "@base-ui/react/progress";
import { useProgressStyles } from "./progress-root";

interface ProgressIndicatorProps extends ProgressPrimitive.Indicator.Props {
  className?: string;
}

export function ProgressIndicator({ className, ...props }: ProgressIndicatorProps) {
  const styles = useProgressStyles();
  return (
    <ProgressPrimitive.Indicator
      {...props}
      className={styles.indicator({ class: className })}
      data-slot="progress-indicator"
    />
  );
}
