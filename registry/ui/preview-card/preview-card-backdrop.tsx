import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";
import { usePreviewCardStyles } from "./preview-card-root";

interface PreviewCardBackdropProps extends PreviewCardPrimitive.Backdrop.Props {
  className?: string;
}

export function PreviewCardBackdrop({ className, ...props }: PreviewCardBackdropProps) {
  const styles = usePreviewCardStyles();
  return (
    <PreviewCardPrimitive.Backdrop
      {...props}
      className={styles.backdrop({ class: className })}
      data-slot="preview-card-backdrop"
    />
  );
}
