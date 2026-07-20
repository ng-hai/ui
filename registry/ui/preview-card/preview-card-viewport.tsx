import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";
import { usePreviewCardStyles } from "./preview-card-root";

interface PreviewCardViewportProps extends PreviewCardPrimitive.Viewport.Props {
  className?: string;
}

export function PreviewCardViewport({ className, ...props }: PreviewCardViewportProps) {
  const styles = usePreviewCardStyles();
  return (
    <PreviewCardPrimitive.Viewport
      {...props}
      className={styles.viewport({ class: className })}
      data-slot="preview-card-viewport"
    />
  );
}
