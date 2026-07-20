import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";
import { usePreviewCardStyles } from "./preview-card-root";

interface PreviewCardTriggerProps extends PreviewCardPrimitive.Trigger.Props {
  className?: string;
}

export function PreviewCardTrigger({ className, ...props }: PreviewCardTriggerProps) {
  const styles = usePreviewCardStyles();
  return (
    <PreviewCardPrimitive.Trigger
      {...props}
      className={styles.trigger({ class: className })}
      data-slot="preview-card-trigger"
    />
  );
}
