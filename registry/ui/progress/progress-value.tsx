import { Progress as ProgressPrimitive } from "@base-ui/react/progress";
import { useProgressStyles } from "./progress-root";

interface ProgressValueProps extends ProgressPrimitive.Value.Props {
  className?: string;
}

export function ProgressValue({ className, ...props }: ProgressValueProps) {
  const styles = useProgressStyles();
  return (
    <ProgressPrimitive.Value {...props} className={styles.value({ class: className })} data-slot="progress-value" />
  );
}
