import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";
import { usePreviewCardStyles } from "./preview-card-root";

interface PreviewCardTriggerProps<Payload = unknown> extends PreviewCardPrimitive.Trigger.Props<Payload> {
  className?: string;
}

export function PreviewCardTrigger<Payload = unknown>({ className, ...props }: PreviewCardTriggerProps<Payload>) {
  const styles = usePreviewCardStyles();
  return (
    <PreviewCardPrimitive.Trigger
      {...props}
      className={styles.trigger({ class: className })}
      data-slot="preview-card-trigger"
    />
  );
}
