import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { useContextMenuStyles } from "./context-menu-root";

interface ContextMenuItemProps extends ContextMenuPrimitive.Item.Props {
  className?: string;
}

export function ContextMenuItem({ className, ...props }: ContextMenuItemProps) {
  const styles = useContextMenuStyles();
  return (
    <ContextMenuPrimitive.Item {...props} className={styles.item({ class: className })} data-slot="context-menu-item" />
  );
}
