import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";
import { usePreviewCardStyles } from "./preview-card-root";

interface PreviewCardPortalProps extends PreviewCardPrimitive.Portal.Props {
  className?: string;
}

export function PreviewCardPortal({ className, ...props }: PreviewCardPortalProps) {
  const styles = usePreviewCardStyles();
  return (
    <PreviewCardPrimitive.Portal
      {...props}
      className={styles.portal({ class: className })}
      data-slot="preview-card-portal"
    />
  );
}
