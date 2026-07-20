import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";
import { usePreviewCardStyles } from "./preview-card-root";

interface PreviewCardArrowProps extends PreviewCardPrimitive.Arrow.Props {
  className?: string;
}

export function PreviewCardArrow({ className, ...props }: PreviewCardArrowProps) {
  const styles = usePreviewCardStyles();
  return (
    <PreviewCardPrimitive.Arrow
      {...props}
      className={styles.arrow({ class: className })}
      data-slot="preview-card-arrow"
    />
  );
}
