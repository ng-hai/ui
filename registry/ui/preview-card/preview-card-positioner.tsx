import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";
import { usePreviewCardStyles } from "./preview-card-root";

interface PreviewCardPositionerProps extends PreviewCardPrimitive.Positioner.Props {
  className?: string;
}

export function PreviewCardPositioner({ className, ...props }: PreviewCardPositionerProps) {
  const styles = usePreviewCardStyles();
  return (
    <PreviewCardPrimitive.Positioner
      {...props}
      className={styles.positioner({ class: className })}
      data-slot="preview-card-positioner"
    />
  );
}
