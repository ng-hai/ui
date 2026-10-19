import { use } from "react";
import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";
import { PreviewCardStyleContext } from "./preview-card-root";
import { previewCardStyles } from "./styles";

interface PreviewCardTriggerProps<Payload = unknown> extends PreviewCardPrimitive.Trigger.Props<Payload> {
  className?: string;
}

export function PreviewCardTrigger<Payload = unknown>({ className, ...props }: PreviewCardTriggerProps<Payload>) {
  const styles = use(PreviewCardStyleContext) ?? previewCardStyles();
  return (
    <PreviewCardPrimitive.Trigger
      {...props}
      className={styles.trigger({ class: className })}
      data-slot="preview-card-trigger"
    />
  );
}
