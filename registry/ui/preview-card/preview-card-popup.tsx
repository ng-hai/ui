import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";
import { usePreviewCardStyles } from "./preview-card-root";

interface PreviewCardPopupProps extends PreviewCardPrimitive.Popup.Props {
  className?: string;
}

export function PreviewCardPopup({ className, ...props }: PreviewCardPopupProps) {
  const styles = usePreviewCardStyles();
  return (
    <PreviewCardPrimitive.Popup
      {...props}
      className={styles.popup({ class: className })}
      data-slot="preview-card-popup"
    />
  );
}
