import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { useContextMenuStyles } from "./context-menu-root";

interface ContextMenuPopupProps extends ContextMenuPrimitive.Popup.Props {
  className?: string;
}

export function ContextMenuPopup({ className, ...props }: ContextMenuPopupProps) {
  const styles = useContextMenuStyles();
  return (
    <ContextMenuPrimitive.Popup
      {...props}
      className={styles.popup({ class: className })}
      data-slot="context-menu-popup"
    />
  );
}
